from core.db import AsyncSession
from core.models import User
from schemas.user import CreateUser
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
class UserRepository:
  def __init__(self, session: AsyncSession):
    self.session = session 
    
    
  async def create_user(self, user: CreateUser, superuser: bool):
    user_db = User(full_name=user.full_name, login=user.login, email=user.email, password=user.password, superuser=superuser)
    try:
      self.session.add(user_db)
      await self.session.commit()
      await self.session.refresh(user_db)
      return {
        "id": f"{user_db.id}"
      }
    except IntegrityError:
      raise ValueError("Такой пользователь уже существует")
    
  async def get_user_by_login(self, login: str):
      try:
        stmt = await self.session.execute(select(User).where(User.login == login))
        user = stmt.scalar_one_or_none()
        if not user:
          raise ValueError("Неккоректный логин или пароль")
        return {
          "id": f"{user.id}",
          "login": f"{user.login}",
          "password": f"{user.password}",
          "superuser": f"{user.superuser}"
        }
      except ValueError as e:
        raise ValueError(str(e))
  
  async def is_super_user(self, user_id):
    stmt = await self.session.execute(select(User.superuser).where(User.id == user_id))
    is_super_user = stmt.scalar_one_or_none()
    if type(is_super_user) == None:
      raise ValueError("Пользователь не найден")
    return is_super_user
    
     
