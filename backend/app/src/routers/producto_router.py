from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

producto_router = APIRouter(
  prefix="/producto",
  tags=["Producto"]
)

@producto_router.get("/")
async def get_productos(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(
    text("SELECT * FROM producto ORDER BY fecha_de_lanzamiento DESC")
  )
  result = []
  for row in query_results.mappings():
    producto = {
      "id_producto": row["id_producto"],
      "codigo": row["codigo"],
      "codigo_de_producto": row["codigo_de_producto"],
      "fecha_de_lanzamiento": row["fecha_de_lanzamiento"],
      "nombre": row["nombre"],
      "precio": row["precio"],
      "stock": row["stock"],
      "descripcion": row["descripcion"],
      "id_categoria": row["id_categoria"],
      "id_marca": row["id_marca"],
    }
    result.append(producto)
  return result


@producto_router.get("/{id}")
async def get_producto_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM producto WHERE id_producto = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Producto no encontrado.")
  return resultado


@producto_router.get("/por_categoria/{id}")
async def get_producto_por_id_categoria(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM categoria WHERE id_categoria = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Categoría no encontrada.")

  query_results = await session.execute(text("SELECT * FROM producto WHERE id_categoria = :id;"), {"id": id})
  result = []
  for row in query_results.mappings():
    producto = {
      "id_producto": row["id_producto"],
      "codigo": row["codigo"],
      "codigo_de_producto": row["codigo_de_producto"],
      "fecha_de_lanzamiento": row["fecha_de_lanzamiento"],
      "nombre": row["nombre"],
      "precio": row["precio"],
      "stock": row["stock"],
      "descripcion": row["descripcion"],
      "id_categoria": row["id_categoria"],
      "id_marca": row["id_marca"],
    }
    result.append(producto)
  return result


@producto_router.patch("/restar_stock/{id}")
async def partial_update_producto(
  id: int,
  cantidad_a_restar: int, 
  session: AsyncSession = Depends(get_session)
):
  if cantidad_a_restar <= 0 is None:
    raise HTTPException(status_code=404, detail="La cantidad a restar no puede ser menor a 0.")
  
  query_results = await session.execute(text("SELECT id_producto, stock FROM producto WHERE id_producto = :id;"), {"id": id})
  registro_encontrado = query_results.mappings().first()
  if registro_encontrado is None:
    raise HTTPException(status_code=404, detail="Producto no encontrado.")
  
  producto = {
      "id_producto": registro_encontrado["id_producto"],
      "stock": registro_encontrado["stock"]
    }

  if(producto["stock"] < cantidad_a_restar):
    raise HTTPException(status_code=404, detail="La cantidad demandada es mayor al stock disponible.")

  producto["stock"] = producto["stock"] - cantidad_a_restar

  query = text("""
        UPDATE producto 
        SET stock = :stock
        WHERE id_producto = :id
    """)

  await session.execute(query, {
    "id": id,
    "stock": producto["stock"],
  })

  await session.commit()

  return {
    "mensaje": f"Stock actualizado: {producto["stock"]}"
  }


@producto_router.get("/por_marca/{id}")
async def get_producto_por_id_marca(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM marca WHERE id_marca = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Marca no encontrada.")

  query_results = await session.execute(text("SELECT * FROM producto WHERE id_marca = :id;"), {"id": id})
  result = []
  for row in query_results.mappings():
    producto = {
      "id_producto": row["id_producto"],
      "codigo": row["codigo"],
      "codigo_de_producto": row["codigo_de_producto"],
      "fecha_de_lanzamiento": row["fecha_de_lanzamiento"],
      "nombre": row["nombre"],
      "precio": row["precio"],
      "stock": row["stock"],
      "descripcion": row["descripcion"],
      "id_categoria": row["id_categoria"],
      "id_marca": row["id_marca"],
    }
    result.append(producto)
  return result