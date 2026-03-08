from fastapi import APIRouter, Request, Depends, UploadFile, Form, HTTPException
from schemas.order import CreateOrder
from depends import get_order_service
from services.order import OrderService
from typing import Annotated
from uuid import uuid4
from shutil import copyfileobj
import os
order_router = APIRouter()

@order_router.post("/order")
async def create_order(request: Request, order_service: Annotated[OrderService, Depends(get_order_service)], file: UploadFile, nickname: str = Form()):
  try:
    
    access_token = request.cookies.get("access_token")
    if not access_token:
      raise HTTPException(status_code=401, detail="Невалидный токен")
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid4()}{file_extension}"
    file_path = f"img/{unique_filename}"
    with open(file_path, "wb") as buffer:
      copyfileobj(file.file, buffer)
    return await order_service.create_order(order=CreateOrder(nickname=nickname, photo=str(file_path), status="Новая"), token=access_token)
  except ValueError as e:
    raise HTTPException(status_code=401, detail=str(e))

  
  