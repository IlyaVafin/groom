from repositories.user import UserRepository
from schemas.user import CreateUser
class UserService():
  def __init__(self, user_repository: UserRepository):
    self.user_repository = user_repository
  
  async def create_user(self, user: CreateUser):
    return await self.user_repository.create_user(user)
  