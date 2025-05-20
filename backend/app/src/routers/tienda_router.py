from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

tienda_router = APIRouter(
  prefix="/tienda",
  tags=["Tienda"]
)

@tienda_router.get("/")
async def get_tiendas(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(
    text(""" 
SELECT t.id_tienda, t.nombre, t.direccion, c.descripcion as comuna, r.descripcion as region
FROM TIENDA AS t 
LEFT JOIN COMUNA AS c ON(t.id_comuna = c.id_comuna)
LEFT JOIN REGION AS r ON(r.id_region = c.id_region);
""")
  )
  result = []
  for row in query_results.mappings():
    tienda = {
      "id_tienda": row["id_tienda"],
      "nombre": row["nombre"],
      "direccion": row["direccion"],
      "comuna": row["comuna"],
      "region": row["region"]
    }
    result.append(tienda)
  return result


@tienda_router.get("/{id}")
async def get_tienda_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("""
SELECT t.id_tienda, t.nombre, t.direccion, c.descripcion as comuna, r.descripcion as region
FROM TIENDA AS t 
JOIN COMUNA AS c ON(t.id_comuna = c.id_comuna)
JOIN REGION AS r ON(r.id_region = c.id_region)
WHERE t.id_tienda = :id;
"""), 
{"id": id}
)
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Tienda no encontrada.")
  return resultado