from datetime import date
from pydantic import BaseModel, Field, field_validator # type: ignore
from typing import Optional

class Venta(BaseModel):
  id_venta: Optional[int] = None
  id_cliente: int = Field(ge=1)
  id_tienda: int = Field(ge=1)
  id_tipo_entrega: int = Field(ge=1)
  id_estado_venta: int = Field(ge=1)
  id_tipo_pago: int = Field(ge=1)
  fecha: Optional[date] = None
  descuento: Optional[int] = None
  sucursal_retiro: Optional[int] = None
  url_foto_transferencia: Optional[str] = None
  id_pago_online: Optional[str] = None
  id_contador: Optional[int] = None
  id_vendedor: Optional[int] = None
  id_bodeguero: Optional[int] = None
  id_comuna: Optional[int] = None
  direccion_envio: Optional[str] = None

  def copy_with(
    self,
    id_venta: Optional[int] = None,
    id_cliente: int = Field(ge=1),
    id_tienda: int = Field(ge=1),
    id_tipo_entrega: int = Field(ge=1),
    id_estado_venta: int = Field(ge=1),
    id_tipo_pago: int = Field(ge=1),
    fecha: Optional[date] = None,
    descuento: Optional[int] = None,
    sucursal_retiro: Optional[int] = None,
    url_foto_transferencia: Optional[str] = None,
    id_pago_online: Optional[str] = None,
    id_contador: Optional[int] = None,
    id_vendedor: Optional[int] = None,
    id_bodeguero: Optional[int] = None,
    id_comuna: Optional[int] = None,
    direccion_envio: Optional[str] = None
  ) -> "Venta":
    return Venta(
      id_venta=id_venta if (id_venta is not None) else self.id_venta,
      id_cliente=id_cliente if (id_cliente is not None) else self.id_cliente,
      id_tienda=id_tienda if (id_tienda is not None) else self.id_tienda,
      id_tipo_entrega=id_tipo_entrega if (id_tipo_entrega is not None) else self.id_tipo_entrega,
      id_estado_venta=id_estado_venta if (id_estado_venta is not None) else self.id_estado_venta,
      id_tipo_pago=id_tipo_pago if (id_tipo_pago is not None) else self.id_tipo_pago,
      fecha=fecha if (fecha is not None) else self.fecha,
      descuento=descuento if (descuento is not None) else self.descuento,
      sucursal_retiro=sucursal_retiro if (sucursal_retiro is not None) else self.sucursal_retiro,
      url_foto_transferencia=url_foto_transferencia if (url_foto_transferencia is not None) else self.url_foto_transferencia,
      id_pago_online=id_pago_online if (id_pago_online is not None) else self.id_pago_online,
      id_contador=id_contador if (id_contador is not None) else self.id_contador,
      id_vendedor=id_vendedor if (id_vendedor is not None) else self.id_vendedor,
      id_bodeguero=id_bodeguero if (id_bodeguero is not None) else self.id_bodeguero,
      id_comuna=id_comuna if (id_comuna is not None) else self.id_comuna,
      direccion_envio=direccion_envio if (direccion_envio is not None) else self.direccion_envio
    )


class VentaUpdate(BaseModel):
    id_cliente: Optional[int] = None
    id_tienda: Optional[int] = None
    id_tipo_entrega: Optional[int] = None
    id_estado_venta: Optional[int] = None
    id_tipo_pago: Optional[int] = None
    fecha: Optional[date] = None
    descuento: Optional[int] = None
    sucursal_retiro: Optional[int] = None
    url_foto_transferencia: Optional[str] = None
    id_pago_online: Optional[str] = None
    id_contador: Optional[int] = None
    id_vendedor: Optional[int] = None
    id_bodeguero: Optional[int] = None
    id_comuna: Optional[int] = None
    direccion_envio: Optional[str] = None