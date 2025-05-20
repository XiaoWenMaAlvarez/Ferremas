from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker


# La gracia es que esté en un .env
DATABASE_URL = "postgresql+asyncpg://postgres:pass123@localhost:5432/ferremas_db"

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

async def get_session():
  async with async_session() as session:
    yield session
