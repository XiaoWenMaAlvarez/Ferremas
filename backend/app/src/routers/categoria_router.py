from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

categoria_router = APIRouter(
  prefix="/categoria",
  tags=["Categoría"]
)

@categoria_router.get("/")
async def get_tipos_pago(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(
    text("SELECT * FROM categoria")
  )
  result = []
  for row in query_results.mappings():
    categoria = {
      "id_categoria": row["id_categoria"],
      "descripcion": row["descripcion"],
    }
    result.append(categoria)
  return result


@categoria_router.get("/{id}")
async def get_categoria_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("""
SELECT * FROM categoria
WHERE id_categoria = :id;
"""), 
{"id": id}
)
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Categoría no encontrada.")
  return resultado