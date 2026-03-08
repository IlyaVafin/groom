from pydantic import BaseModel
class Base(BaseModel):
  ...
class Token(Base):
  access_token: str 
  token_type: str
  
class TokenData(Base):
  id: str 
  
  