from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

comuna_router = APIRouter(
  prefix="/comuna",
  tags=["Comuna"]
)

@comuna_router.get("/")
async def get_comunas(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM region;"))
  regiones = []
  for row in query_results.mappings():
    region = {
      "id_region": row["id_region"],
      "descripcion": row["descripcion"],
    }
    regiones.append(region)

  comunas_por_region = {}

  for region in regiones:
    id_region = region["id_region"]
    nombre_region = region["descripcion"]
    comunas_por_region[id_region] = []

    query_results = await session.execute(text("SELECT * FROM comuna WHERE id_region = :id;"), {"id": id_region})

    for row in query_results.mappings():
      comuna = {
        "id_comuna": row["id_comuna"],
        "descripcion": row["descripcion"]
      }

      comunas_por_region[id_region].append(comuna)

  return comunas_por_region


@comuna_router.get("/{id}")
async def get_comuna_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM comuna WHERE id_comuna = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Persona no encontrada.")
  return resultado