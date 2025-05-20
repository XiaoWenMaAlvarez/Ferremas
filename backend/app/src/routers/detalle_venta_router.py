from typing import Optional
from src.models.detalle_venta import DetalleVenta
from fastapi import APIRouter, Depends, HTTPException, Body # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

detalle_venta_router = APIRouter(
  prefix="/detalle_venta",
  tags=["Detalles de venta"]
)

@detalle_venta_router.get("/")
async def get_detalles_venta(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(
    text("SELECT * FROM detalle_venta")
  )
  result = []
  for row in query_results.mappings():
    detalle_venta = {
      "id_detalle_venta": row["id_detalle_venta"],
      "precio_venta": row["precio_venta"],
      "cantidad": row["cantidad"],
      "id_producto": row["id_producto"],
      "id_venta": row["id_venta"],
    }
    result.append(detalle_venta)
  return result


@detalle_venta_router.get("/{id}")
async def get_detalle_venta_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM detalle_venta WHERE id_detalle_venta = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Detalle de venta no encontrado.")
  detalle_venta = {
    "id_detalle_venta": resultado["id_detalle_venta"],
    "precio_venta": resultado["precio_venta"],
    "cantidad": resultado["cantidad"],
    "id_producto": resultado["id_producto"],
    "id_venta": resultado["id_venta"],
  }
  return detalle_venta


@detalle_venta_router.post("/")
async def crear_detalle_venta(
  detalle_venta: DetalleVenta,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
        INSERT INTO detalle_venta (precio_venta, cantidad, id_producto, id_venta)
        VALUES (:precio_venta, :cantidad, :id_producto, :id_venta)
        RETURNING precio_venta, cantidad, id_producto, id_venta
    """)

  result = await session.execute(query, {
    "precio_venta": detalle_venta.precio_venta,
    "cantidad": detalle_venta.cantidad,
    "id_producto": detalle_venta.id_producto,
    "id_venta": detalle_venta.id_venta,
  })

  await session.commit()

  resultado = result.mappings().first()

  return resultado


@detalle_venta_router.put("/{id}")
async def actualizar_detalle_venta(
  id: int,
  detalle_venta: DetalleVenta,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
UPDATE detalle_venta 
SET precio_venta = :precio_venta, cantidad = :cantidad, id_producto = :id_producto, id_venta = :id_venta
WHERE id_detalle_venta = :id_detalle_venta
  """)

  result = await session.execute(query, {
    "id_detalle_venta": id,
    "precio_venta": detalle_venta.precio_venta,
    "cantidad": detalle_venta.cantidad,
    "id_producto": detalle_venta.id_producto,
    "id_venta": detalle_venta.id_venta,
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Detalle de venta no encontrado.")

  return {"mensaje": "Actualización correcta"}


@detalle_venta_router.delete("/{id}")
async def borrar_detalle_venta(id: int, session: AsyncSession = Depends(get_session)):
  query = text("""
        DELETE FROM detalle_venta 
        WHERE id_detalle_venta = :id
    """)

  result = await session.execute(query, {
    "id": id,
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Detalle de venta no encontrado.")

  return {"filas_eliminadas": filas_afectadas}


@detalle_venta_router.get("/por_venta/{id}")
async def get_detalle_venta_por_id_venta(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM venta WHERE id_Venta = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Venta no encontrada.")
  
  query_results = await session.execute(
    text(
      "SELECT * FROM detalle_venta AS dv JOIN venta AS v ON(dv.id_venta = v.id_venta) JOIN producto AS p ON(dv.id_producto = p.id_producto) WHERE dv.id_venta = :id;"
    ), 
    {"id": id}
  )
  result = []
  for row in query_results.mappings():
    detalle_venta = {
      "codigo": row["codigo"],
      "precio_venta": row["precio_venta"],
      "cantidad": row["cantidad"],
      "id_producto": row["id_producto"],
      "id_venta": row["id_venta"],
      "nombre": row["nombre"],
      "subtotal": row["precio_venta"] * row["cantidad"],
      
    }
    result.append(detalle_venta)
  return result
