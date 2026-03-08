from pydantic import BaseModel, EmailStr, Field
from typing import Annotated
class Base(BaseModel):
  ... 
class CreateUser(Base):
  full_name: Annotated[str, Field(pattern= r'^[а-яА-ЯёЁ\s]+$')] = "Иван Иванов Иванович"
  login: Annotated[str, Field(pattern=r'^[a-zA-Z\-]+$')] = "Login"
  email: EmailStr
  password: str 
  repeat_password: str