from core.db import AsyncSession
from core.models import User
from schemas.user import CreateUser
from sqlalchemy import select
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
    
  async def get_user_by_login(self, login: str):
      try:
        stmt = await self.session.execute(select(User).where(User.login == login))
        user = stmt.scalar_one_or_none()
        if not user:
          raise ValueError("User not found")
        return {
          "id": f"{user.id}",
          "login": f"{user.login}",
          "password": f"{user.password}",
          "superuser": f"{user.superuser}"
        }
      except ValueError as e:
        raise ValueError(str(e))
    
     
