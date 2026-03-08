from pwdlib import PasswordHash
from core.config import get_settings
from repositories.user import UserRepository
import jwt 
class AuthService():
  def __init__(self, user_repository: UserRepository):
    self.password_hash = PasswordHash.recommended()
    self.DUMMY_HASH = self.password_hash.hash("dummyhash")
    self.user_repository = user_repository
  def encode_jwt(self, payload, 
                 key: str = get_settings().secret_key.get_secret_value(), 
                 algorithm: str = get_settings().algorithm):
    encoded = jwt.encode(payload=payload, key=key, algorithm=algorithm)
    return encoded
  
  def decode_jwt(self, 
                 token: str | bytes, 
                 key: str = get_settings().secret_key.get_secret_value(), 
                 algorithm: str = get_settings().algorithm):
    decoded = jwt.decode(jwt=token, key=key, algorithms=[algorithm])
    return decoded
  
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
      if not self.verify_password(password, user.password):
        return False 
      return user 
    except ValueError as e:
      raise ValueError(str(e))