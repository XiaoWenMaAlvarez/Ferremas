from src.models.vendedor import Vendedor
from src.helpers.funciones import *
from fastapi import APIRouter, Depends, HTTPException, Body, Request # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session
from src.helpers.authorization import encode_token_vendedor, decode_token_vendedor

vendedor_router = APIRouter(
  prefix="/vendedor",
  tags=["Vendedor"]
)

@vendedor_router.get("/validar-token")
def validar_token_vendedor(request: Request):
  try:
    headers = request.headers
    token = headers["authorization"].split(" ")
    data = decode_token_vendedor(token[1])
    return data
  except:
    raise HTTPException(status_code=401, detail="Autorización errónea.")

@vendedor_router.get("/")
async def get_vendedores(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM vendedor;"))
  result = []
  for row in query_results.mappings():
    contador = {
      "id_vendedor": row["id_vendedor"],
      "nombre_completo": row["nombre_completo"],
      "correo_electronico": row["correo_electronico"],
    }
    result.append(contador)
  return result


@vendedor_router.get("/{id}")
async def get_vendedor_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM vendedor WHERE id_vendedor = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Vendedor no encontrado.")
  vendedor = {
    "id_vendedor": resultado["id_vendedor"],
    "nombre_completo": resultado["nombre_completo"],
    "correo_electronico": resultado["correo_electronico"],
  }
  return vendedor


@vendedor_router.post("/")
async def crear_vendedor(
  vendedor: Vendedor,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
        INSERT INTO vendedor (nombre_completo, correo_electronico, password)
        VALUES (:nombre_completo, :correo_electronico, :password)
        RETURNING nombre_completo, correo_electronico
    """)

  result = await session.execute(query, {
    "nombre_completo": vendedor.nombre_completo,
    "correo_electronico": vendedor.correo_electronico,
    "password": codificar_password(vendedor.password),
  })

  await session.commit()

  resultado = result.mappings().first()

  return resultado


@vendedor_router.put("/{id}")
async def actualizar_vendedor(
  id: int,
  vendedor: Vendedor,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
UPDATE vendedor 
SET nombre_completo = :nombre_completo, correo_electronico = :correo_electronico, password = :password
WHERE id_vendedor = :id_vendedor
    """)

  result = await session.execute(query, {
    "id_vendedor": id,
    "nombre_completo": vendedor.nombre_completo,
    "correo_electronico": vendedor.correo_electronico,
    "password": codificar_password(vendedor.password),
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Vendedor no encontrado.")

  return {"mensaje": "Actualización correcta"}


@vendedor_router.delete("/{id}")
async def borrar_vendedor(id: int, session: AsyncSession = Depends(get_session)):
  query = text("""
        DELETE FROM vendedor 
        WHERE id_vendedor = :id
    """)

  result = await session.execute(query, {
    "id": id,
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Vendedor no encontrado.")

  return {"filas_eliminadas": filas_afectadas}


@vendedor_router.post("/login")
async def login_vendedor(
  correo_electronico: str = Body(), 
  password: str = Body(),
  session: AsyncSession = Depends(get_session)
):
  query_results = await session.execute(text(
    "SELECT * FROM vendedor WHERE correo_electronico = :correo_electronico;"), 
    {"correo_electronico": correo_electronico})
  
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=401, detail="Email o contraseña incorrectos.")
  
  password_codificada = resultado["password"]

  if(comprobar_password(password, password_codificada)):
    token = encode_token_vendedor({
      "id_vendedor": resultado["id_vendedor"],
      "correo_electronico": resultado["correo_electronico"],
      "nombre_completo": resultado["nombre_completo"],
    })
    return {
      "access_token": token
    }
  
  raise HTTPException(status_code=401, detail="Email o contraseña incorrectos.")
