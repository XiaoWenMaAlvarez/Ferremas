from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

foto_producto_router = APIRouter(
  prefix="/foto_producto",
  tags=["Foto de productos"]
)

@foto_producto_router.get("/")
async def get_fotos_de_productos(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(
    text("SELECT * FROM foto_producto")
  )
  result = []
  for row in query_results.mappings():
    foto_producto = {
      "id_foto_producto": row["id_foto_producto"],
      "url_foto": row["url_foto"],
      "id_producto": row["id_producto"],
    }
    result.append(foto_producto)
  return result


@foto_producto_router.get("/{id}")
async def get_foto_producto_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("""
SELECT * FROM foto_producto
WHERE id_foto_producto = :id;
"""), 
{"id": id}
)
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Foto de producto no encontrada.")
  return resultado


@foto_producto_router.get("/por_id_producto/{id}")
async def get_foto_producto_por_id_producto(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM producto WHERE id_producto = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Producto no encontrado.")

  query_results = await session.execute(text("SELECT * FROM foto_producto WHERE id_producto = :id;"), {"id": id})
  result = []
  for row in query_results.mappings():
    foto_producto = {
      "id_foto_producto": row["id_foto_producto"],
      "url_foto": row["url_foto"],
      "id_producto": row["id_producto"],
    }
    result.append(foto_producto)
  return result
