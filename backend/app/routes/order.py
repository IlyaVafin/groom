from fastapi import APIRouter, Request, Depends, UploadFile, Form, HTTPException, File
from schemas.order import CreateOrder
from depends import get_order_service, get_file_service
from services.order import OrderService
from services.file import FileService
from typing import Annotated
from uuid import UUID
order_router = APIRouter()

@order_router.post("/order")
async def create_order(request: Request, 
                       order_service: Annotated[OrderService, Depends(get_order_service)], 
                       file: UploadFile,  
                       file_service: Annotated[FileService, Depends(get_file_service)], 
                       nickname: str = Form()):
  try:
    access_token = request.cookies.get("access_token")
    if not access_token:
      raise HTTPException(status_code=401, detail="Невалидный токен")
    file_path = file_service.save_file(file=file)
    return await order_service.create_order(order=CreateOrder(nickname=nickname, photo=str(file_path), status="Новая"), token=access_token)
  except ValueError as e:
    if "токен" in str(e):
     raise HTTPException(status_code=401, detail=str(e))
    raise HTTPException(status_code=400, detail=str(e))

  
@order_router.get("/order")
async def get_orders(request: Request, 
                     order_service: Annotated[OrderService, Depends(get_order_service)]):
  try:
    access_token = request.cookies.get("access_token")
    if not access_token:
      raise HTTPException(status_code=401, detail="Невалидный токен")
    return await order_service.get_orders(token=access_token)
  except ValueError as e:
    if "токен" in str(e).lower():
      raise HTTPException(status_code=401, detail=str(e))
    
  
@order_router.patch("/order/{id}")
async def update_status(request: Request, 
                        order_service: Annotated[OrderService, Depends(get_order_service)], 
                        id: str, 
                        file_service: Annotated[FileService, Depends(get_file_service)], result_photo: UploadFile | None = File(None), 
                        status: str = Form()):
  try:
    is_uuid = UUID(id)
    access_token = request.cookies.get("access_token")
    if not result_photo and status == "Услуга оказана":
      raise HTTPException(status_code=400, detail="Картинка обязательна")
    if result_photo:
      file_path = file_service.save_file(file=result_photo)
      return await order_service.update_status(order_id=id, token=access_token, status=status, path_to_image=file_path)
    else:
      return await order_service.update_status(order_id=id, token=access_token, status=status)
  except ValueError as e:
    error = str(e)
    if "не найдена" in error:
      raise HTTPException(status_code=404, detail=error)
    if "Изменение статуса" in error:
      raise HTTPException(status_code=400, detail=error)
    if "токен" in error.lower():
      raise HTTPException(status_code=401, detail=error)
    if "Недостаточно прав" in error:
      raise HTTPException(status_code=403, detail=error)
    if "badly" in error:
      raise HTTPException(status_code=404, detail="Неккоректный UUID")
    raise HTTPException(status_code=400, detail=error)
  
@order_router.delete("/order/{id}")
async def delete_order(order_service: Annotated[OrderService, Depends(get_order_service)], 
                       id: str, 
                       request: Request, ):
  try:
    is_uuid = UUID(id)
    access_token = request.cookies.get("access_token")
    return await order_service.delete_order(order_id=id, token=access_token)
  except ValueError as e:
    error = str(e)
    if 'токен' in error.lower():
      raise HTTPException(status_code=401, detail=error)
    if 'не найдена' in error:
      raise HTTPException(status_code=404, detail=error)
    if 'не может быть удалена' in error:
      raise HTTPException(status_code=400, detail=error)
    if "badly" in error:
      raise HTTPException(status_code=404, detail="Неккоректный UUID")
    raise HTTPException(status_code=400, detail=error)
    
  
  


  

  
  
  
  
  