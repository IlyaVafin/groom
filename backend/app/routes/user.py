from fastapi import APIRouter, Depends
from schemas.user import CreateUser
from services.user import UserService
from depends import get_user_service
from typing import Annotated
user_router = APIRouter()

@user_router.post("/user")
async def create_user(user: CreateUser, user_service: Annotated[UserService, Depends(get_user_service)]):
  return await user_service.create_user(user)
  