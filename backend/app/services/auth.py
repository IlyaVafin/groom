from pwdlib import PasswordHash
from core.config import get_settings
from repositories.user import UserRepository
from datetime import timedelta, datetime, timezone
import jwt 
class AuthService():
  def __init__(self, user_repository: UserRepository):
    self.password_hash = PasswordHash.recommended()
    self.DUMMY_HASH = self.password_hash.hash("dummyhash")
    self.user_repository = user_repository
    self.settings = get_settings()
  
  def create_access_token(self, payload: dict):
    to_encode = payload.copy()
    expire = datetime.now(tz=timezone.utc) + timedelta(minutes=float(get_settings().access_token_expire_minutes))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, get_settings().secret_key.get_secret_value(), algorithm=get_settings().algorithm)
    return encoded_jwt
  
  def get_current_user(self, token: str | bytes):
    payload = jwt.decode(jwt=token, 
                         key=get_settings().secret_key.get_secret_value(), 
                         algorithms=[get_settings().algorithm])
    print(payload)
  
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
      return user
    except ValueError as e:
      return str(e)