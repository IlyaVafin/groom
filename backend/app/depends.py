from typing import Annotated
from core.db import AsyncSession, get_session
from repositories.user import UserRepository
from services.user import UserService 
from fastapi import Depends

def get_user_repository(session: Annotated[AsyncSession, Depends(get_session)]):
  return UserRepository(session=session)

def get_user_service(user_repository: Annotated[UserRepository, Depends(get_user_repository)]):
  return UserService(user_repository=user_repository)