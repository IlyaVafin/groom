from fastapi import APIRouter, Depends, Response, HTTPException
from typing import Annotated 
from services.auth import AuthService
from schemas.user import LoginUser
from depends import get_auth_service
auth_router = APIRouter()

@auth_router.post("/login")
async def login(auth_serivce: Annotated[AuthService, Depends(get_auth_service)], 
                user_data: LoginUser,
                response: Response):
  user = await auth_serivce.authenticate_user(login=user_data.login, password=user_data.password)
  if not user:
    raise HTTPException(status_code=401, detail="Invalid credentials")
  if "not found" in user:
    raise HTTPException(status_code=404, detail="User not found")
  token = auth_serivce.create_access_token(user)
  response.set_cookie("access_token", token, max_age=3600, httponly=True)
  

