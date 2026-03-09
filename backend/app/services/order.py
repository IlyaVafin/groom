from repositories.order import OrderRepository
from repositories.user import UserRepository
from services.auth import AuthService
from schemas.order import CreateOrder
class OrderService:
  def __init__(self, order_repository: OrderRepository, auth_service: AuthService, user_repository: UserRepository):
    self.order_repository = order_repository 
    self.auth_service = auth_service
    self.user_repository = user_repository
    
  async def create_order(self, order: CreateOrder, token: str | bytes):
    try:
      user_id = self.auth_service.get_id_from_token(token=token)
      return await self.order_repository.create_order(order=order, user_id=user_id)
    except ValueError as e:
      raise ValueError(str(e))

  async def update_status(self, order_id: str, token: str, status: str, path_to_image: str | None = None):
    try:
      if status != "Новая" and status != "Услуга оказана" and status != "Обработка данных":
        raise ValueError("Неккоректный статус")

      user_id = self.auth_service.get_id_from_token(token=token)
      is_super_user = await self.user_repository.is_super_user(user_id=user_id)
      if not is_super_user:
        raise ValueError("Недостаточно прав")
      order = await self.order_repository.update_status(order_id=order_id, status=status, path_to_image=path_to_image)
      return order
    except ValueError as e:
      raise ValueError(str(e))
  
  async def delete_order(self, order_id: str, token: str):
    try:
      user_id = self.auth_service.get_id_from_token(token=token)
      return await self.order_repository.delete_order(order_id=order_id, user_id=user_id)
    except ValueError as e:
      raise ValueError(str(e))
    
  
    
