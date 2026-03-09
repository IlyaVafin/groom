from repositories.user import UserRepository
from schemas.user import CreateUser, AdminUser
from services.auth import AuthService
from core.config import Settings

class UserService():
  def __init__(self, user_repository: UserRepository, auth_service: AuthService, settings: Settings):
    self.user_repository = user_repository
    self.auth_service = auth_service
    self.settings = settings
  async def create_user(self, user: CreateUser):
    try:
      if user.password != user.repeat_password:
        raise ValueError("Пароли не совпадают")
      hashed_password = self.auth_service.get_password_hash(user.password)
      return await self.user_repository.create_user(CreateUser(
      full_name=user.full_name, 
      login=user.login, 
      email=user.email, 
      password=hashed_password, repeat_password=user.repeat_password), superuser=False)
    except ValueError as e:
      raise ValueError(str(e))
    
  async def create_user_admin(self):
      password = self.settings.admin_password.get_secret_value()
      hashed_password = self.auth_service.get_password_hash(password=password)
      login = self.settings.admin_login.get_secret_value()
      await self.user_repository.create_user(AdminUser(full_name="Админ", login=login, email="workemail@gmail.com", password=hashed_password), superuser=True)
      return {"message": "Администратор создан"}
      
  
    
  async def is_super_user(self, token: str | bytes):
    try:
      user_id = await self.auth_service.get_id_from_token(token=token)
      is_super_user = await self.user_repository.is_super_user(user_id=user_id)
      return is_super_user
    except ValueError as e:
      raise ValueError(str(e))

    
  