from pydantic import BaseModel, Field, field_validator # type: ignore
from typing import Optional

class DetalleVenta(BaseModel):
  id_detalle_venta: Optional[int] = None
  precio_venta: int = Field(ge=0)
  cantidad: int = Field(ge=1)
  id_producto: int = Field(ge=1)
  id_venta: int = Field(ge=1)
