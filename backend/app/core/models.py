from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import DateTime, func, String, ForeignKey
from typing import Optional, List
from uuid import UUID, uuid4 
from datetime import datetime
import enum 

class Base(DeclarativeBase):
  pass 

class OrderStatus(enum.Enum):
  NEW = "Новая"
  PROCESSING = "Обработка данных"
  READY = "Услуга оказана"

class User(Base):
  __tablename__ = "users"
  id: Mapped[Optional[UUID]] = mapped_column(default=uuid4, primary_key=True)
  full_name: Mapped[str] = mapped_column(nullable=False)
  login: Mapped[str] = mapped_column(String(30), nullable=False, unique=True)
  email: Mapped[str] = mapped_column(nullable=False, unique=True)
  password: Mapped[str] = mapped_column(nullable=False)
  superuser: Mapped[bool] = mapped_column(nullable=False, default=False)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
  orders: Mapped[List["Order"] | None] = relationship(back_populates="user")
  refresh_tokens: Mapped[List["RefreshToken"]] = relationship(back_populates="user")
class Order(Base):
  __tablename__ = "orders"
  id: Mapped[Optional[UUID]] = mapped_column(default=uuid4, primary_key=True)
  status: Mapped[OrderStatus] = mapped_column(nullable=False)
  nickname: Mapped[str] = mapped_column(nullable=False, index=True)
  result_photo: Mapped[Optional[str]]
  photo: Mapped[str] = mapped_column(nullable=False)
  user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id"))
  user: Mapped["User"] = relationship(back_populates="orders")
  
class RefreshToken(Base):
  __tablename__ = "refresh_tokens"
  id: Mapped[UUID] = mapped_column(default=uuid4, primary_key=True)
  expires_at: Mapped[datetime] = mapped_column(nullable=False)
  revoke_at: Mapped[Optional[datetime]]
  user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id"))
  user: Mapped["User"] = relationship(back_populates="refresh_tokens")