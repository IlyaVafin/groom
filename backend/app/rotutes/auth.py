from fastapi import APIRouter, Depends, Response, HTTPException, Request
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
  if not user or type(user) == str:
    raise HTTPException(status_code=401, detail="Неверный логин или пароль")
  await auth_serivce.revoke_all_user_tokens(user.get("id"))
  access_token = auth_serivce.create_access_token(user)
  refresh_token = await auth_serivce.create_refresh_token(user)
  response.set_cookie("access_token", access_token, max_age=1800, httponly=True)
  response.set_cookie("refresh_token", refresh_token, httponly=True)
  return {"message": "Successfully login"}
  
@auth_router.get("/me")
async def get_me(request: Request, auth_service: Annotated[AuthService, Depends(get_auth_service)]):
    try:
      access_token = request.cookies.get("access_token")
      return await auth_service.get_me(access_token=access_token)
    except ValueError as e:
      raise HTTPException(status_code=401, detail=str(e))
    
@auth_router.post("/refresh")
async def refresh_access_token(request: Request, 
                               response: Response,
                               auth_service: Annotated[AuthService, Depends(get_auth_service)]):
  try:
    refresh_token = request.cookies.get("refresh_token")
    access_token = request.cookies.get("access_token")
    await auth_service.verify_refresh_token(refresh_token)
    new_token = await auth_service.refresh_access_token(refresh_token=refresh_token, access_token=access_token)
    response.set_cookie("access_token", new_token)
  except ValueError as e:
    raise HTTPException(status_code=401, detail=str(e))
  
  

@auth_router.post("/logout")
async def logout(response: Response, request: Request, auth_service: Annotated[AuthService, Depends(get_auth_service)]):
  try:
    refresh_token = request.cookies.get("refresh_token")
    
    await auth_service.verify_refresh_token(refresh_token)
    await auth_service.revoke_refresh_token(token=refresh_token)
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Successfully logout"}
  except ValueError as e:
    raise HTTPException(status_code=401, detail=str(e))
