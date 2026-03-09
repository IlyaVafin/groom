from pwdlib import PasswordHash
from core.config import get_settings
from repositories.user import UserRepository
from datetime import timedelta, datetime, timezone
import jwt 
from uuid import uuid4
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from repositories.auth import AuthRepository
class AuthService():
  def __init__(self, user_repository: UserRepository, auth_repository: AuthRepository):
    self.password_hash = PasswordHash.recommended()
    self.DUMMY_HASH = self.password_hash.hash("dummyhash")
    self.user_repository = user_repository
    self.settings = get_settings()
    self.auth_repository = auth_repository
  
  def create_access_token(self, payload: dict):
    to_encode = payload.copy()
    now = datetime.now(tz=timezone.utc)
    expire = now + timedelta(minutes=float(get_settings().access_token_expire_minutes))
    to_encode.update({"iat": now, "exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, get_settings().secret_key.get_secret_value(), algorithm=get_settings().algorithm)
    return encoded_jwt
  
  async def create_refresh_token(self, payload: dict):
    to_encode = payload.copy()
    now = datetime.now(tz=timezone.utc)
    jti = str(uuid4())
    expire = now + timedelta(days=float(get_settings().refresh_token_expire_days))
    to_encode.update({"iat": now, "exp": expire, "type": "refresh", "jti": jti})
    encoded_jwt = jwt.encode(to_encode, get_settings().secret_key.get_secret_value(), algorithm=get_settings().algorithm)
    expire_naive = expire.replace(tzinfo=None)
    await self.auth_repository.add_token_to_db(jti=jti, expires_at=expire_naive, user_id=payload.get("id"))
    
    return encoded_jwt
  
  async def verify_refresh_token(self, token: str | bytes):
    try:
      payload = jwt.decode(jwt=token, key=get_settings().secret_key.get_secret_value(), algorithms=[get_settings().algorithm])
      token_id = payload.get("jti")
      if payload.get("type") != "refresh":
        raise ValueError("Неверный тип токена")
      token_from_db = await self.auth_repository.get_token_by_jti(token_id)
      if not token_from_db:
        raise ValueError("Такого токена нет")
      if token_from_db.revoke_at:
        raise ValueError("Токен в черном списке")
      return True
    except InvalidTokenError:
      raise ValueError("Невалидный токен")
    except ExpiredSignatureError:
      raise ValueError("Токен истек")
    
  
  async def refresh_access_token(self, refresh_token: str):
     try:
       await self.verify_refresh_token(refresh_token)
       payload = jwt.decode(jwt=refresh_token, 
                            key=get_settings().secret_key.get_secret_value(), 
                            algorithms=[get_settings().algorithm])
       user_id = payload.get("id")
       user_login = payload.get("login")
       superuser = payload.get("superuser")
       new_access_token = self.create_access_token({"id": user_id, "login": user_login, "superuser": superuser})
       return new_access_token
     except ValueError as e:
      return ValueError(str(e))
    
  async def revoke_refresh_token(self, token: str | bytes):
    payload = jwt.decode(jwt=token, key=get_settings().secret_key.get_secret_value(),algorithms=[get_settings().algorithm])
    jti = payload.get("jti")
    await self.auth_repository.revoke_refresh_token(jti=jti)

  def get_current_user(self, token: str | bytes):
    payload = jwt.decode(jwt=token, 
                         key=get_settings().secret_key.get_secret_value(), 
                         algorithms=[get_settings().algorithm])
    return payload
  

  
  def verify_password(self, plain_password, hashed_password):
    return self.password_hash.verify(password=plain_password, hash=hashed_password)
  
  def get_password_hash(self, password):
    return self.password_hash.hash(password=password)
  

  async def authenticate_user(self, login: str, password: str):
    try:
      user = await self.user_repository.get_user_by_login(login)
      if not user:
        self.verify_password(password, self.DUMMY_HASH)
        return False 
      if not self.verify_password(password, user.get("password")):
        return False 
      return {
        "id": user.get("id"),
        "login": user.get("login"),
        "superuser": user.get("superuser")
      }
    except ValueError as e:
      return str(e)
    
  def get_id_from_token(self, token: str):
    try:
      
      payload = jwt.decode(jwt=token, key=get_settings().secret_key.get_secret_value(), 
                         algorithms=[get_settings().algorithm])
      return payload.get("id")
    except InvalidTokenError:
      raise ValueError("Невалидный токен")
    except ExpiredSignatureError:
      raise ValueError("Токен просрочен")

  
  async def revoke_all_user_tokens(self, user_id: str):
    return await self.auth_repository.revoke_all_user_tokens(user_id=user_id)
    
  async def get_me(self, access_token):
    try:
      payload = self.get_current_user(access_token)
      return {
        "id": payload.get("id"),
        "login": payload.get("login"),
        "superuser": payload.get("superuser")
      }
    except InvalidTokenError:
      raise ValueError("Невалидный токен")
    except ExpiredSignatureError:
        raise ValueError("Токен просрочен")
      
  