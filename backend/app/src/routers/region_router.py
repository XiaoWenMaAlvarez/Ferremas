from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

region_router = APIRouter(
  prefix="/region",
  tags=["Region"]
)

@region_router.get("/")
async def get_regiones(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM region;"))
  result = []
  for row in query_results.mappings():
    region = {
      "id_region": row["id_region"],
      "descripcion": row["descripcion"],
    }
    result.append(region)
  return result


@region_router.get("/{id}")
async def get_region_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM region WHERE id_region = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Region no encontrada.")
  return resultado
