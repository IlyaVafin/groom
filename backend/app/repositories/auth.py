from core.db import AsyncSession
from core.models import RefreshToken
from sqlalchemy import select, update
from datetime import datetime, timezone
class AuthRepository():
  def __init__(self, session: AsyncSession):
    self.session = session 
    
  async def add_token_to_db(self, jti, expires_at, user_id):
    token_db = RefreshToken(id=jti, expires_at=expires_at, user_id=user_id)
    self.session.add(token_db)
    await self.session.commit()
    await self.session.refresh(token_db)
    
  async def get_token_by_jti(self, jti: str):
    stmt = await self.session.execute(select(RefreshToken).where(RefreshToken.id == jti))
    token = stmt.scalar_one_or_none()
    return token
  
  async def revoke_all_user_tokens(self, user_id: str):
    await self.session.execute(update(RefreshToken).where(RefreshToken.user_id == user_id, RefreshToken.revoke_at.is_(None)).values(revoke_at=datetime.now(tz=None)))
    await self.session.commit()
    
  async def revoke_refresh_token(self, jti: str):
    await self.session.execute(update(RefreshToken).where(RefreshToken.id == jti).values(revoke_at=datetime.now(tz=None)))
    await self.session.commit()
    
      
    