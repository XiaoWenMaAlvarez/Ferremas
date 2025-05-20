from pydantic import BaseModel, Field, field_validator # type: ignore
from typing import Optional
import re

class ClienteUpdate(BaseModel):
    id_cliente: Optional[int] = None
    nombre_completo: Optional[str] = None
    correo_electronico: Optional[str] = None
    password: Optional[str] = None
    direccion: Optional[str] = None
    is_habilitado_para_descuento: Optional[bool] = None
    is_confirmado_para_descuento: Optional[bool] = None
    numero_de_contacto: Optional[str] = None
    id_comuna: Optional[int] = None

class Cliente(BaseModel):
  id_cliente: Optional[int] = None
  nombre_completo: str = Field(min_length=2, max_length=80)
  correo_electronico: str = Field(min_length=2, max_length=80)
  password: str = Field(min_length=2, max_length=150)
  direccion: str = Field(min_length=2, max_length=150)
  is_habilitado_para_descuento: bool = False
  is_confirmado_para_descuento: bool = False
  numero_de_contacto: str = Field(min_length=2, max_length=20)
  id_comuna: int = Field(ge=1)


  def copy_with(
    self,
    id_cliente: Optional[int] = None,
    nombre_completo: Optional[str] = None, 
    correo_electronico: Optional[str] = None,
    password: Optional[str] = None, 
    direccion: Optional[str] = None, 
    is_habilitado_para_descuento: Optional[bool] = None, 
    is_confirmado_para_descuento: Optional[bool] = None, 
    numero_de_contacto: Optional[str] = None, 
    id_comuna: Optional[int] = None, 
  ) -> "Cliente":
    return Cliente(
      id_cliente=id_cliente if (id_cliente is not None) else self.id_cliente,
      nombre_completo=nombre_completo if (nombre_completo is not None) else self.nombre_completo,
      correo_electronico=correo_electronico if (correo_electronico is not None) else self.correo_electronico,
      password=password if (password is not None) else self.password,
      direccion=direccion if (direccion is not None) else self.direccion,
      is_habilitado_para_descuento=is_habilitado_para_descuento if (is_habilitado_para_descuento is not None) else self.is_habilitado_para_descuento,
      is_confirmado_para_descuento=is_confirmado_para_descuento if (is_confirmado_para_descuento is not None) else self.is_confirmado_para_descuento,
      numero_de_contacto=numero_de_contacto if (numero_de_contacto is not None) else self.numero_de_contacto,
      id_comuna=id_comuna if (id_comuna is not None) else self.id_comuna,
    )

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