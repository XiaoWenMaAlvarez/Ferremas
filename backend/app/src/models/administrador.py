from pydantic import BaseModel, Field, field_validator # type: ignore
from typing import Optional
import re

class Administrador(BaseModel):
  id_administrador: Optional[int] = None
  nombre_completo: str = Field(min_length=2, max_length=80)
  correo_electronico: str = Field(min_length=2, max_length=80)
  password: str = Field(min_length=2, max_length=150)
  id_tienda: int = Field(ge=1)

  @field_validator('nombre_completo')
  def validar_nombre(cls, value):
    caracteres = value.replace(" ","")
    if not(caracteres.isalpha()):
      raise ValueError('El nombre debe contener solo letras')
    return value
  

  @field_validator('correo_electronico')
  def validar_email(cls, value):
    email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    if re.match(email_regex, value):
      return value
    else:
      raise ValueError(f"'{value}' no es una dirección de email válida.")
