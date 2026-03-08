from repositories.user import UserRepository
from schemas.user import CreateUser
from services.auth import AuthService
class UserService():
  def __init__(self, user_repository: UserRepository, auth_service: AuthService):
    self.user_repository = user_repository
    self.auth_service = auth_service
  async def create_user(self, user: CreateUser):
    try:
      
      hashed_password = self.auth_service.get_password_hash(user.password)
      return await self.user_repository.create_user(CreateUser(
      full_name=user.full_name, 
      login=user.login, 
      email=user.email, 
      password=hashed_password, repeat_password=user.repeat_password))
    except ValueError as e:
      return ValueError(str(e))
  