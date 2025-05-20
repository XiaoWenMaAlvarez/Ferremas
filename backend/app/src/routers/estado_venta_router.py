from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

estado_venta_router = APIRouter(
  prefix="/estado_venta",
  tags=["Estado de venta"]
)

@estado_venta_router.get("/")
async def get_estados_venta(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(
    text("SELECT * FROM estado_venta")
  )
  result = []
  for row in query_results.mappings():
    estado_venta = {
      "id_estado_venta": row["id_estado_venta"],
      "descripcion": row["descripcion"],
    }
    result.append(estado_venta)
  return result


@estado_venta_router.get("/{id}")
async def get_estado_venta_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("""
SELECT * FROM estado_venta
WHERE id_estado_venta = :id;
"""), 
{"id": id}
)
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Estado de venta no encontrado.")
  return resultado