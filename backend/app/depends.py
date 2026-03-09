from typing import Annotated

from core.db import AsyncSession, get_session
from core.config import Settings, get_settings

from repositories.auth import AuthRepository
from repositories.user import UserRepository
from repositories.order import OrderRepository

from services.user import UserService 
from services.auth import AuthService
from services.order import OrderService
from services.file import FileService

from fastapi import Depends

def get_user_repository(session: Annotated[AsyncSession, Depends(get_session)]):
  return UserRepository(session=session)

def get_auth_repository(session: Annotated[AsyncSession, Depends(get_session)]):
  return AuthRepository(session=session)

def get_order_repository(session: Annotated[AsyncSession, Depends(get_session)]):
  return OrderRepository(session=session)


def get_auth_service(user_repository: Annotated[UserRepository, Depends(get_user_repository)], auth_repository: Annotated[AuthRepository, Depends(get_auth_repository)]):
  return AuthService(user_repository=user_repository, auth_repository=auth_repository)

def get_order_service(order_repository: Annotated[OrderRepository, Depends(get_order_repository)], auth_service: Annotated[AuthService, Depends(get_auth_service)], user_repository: Annotated[UserRepository, Depends(get_user_repository)]):
  return OrderService(order_repository=order_repository, auth_service=auth_service, user_repository=user_repository)

def get_user_service(user_repository: Annotated[UserRepository, Depends(get_user_repository)],    auth_service: Annotated[AuthService, Depends(get_auth_service)], settings: Annotated[Settings, Depends(get_settings)]):
  return UserService(user_repository=user_repository, auth_service=auth_service, settings=settings)

def get_file_service():
  return FileService()