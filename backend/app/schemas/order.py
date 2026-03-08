from pydantic import BaseModel
class Base(BaseModel):
  pass 

class CreateOrder(Base):
  nickname: str 
  photo: str
  status: str