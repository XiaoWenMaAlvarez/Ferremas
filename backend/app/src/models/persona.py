from pydantic import BaseModel, Field, field_validator # type: ignore
from typing import Optional

class Persona(BaseModel):
  id_persona: Optional[int] = None
  nombre: str = Field(min_length=2, max_length=15)
  email: str = Field(min_length=2, max_length=50)
  password: str = Field(min_length=2, max_length=15)

  def copy_with(
    self,
    id_persona: Optional[int] = None,
    nombre: Optional[str] = None,
    email: Optional[str] = None,
    password: Optional[str] = None
  ) -> "Persona":
    return Persona(
      id_persona=id_persona if (id_persona is not None) else self.id_persona,
      nombre=nombre if (nombre is not None) else self.nombre,
      email=email if (email is not None) else self.email,
      password=password if (password is not None) else self.password
    )
  
  @field_validator('nombre')
  def validar_nombre(cls, value):
    caracteres = value.replace(" ","")
    if not(caracteres.isalpha()):
      raise ValueError('El nombre debe contener solo letras')
    return value
