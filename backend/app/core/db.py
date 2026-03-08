from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from collections.abc import AsyncGenerator
from .config import get_settings
from .models import Base
async_engine = create_async_engine(url=get_settings().database_url)
AsyncSessionLocal = async_sessionmaker(bind=async_engine, expire_on_commit=False)

async def get_session() -> AsyncGenerator[AsyncSession]:
  async with AsyncSessionLocal() as session:
    yield session

async def init_models():
  async with async_engine.begin() as conn:
    await conn.run_sync(Base.metadata.create_all)

  

