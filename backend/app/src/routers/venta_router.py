from datetime import date, datetime
from src.models.venta import Venta, VentaUpdate
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

venta_router = APIRouter(
  prefix="/venta",
  tags=["Ventas"]
)

@venta_router.get("/")
async def get_ventas(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM venta;"))
  result = []
  for row in query_results.mappings():
    venta = {
      "id_venta": row["id_venta"],
      "id_cliente": row["id_cliente"],
      "id_tienda": row["id_tienda"],
      "id_tipo_entrega": row["id_tipo_entrega"],
      "id_estado_venta": row["id_estado_venta"],
      "id_tipo_pago": row["id_tipo_pago"],
      "fecha": row["fecha"],
      "descuento": row["descuento"],
      "sucursal_retiro": row["sucursal_retiro"],
      "url_foto_transferencia": row["url_foto_transferencia"],
      "id_pago_online": row["id_pago_online"],
      "id_contador": row["id_contador"],
      "id_vendedor": row["id_vendedor"],
      "id_bodeguero": row["id_bodeguero"],
      "id_comuna": row["id_comuna"],
      "direccion_envio": row["direccion_envio"]
    }
    result.append(venta)
  return result


@venta_router.get("/{id}")
async def get_venta_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM venta WHERE id_venta = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Venta no encontrada.")
  return resultado


@venta_router.post("/")
async def crear_venta(
  venta: Venta,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
    INSERT INTO venta (id_cliente, id_tienda, id_tipo_entrega, id_estado_venta, id_tipo_pago, fecha, descuento, sucursal_retiro, 
      url_foto_transferencia, id_pago_online, id_contador, id_vendedor, id_bodeguero, id_comuna, direccion_envio)
    VALUES (:id_cliente, :id_tienda, :id_tipo_entrega, :id_estado_venta, :id_tipo_pago, :fecha, :descuento, :sucursal_retiro, 
      :url_foto_transferencia, :id_pago_online, :id_contador, :id_vendedor, :id_bodeguero, :id_comuna, :direccion_envio)
    RETURNING id_venta
    """)

  result = await session.execute(query, {
    "id_cliente": venta.id_cliente,
    "id_tienda": venta.id_tienda,
    "id_tipo_entrega": venta.id_tipo_entrega,
    "id_estado_venta": venta.id_estado_venta,
    "id_tipo_pago": venta.id_tipo_pago,
    "fecha": venta.fecha,
    "descuento": venta.descuento,
    "sucursal_retiro": venta.sucursal_retiro,
    "url_foto_transferencia": venta.url_foto_transferencia,
    "id_pago_online": venta.id_pago_online,
    "id_contador": venta.id_contador,
    "id_vendedor": venta.id_vendedor,
    "id_bodeguero": venta.id_bodeguero,
    "id_comuna": venta.id_comuna,
    "direccion_envio": venta.direccion_envio
  })

  await session.commit()

  resultado = result.mappings().first()

  return resultado


@venta_router.delete("/{id}")
async def borrar_venta(id: int, session: AsyncSession = Depends(get_session)):
  query = text("""
        DELETE FROM venta 
        WHERE id_venta = :id
    """)

  result = await session.execute(query, {
    "id": id,
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Venta no encontrada.")

  return {"filas_eliminadas": filas_afectadas}


@venta_router.patch("/{id}")
async def partial_update_venta(
  id: int,
  data: VentaUpdate,
  session: AsyncSession = Depends(get_session)
):
  query_results = await session.execute(text("SELECT * FROM venta WHERE id_venta = :id;"), {"id": id})
  registro_encontrado = query_results.mappings().first()
  if registro_encontrado is None:
    raise HTTPException(status_code=404, detail="Venta no encontrada.")
  
  venta_encontrada = Venta(
    id_venta= registro_encontrado["id_venta"],
    id_cliente= registro_encontrado["id_cliente"],
    id_tienda= registro_encontrado["id_tienda"],
    id_tipo_entrega= registro_encontrado["id_tipo_entrega"],
    id_estado_venta= registro_encontrado["id_estado_venta"],
    id_tipo_pago= registro_encontrado["id_tipo_pago"],
    fecha= registro_encontrado["fecha"],
    descuento= registro_encontrado["descuento"],
    sucursal_retiro= registro_encontrado["sucursal_retiro"],
    url_foto_transferencia= registro_encontrado["url_foto_transferencia"],
    id_pago_online= registro_encontrado["id_pago_online"],
    id_contador= registro_encontrado["id_contador"],
    id_vendedor= registro_encontrado["id_vendedor"],
    id_bodeguero= registro_encontrado["id_bodeguero"],
    id_comuna= registro_encontrado["id_comuna"],
    direccion_envio= registro_encontrado["direccion_envio"]
  )

  venta_encontrada = venta_encontrada.copy_with(
    id_cliente=data.id_cliente if data.id_cliente is not None else venta_encontrada.id_cliente,
    id_tienda=data.id_tienda if data.id_tienda is not None else venta_encontrada.id_tienda,
    id_tipo_entrega= data.id_tipo_entrega if data.id_tipo_entrega is not None else venta_encontrada.id_tipo_entrega,
    id_estado_venta= data.id_estado_venta if data.id_estado_venta is not None else venta_encontrada.id_estado_venta,
    id_tipo_pago= data.id_tipo_pago if data.id_tipo_pago is not None else venta_encontrada.id_tipo_pago,
    fecha=data.fecha if data.fecha is not None else venta_encontrada.fecha,
    descuento= data.descuento if data.descuento is not None else venta_encontrada.descuento,
    sucursal_retiro= data.sucursal_retiro if data.sucursal_retiro is not None else venta_encontrada.sucursal_retiro,
    url_foto_transferencia=data.url_foto_transferencia  if data.url_foto_transferencia is not None else venta_encontrada.url_foto_transferencia,
    id_pago_online= data.id_pago_online if data.id_pago_online is not None else venta_encontrada.id_pago_online,
    id_contador= data.id_contador if data.id_contador is not None else venta_encontrada.id_contador,
    id_vendedor= data.id_vendedor if data.id_vendedor is not None else venta_encontrada.id_vendedor,
    id_bodeguero= data.id_bodeguero if data.id_bodeguero is not None else venta_encontrada.id_bodeguero,
    id_comuna= data.id_comuna if data.id_comuna is not None else venta_encontrada.id_comuna,
    direccion_envio= data.direccion_envio if data.direccion_envio is not None else venta_encontrada.direccion_envio
  )

  query = text("""
    UPDATE venta 
    SET id_cliente = :id_cliente, id_tienda = :id_tienda, id_tipo_entrega = :id_tipo_entrega, id_estado_venta = :id_estado_venta, 
      id_tipo_pago = :id_tipo_pago, fecha = :fecha, descuento = :descuento, sucursal_retiro = :sucursal_retiro, 
      url_foto_transferencia = :url_foto_transferencia, id_pago_online = :id_pago_online, id_contador = :id_contador, 
      id_vendedor = :id_vendedor, id_bodeguero = :id_bodeguero, id_comuna = :id_comuna, direccion_envio = :direccion_envio
    WHERE id_venta = :id_venta
    """)

  await session.execute(query, {
    "id_venta": id,
    "id_cliente": venta_encontrada.id_cliente,
    "id_tienda": venta_encontrada.id_tienda,
    "id_tipo_entrega": venta_encontrada.id_tipo_entrega,
    "id_estado_venta": venta_encontrada.id_estado_venta,
    "id_tipo_pago": venta_encontrada.id_tipo_pago,
    "fecha": venta_encontrada.fecha,
    "descuento": venta_encontrada.descuento,
    "sucursal_retiro": venta_encontrada.sucursal_retiro,
    "url_foto_transferencia": venta_encontrada.url_foto_transferencia,
    "id_pago_online": venta_encontrada.id_pago_online,
    "id_contador": venta_encontrada.id_contador,
    "id_vendedor": venta_encontrada.id_vendedor,
    "id_bodeguero": venta_encontrada.id_bodeguero,
    "id_comuna": venta_encontrada.id_comuna,
    "direccion_envio": venta_encontrada.direccion_envio
  })

  await session.commit()

  return {
    "mensaje": f"Actualización exitosa de la venta {venta_encontrada}"
  }


@venta_router.get("/por_estado_venta/{id}")
async def get_venta_por_id_estado_venta(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM estado_venta WHERE id_estado_venta = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Estado de venta no encontrado.")
  
  query_results = await session.execute(text("SELECT * FROM venta  WHERE id_estado_venta = :id;"), {"id": id})
  result = []
  for row in query_results.mappings():
    venta = {
      "id_venta": row["id_venta"],
      "id_cliente": row["id_cliente"],
      "id_tienda": row["id_tienda"],
      "id_tipo_entrega": row["id_tipo_entrega"],
      "id_estado_venta": row["id_estado_venta"],
      "id_tipo_pago": row["id_tipo_pago"],
      "fecha": row["fecha"],
      "descuento": row["descuento"],
      "sucursal_retiro": row["sucursal_retiro"],
      "url_foto_transferencia": row["url_foto_transferencia"],
      "id_pago_online": row["id_pago_online"],
      "id_contador": row["id_contador"],
      "id_vendedor": row["id_vendedor"],
      "id_bodeguero": row["id_bodeguero"],
      "id_comuna": row["id_comuna"],
      "direccion_envio": row["direccion_envio"]
    }
    result.append(venta)
  return result


@venta_router.get("/por_cliente/{id}")
async def get_venta_por_id_cliente(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM cliente WHERE id_cliente = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Cliente no encontrado.")
  
  query_results = await session.execute(text("SELECT * FROM venta  WHERE id_cliente = :id;"), {"id": id})
  result = []
  for row in query_results.mappings():
    venta = {
      "id_venta": row["id_venta"],
      "id_cliente": row["id_cliente"],
      "id_tienda": row["id_tienda"],
      "id_tipo_entrega": row["id_tipo_entrega"],
      "id_estado_venta": row["id_estado_venta"],
      "id_tipo_pago": row["id_tipo_pago"],
      "fecha": row["fecha"],
      "descuento": row["descuento"],
      "sucursal_retiro": row["sucursal_retiro"],
      "url_foto_transferencia": row["url_foto_transferencia"],
      "id_pago_online": row["id_pago_online"],
      "id_contador": row["id_contador"],
      "id_vendedor": row["id_vendedor"],
      "id_bodeguero": row["id_bodeguero"],
      "id_comuna": row["id_comuna"],
      "direccion_envio": row["direccion_envio"]
    }
    result.append(venta)
  return result


@venta_router.get("/por_tienda/{id}/{month}/{year}")
async def get_venta_por_id_tienda(id: int, month: int, year: int, session: AsyncSession = Depends(get_session)):

  if month < 1 or month > 12:
    raise HTTPException(status_code=404, detail="Mes inválido.")
  
  if year < 2025:
    raise HTTPException(status_code=404, detail="El sistema no posee registros desde antes de 2025")
  
  if year > datetime.now().year:
    raise HTTPException(status_code=404, detail="El sistema no posee registros de ventas futuras")

  query_results = await session.execute(text("SELECT * FROM tienda WHERE id_tienda = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Tienda no encontrada.")
  
  query_results = await session.execute(text(
    """
    SELECT v.fecha, v.descuento, SUM(dt.precio_venta * dt.cantidad) AS total_bruto FROM venta AS v
    JOIN detalle_venta AS dt ON(v.id_venta = dt.id_venta)
    WHERE id_tienda = :id AND id_estado_venta = 4
    AND EXTRACT(MONTH FROM fecha) = :month AND EXTRACT(YEAR FROM fecha) = :year
	  GROUP BY v.id_venta;
    """
    ), {"id": id, "month": month, "year": year})
  result = []
  for row in query_results.mappings():
    venta = {
      "fecha": row["fecha"],
      "total_bruto": row["total_bruto"],
      "descuento": row["descuento"],
      "total_neto": row["total_bruto"] - (row["total_bruto"] * row["descuento"] / 100)
    }
    result.append(venta)

  return result
