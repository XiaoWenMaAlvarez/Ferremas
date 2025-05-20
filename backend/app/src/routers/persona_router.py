from src.models.persona import Persona
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session

persona_router = APIRouter(
  prefix="/personas",
  tags=["Personas"]
)


@persona_router.get("/")
async def get_personas(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM persona;"))
  result = []
  for row in query_results.mappings():
    persona = {
      "id": row["id_persona"],
      "nombre": row["nombre"],
      "email": row["email"],
      "password": row["password"]
    }
    result.append(persona)
  return result



@persona_router.get("/{id}")
async def get_persona_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM persona WHERE id_persona = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Persona no encontrada.")
  return resultado


@persona_router.post("/")
async def crear_persona(
  persona: Persona,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
        INSERT INTO persona (nombre, email, password)
        VALUES (:nombre, :email, :password)
        RETURNING id_persona, nombre, email
    """)

  result = await session.execute(query, {
    "nombre": persona.nombre,
    "email": persona.email,
    "password": persona.password
  })

  await session.commit()

  resultado = result.mappings().first()

  return resultado


@persona_router.put("/{id}")
async def actualizar_persona(
  id: int,
  persona: Persona,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
        UPDATE persona 
        SET nombre = :nombre, email = :email, password = :password
        WHERE id_persona = :id
    """)

  result = await session.execute(query, {
    "id": id,
    "nombre": persona.nombre,
    "email": persona.email,
    "password": persona.password,
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Persona no encontrada.")

  return {"filas_afectadas": filas_afectadas}


@persona_router.delete("/{id}")
async def borrar_persona(id: int, session: AsyncSession = Depends(get_session)):
  query = text("""
        DELETE FROM persona 
        WHERE id_persona = :id
    """)

  result = await session.execute(query, {
    "id": id,
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Persona no encontrada.")

  return {"filas_eliminadas": filas_afectadas}


@persona_router.patch("/{id}")
async def partial_update_persona(
  id: int,
  nombre: Optional[str] = None, 
  password: Optional[str] = None, 
  email: Optional[str] = None,
  session: AsyncSession = Depends(get_session)
):
  query_results = await session.execute(text("SELECT * FROM persona WHERE id_persona = :id;"), {"id": id})
  registro_encontrado = query_results.mappings().first()
  if registro_encontrado is None:
    raise HTTPException(status_code=404, detail="Persona no encontrada.")
  
  persona_encontrada = Persona(
    id_persona=registro_encontrado["id_persona"],
    nombre=registro_encontrado["nombre"],
    email=registro_encontrado["email"],
    password=registro_encontrado["password"]
  )

  persona_encontrada = persona_encontrada.copy_with(
    nombre=nombre,
    email=email,
    password=password
  )

  query = text("""
        UPDATE persona 
        SET nombre = :nombre, email = :email, password = :password
        WHERE id_persona = :id
    """)

  await session.execute(query, {
    "id": id,
    "nombre": persona_encontrada.nombre,
    "email": persona_encontrada.email,
    "password": persona_encontrada.password,
  })

  await session.commit()

  return {
    "mensaje": f"Actualización exitosa del usuario {persona_encontrada.nombre}"
  }
