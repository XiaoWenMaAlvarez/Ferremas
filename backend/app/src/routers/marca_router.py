from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

marca_router = APIRouter(
  prefix="/marca",
  tags=["Marca"]
)

@marca_router.get("/")
async def get_tipos_pago(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(
    text("SELECT * FROM marca")
  )
  result = []
  for row in query_results.mappings():
    marca = {
      "id_marca": row["id_marca"],
      "descripcion": row["descripcion"],
      "presentacion": row["presentacion"],
    }
    result.append(marca)
  return result


@marca_router.get("/{id}")
async def get_marca_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("""
SELECT * FROM marca
WHERE id_marca = :id;
"""), 
{"id": id}
)
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Marca no encontrada.")
  return resultado