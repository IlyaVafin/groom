from typing import Annotated
from core.db import AsyncSession, get_session

from repositories.auth import AuthRepository
from repositories.user import UserRepository

from services.user import UserService 
from services.auth import AuthService

from fastapi import Depends

def get_user_repository(session: Annotated[AsyncSession, Depends(get_session)]):
  return UserRepository(session=session)

def get_auth_repository(session: Annotated[AsyncSession, Depends(get_session)]):
  return AuthRepository(session=session)

def get_auth_service(user_repository: Annotated[UserRepository, Depends(get_user_repository)], auth_repository: Annotated[AuthRepository, Depends(get_auth_repository)]):
  return AuthService(user_repository=user_repository, auth_repository=auth_repository)

def get_user_service(user_repository: Annotated[UserRepository, Depends(get_user_repository)],    auth_service: Annotated[AuthService, Depends(get_auth_service)]):
  return UserService(user_repository=user_repository, auth_service=auth_service)