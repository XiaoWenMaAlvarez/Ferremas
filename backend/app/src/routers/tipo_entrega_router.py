from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

tipo_entrega_router = APIRouter(
  prefix="/tipo_entrega",
  tags=["Tipo de entrega"]
)

@tipo_entrega_router.get("/")
async def get_tipos_entrega(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(
    text("SELECT * FROM tipo_entrega")
  )
  result = []
  for row in query_results.mappings():
    tipo_entrega = {
      "id_tipo_entrega": row["id_tipo_entrega"],
      "descripcion": row["descripcion"],
    }
    result.append(tipo_entrega)
  return result


@tipo_entrega_router.get("/{id}")
async def get_tipo_entrega_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("""
SELECT * FROM tipo_entrega
WHERE id_tipo_entrega = :id;
"""), 
{"id": id}
)
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Tipo de entrega no encontrado.")
  return resultado