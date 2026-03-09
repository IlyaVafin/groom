from fastapi import APIRouter, Depends, HTTPException
from schemas.user import CreateUser
from services.user import UserService
from depends import get_user_service
from typing import Annotated
from core.config import get_settings, Settings
user_router = APIRouter()

@user_router.post("/user")
async def create_user(user: CreateUser, user_service: Annotated[UserService, Depends(get_user_service)]):
  return await user_service.create_user(user)

@user_router.post("/user/admin")
async def create_user_admin(api_key: str, settings: Annotated[Settings, Depends(get_settings)], user_service: Annotated[UserService, Depends(get_user_service)]):
  if api_key != settings.api_key.get_secret_value():
    raise HTTPException(status_code=403, detail="Неверный API ключ")
  return await user_service.create_user_admin()
  
  