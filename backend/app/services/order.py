from repositories.order import OrderRepository
from services.auth import AuthService
from schemas.order import CreateOrder
class OrderService:
  def __init__(self, order_repository: OrderRepository, auth_service: AuthService):
    self.order_repository = order_repository 
    self.auth_service = auth_service
    
    
  async def create_order(self, order: CreateOrder, token: str | bytes):
    try:
      user_id = self.auth_service.get_id_from_token(token=token)
      return await self.order_repository.create_order(order=order, user_id=user_id)
    except ValueError as e:
      raise ValueError(str(e))
