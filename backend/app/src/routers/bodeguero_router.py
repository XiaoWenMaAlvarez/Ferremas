from src.models.bodeguero import Bodeguero
from src.helpers.funciones import *
from fastapi import APIRouter, Depends, HTTPException, Body, Request # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session
from src.helpers.authorization import encode_token_bodeguero, decode_token_bodeguero

bodeguero_router = APIRouter(
  prefix="/bodeguero",
  tags=["Bodeguero"]
)

@bodeguero_router.get("/validar-token")
def validar_token_bodeguero(request: Request):
  try:
    headers = request.headers
    token = headers["authorization"].split(" ")
    data = decode_token_bodeguero(token[1])
    return data
  except:
    raise HTTPException(status_code=401, detail="Autorización errónea.")

@bodeguero_router.get("/")
async def get_bodegueros(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM bodeguero;"))
  result = []
  for row in query_results.mappings():
    contador = {
      "id_bodeguero": row["id_bodeguero"],
      "nombre_completo": row["nombre_completo"],
      "correo_electronico": row["correo_electronico"]
    }
    result.append(contador)
  return result


@bodeguero_router.get("/{id}")
async def get_bodeguero_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM bodeguero WHERE id_bodeguero = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Bodeguero no encontrado.")
  bodeguero = {
    "id_bodeguero": resultado["id_bodeguero"],
    "nombre_completo": resultado["nombre_completo"],
    "correo_electronico": resultado["correo_electronico"],
  }
  return bodeguero


@bodeguero_router.post("/")
async def crear_bodeguero(
  bodeguero: Bodeguero,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
        INSERT INTO bodeguero (nombre_completo, correo_electronico, password)
        VALUES (:nombre_completo, :correo_electronico, :password)
        RETURNING nombre_completo, correo_electronico
    """)

  result = await session.execute(query, {
    "nombre_completo": bodeguero.nombre_completo,
    "correo_electronico": bodeguero.correo_electronico,
    "password": codificar_password(bodeguero.password),
  })

  await session.commit()

  resultado = result.mappings().first()

  return resultado


@bodeguero_router.put("/{id}")
async def actualizar_bodeguero(
  id: int,
  bodeguero: Bodeguero,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
UPDATE bodeguero 
SET nombre_completo = :nombre_completo, correo_electronico = :correo_electronico, password = :password
WHERE id_bodeguero = :id_bodeguero
    """)

  result = await session.execute(query, {
    "id_bodeguero": id,
    "nombre_completo": bodeguero.nombre_completo,
    "correo_electronico": bodeguero.correo_electronico,
    "password": codificar_password(bodeguero.password),
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Bodeguero no encontrado.")

  return {"mensaje": "Actualización correcta"}


@bodeguero_router.delete("/{id}")
async def borrar_bodeguero(id: int, session: AsyncSession = Depends(get_session)):
  query = text("""
        DELETE FROM bodeguero 
        WHERE id_bodeguero = :id
    """)

  result = await session.execute(query, {
    "id": id,
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Bodeguero no encontrado.")

  return {"filas_eliminadas": filas_afectadas}


@bodeguero_router.post("/login")
async def login_bodeguero(
  correo_electronico: str = Body(), 
  password: str = Body(),
  session: AsyncSession = Depends(get_session)
):
  query_results = await session.execute(text(
    "SELECT * FROM bodeguero WHERE correo_electronico = :correo_electronico;"), 
    {"correo_electronico": correo_electronico})
  
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=401, detail="Email o contraseña incorrectos.")
  
  password_codificada = resultado["password"]

  if(comprobar_password(password, password_codificada)):
    token = encode_token_bodeguero({
      "id_bodeguero": resultado["id_bodeguero"],
      "correo_electronico": resultado["correo_electronico"],
      "nombre_completo": resultado["nombre_completo"],
    })
    return {
      "access_token": token
    }
  
  raise HTTPException(status_code=401, detail="Email o contraseña incorrectos.")
