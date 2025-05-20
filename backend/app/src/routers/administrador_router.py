from fastapi import APIRouter, Depends, HTTPException, Body, Request  
from sqlalchemy import text 
from sqlalchemy.ext.asyncio import AsyncSession
from src.models.administrador import Administrador
from src.helpers.funciones import *
from db.config import get_session
from src.helpers.authorization import encode_token_administrador, decode_token_administrador

administrador_router = APIRouter(
  prefix="/administrador",
  tags=["Administrador"]
)

@administrador_router.get("/validar-token")
def validar_token_administrador(request: Request):
  try:
    headers = request.headers
    token = headers["authorization"].split(" ")
    data = decode_token_administrador(token[1])
    return data
  except:
    raise HTTPException(status_code=401, detail="Autorización errónea.")


@administrador_router.get("/")
async def get_administradores(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM administrador;"))
  result = []
  for row in query_results.mappings():
    administrador = {
      "id_administrador": row["id_administrador"],
      "nombre_completo": row["nombre_completo"],
      "correo_electronico": row["correo_electronico"],
      "id_tienda": row["id_tienda"],
      "is_primer_login": row["is_primer_login"]
    }
    result.append(administrador)
  return result


@administrador_router.get("/{id}")
async def get_administrador_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM administrador WHERE id_administrador = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Administrador no encontrado.")
  administrador = {
    "id_administrador": resultado["id_administrador"],
    "nombre_completo": resultado["nombre_completo"],
    "correo_electronico": resultado["correo_electronico"],
    "id_tienda": resultado["id_tienda"],
    "is_primer_login": resultado["is_primer_login"]
  }
  return administrador


@administrador_router.put("/{id}")
async def actualizar_administrador(
  id: int,
  administrador: Administrador,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
UPDATE administrador 
SET nombre_completo = :nombre_completo, correo_electronico = :correo_electronico, password = :password, id_tienda = :id_tienda, 
              is_primer_login = FALSE
WHERE id_administrador = :id_administrador
    """)

  result = await session.execute(query, {
    "id_administrador": id,
    "nombre_completo": administrador.nombre_completo,
    "correo_electronico": administrador.correo_electronico,
    "password": codificar_password(administrador.password),
    "id_tienda": administrador.id_tienda
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Administrador no encontrado.")

  return {"mensaje": "Actualización correcta"}


@administrador_router.post("/login")
async def login_administrador(
  correo_electronico: str = Body(), 
  password: str = Body(),
  session: AsyncSession = Depends(get_session)
):
  query_results = await session.execute(text(
    "SELECT * FROM administrador WHERE correo_electronico = :correo_electronico;"), 
    {"correo_electronico": correo_electronico})
  
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=401, detail="Email o contraseña incorrectos.")
  
  password_codificada = resultado["password"]

  if(comprobar_password(password, password_codificada)):
    token = encode_token_administrador({
      "id_administrador": resultado["id_administrador"],
      "correo_electronico": resultado["correo_electronico"],
      "nombre_completo": resultado["nombre_completo"],
      "id_tienda": resultado["id_tienda"],
    })
    return {
      "access_token": token
    }
  
  raise HTTPException(status_code=401, detail="Email o contraseña incorrectos.")


