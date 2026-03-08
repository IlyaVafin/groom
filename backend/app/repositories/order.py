from core.db import AsyncSession
from core.models import Order
from schemas.order import CreateOrder
class OrderRepository:
  def __init__(self, session: AsyncSession):
    self.session = session
    
  async def create_order(self, order: CreateOrder, user_id: str):
    order_db = Order(nickname=order.nickname, photo=order.photo, status=order.status, user_id=user_id)
    self.session.add(order_db)
    await self.session.commit()
    await self.session.refresh(order_db)
    return {
      "id": order_db.id,
      "nickname": order_db.nickname,
      "photo": order_db.photo,
      "status": order_db.status
    }