from src.models.contador import Contador
from src.helpers.funciones import *
from fastapi import APIRouter, Depends, HTTPException, Body, Request # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session
from src.helpers.authorization import encode_token_contador, decode_token_contador

contador_router = APIRouter(
  prefix="/contador",
  tags=["Contador"]
)

@contador_router.get("/validar-token")
def validar_token_contador(request: Request):
  try:
    headers = request.headers
    token = headers["authorization"].split(" ")
    data = decode_token_contador(token[1])
    return data
  except:
    raise HTTPException(status_code=401, detail="Autorización errónea.")

@contador_router.get("/")
async def get_contadores(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM CONTADOR AS c LEFT JOIN TIENDA AS t ON(c.id_tienda = t.id_tienda);"))
  result = []
  for row in query_results.mappings():
    contador = {
      "id_contador": row["id_contador"],
      "nombre_completo": row["nombre_completo"],
      "correo_electronico": row["correo_electronico"],
      "tienda": row["nombre"],
      "id_tienda": row["id_tienda"]
    }
    result.append(contador)
  return result


@contador_router.get("/{id}")
async def get_contador_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM CONTADOR AS c LEFT JOIN TIENDA AS t ON(c.id_tienda = t.id_tienda) WHERE id_contador = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Contador no encontrado.")
  contador = {
    "id_contador": resultado["id_contador"],
    "nombre_completo": resultado["nombre_completo"],
    "correo_electronico": resultado["correo_electronico"],
    "tienda": resultado["nombre"],
    "id_tienda": resultado["id_tienda"]
  }
  return contador


@contador_router.post("/")
async def crear_contador(
  contador: Contador,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
        INSERT INTO contador (nombre_completo, correo_electronico, password, id_tienda)
        VALUES (:nombre_completo, :correo_electronico, :password, :id_tienda)
        RETURNING nombre_completo, correo_electronico, id_tienda
    """)

  result = await session.execute(query, {
    "nombre_completo": contador.nombre_completo,
    "correo_electronico": contador.correo_electronico,
    "password": codificar_password(contador.password),
    "id_tienda": contador.id_tienda,
  })

  await session.commit()

  resultado = result.mappings().first()

  return resultado


@contador_router.put("/{id}")
async def actualizar_contador(
  id: int,
  contador: Contador,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
UPDATE contador 
SET nombre_completo = :nombre_completo, correo_electronico = :correo_electronico, password = :password, id_tienda = :id_tienda
WHERE id_contador = :id_contador
    """)

  result = await session.execute(query, {
    "id_contador": id,
    "nombre_completo": contador.nombre_completo,
    "correo_electronico": contador.correo_electronico,
    "password": codificar_password(contador.password),
    "id_tienda": contador.id_tienda
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Contador no encontrado.")

  return {"mensaje": "Actualización correcta"}


@contador_router.delete("/{id}")
async def borrar_contador(id: int, session: AsyncSession = Depends(get_session)):
  query = text("""
        DELETE FROM contador 
        WHERE id_contador = :id
    """)

  result = await session.execute(query, {
    "id": id,
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Contador no encontrado.")

  return {"filas_eliminadas": filas_afectadas}


@contador_router.post("/login")
async def login_contador(
  correo_electronico: str = Body(), 
  password: str = Body(),
  session: AsyncSession = Depends(get_session)
):
  query_results = await session.execute(text(
    "SELECT * FROM contador WHERE correo_electronico = :correo_electronico;"), 
    {"correo_electronico": correo_electronico})
  
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=401, detail="Email o contraseña incorrectos.")
  
  password_codificada = resultado["password"]

  if(comprobar_password(password, password_codificada)):
    token = encode_token_contador({
      "id_contador": resultado["id_contador"],
      "correo_electronico": resultado["correo_electronico"],
      "nombre_completo": resultado["nombre_completo"],
      "id_tienda": resultado["id_tienda"],
    })
    return {
      "access_token": token
    }
  
  raise HTTPException(status_code=401, detail="Email o contraseña incorrectos.")