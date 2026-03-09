from core.db import AsyncSession
from core.models import Order
from schemas.order import CreateOrder
from sqlalchemy import select
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
    
  async def get_user_orders(self, user_id: str):
    stmt = await self.session.execute(select(Order).where(Order.user_id == user_id).order_by(Order.created_at.desc()))
    orders = stmt.scalars().all()
    return orders
  
  async def get_all_orders(self):
    stmt = await self.session.execute(select(Order))
    orders = stmt.scalars().all()
    return orders
  
  async def get_finished_orders(self, user_id):
    stmt = await self.session.execute(select(Order).limit(4).where(Order.status == "Услуга оказана" and Order.user_id == user_id))
    orders = stmt.scalars().all()
    return orders
  
  async def get_orders_images(self):
    stmt = await self.session.execute(select(Order.result_photo).where(Order.result_photo != None))
    images = stmt.scalars().all()
    return images

  
  async def update_status(self, order_id: str, status: str, path_to_image: str):
    try:
      order = await self.get_order_by_id(order_id=order_id)
      if not order:
        raise ValueError("Заявка не найдена")
      current_status = order.status
      if current_status == 'Услуга оказана':
        raise ValueError("Изменение статуса заявки невозможно")
      if status == "Услуга оказана":
        order.result_photo = path_to_image
      order.status = status
      await self.session.commit()
      await self.session.refresh(order)
      return order
    except ValueError as e:
      raise ValueError(str(e))
    
    
  async def delete_order(self, order_id: str, user_id: str):
    stmt = await self.session.execute(select(Order).where(Order.id == order_id, Order.user_id == user_id))
    try:
      order = stmt.scalar_one_or_none()
      if not order:
        raise ValueError("Заявка не найдена")
      if order.status == "Новая":
        await self.session.delete(order)
        await self.session.commit()
        return {"message": "Заявка успешно удалена"}
      else:
        raise ValueError("Заявка не может быть удалена")
    except ValueError as e:
      raise ValueError(str(e))
    
    

    
  async def get_order_by_id(self, order_id: str):
      stmt = await self.session.execute(select(Order).where(Order.id == order_id))
      order = stmt.scalar_one_or_none()
      return order
    
  