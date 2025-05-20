from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

tipo_pago_router = APIRouter(
  prefix="/tipo_pago",
  tags=["Tipo de pago"]
)

@tipo_pago_router.get("/")
async def get_tipos_pago(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(
    text("SELECT * FROM tipo_pago")
  )
  result = []
  for row in query_results.mappings():
    tipo_pago = {
      "id_tipo_pago": row["id_tipo_pago"],
      "descripcion": row["descripcion"],
    }
    result.append(tipo_pago)
  return result


@tipo_pago_router.get("/{id}")
async def get_tipo_pago_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("""
SELECT * FROM tipo_pago
WHERE id_tipo_pago = :id;
"""), 
{"id": id}
)
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Tipo de pago no encontrado.")
  return resultado