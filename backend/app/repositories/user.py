from core.db import AsyncSession
from core.models import User
from schemas.user import CreateUser
class UserRepository:
  def __init__(self, session: AsyncSession):
    self.session = session 
  async def create_user(self, user: CreateUser):
    user_db = User(full_name=user.full_name, login=user.login, email=user.email, password=user.password, superuser=False)
    self.session.add(user_db)
    await self.session.commit()
    await self.session.refresh(user_db)
    return {
      "id": f"{user_db.id}"
    }