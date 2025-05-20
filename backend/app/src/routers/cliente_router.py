from typing import Optional
from src.models.cliente import Cliente, ClienteUpdate
from src.helpers.funciones import *
from fastapi import APIRouter, Depends, HTTPException, Body, Request # type: ignore
from sqlalchemy import text # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession # type: ignore
from db.config import get_session
from src.helpers.authorization import encode_token_cliente, decode_token_cliente

cliente_router = APIRouter(
  prefix="/cliente",
  tags=["Cliente"]
)

@cliente_router.get("/validar-token")
def validar_token_cliente(request: Request):
  try:
    headers = request.headers
    token = headers["authorization"].split(" ")
    data = decode_token_cliente(token[1])
    return data
  except:
    raise HTTPException(status_code=401, detail="Autorización errónea.")

@cliente_router.get("/")
async def get_clientes(session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(
    text("SELECT * FROM cliente")
  )
  result = []
  for row in query_results.mappings():
    cliente = {
      "id_cliente": row["id_cliente"],
      "nombre_completo": row["nombre_completo"],
      "correo_electronico": row["correo_electronico"],
      "direccion": row["direccion"],
      "is_habilitado_para_descuento": row["is_habilitado_para_descuento"],
      "is_confirmado_para_descuento": row["is_confirmado_para_descuento"],
      "numero_de_contacto": row["numero_de_contacto"],
      "id_comuna": row["id_comuna"],
    }
    result.append(cliente)
  return result


@cliente_router.get("/{id}")
async def get_cliente_por_id(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM cliente WHERE id_cliente = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Cliente no encontrado.")
  cliente = {
    "id_cliente": resultado["id_cliente"],
    "nombre_completo": resultado["nombre_completo"],
    "correo_electronico": resultado["correo_electronico"],
    "direccion": resultado["direccion"],
    "is_habilitado_para_descuento": resultado["is_habilitado_para_descuento"],
    "is_confirmado_para_descuento": resultado["is_confirmado_para_descuento"],
    "numero_de_contacto": resultado["numero_de_contacto"],
    "id_comuna": resultado["id_comuna"],
  }
  return cliente


@cliente_router.post("/")
async def crear_cliente(
  cliente: Cliente,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
        INSERT INTO cliente (nombre_completo, correo_electronico, password, direccion, is_habilitado_para_descuento,
          is_confirmado_para_descuento, numero_de_contacto, id_comuna)
        VALUES (:nombre_completo, :correo_electronico, :password, :direccion, :is_habilitado_para_descuento,
          :is_confirmado_para_descuento, :numero_de_contacto, :id_comuna)
        RETURNING nombre_completo, correo_electronico
    """)

  result = await session.execute(query, {
    "nombre_completo": cliente.nombre_completo,
    "correo_electronico": cliente.correo_electronico,
    "password": codificar_password(cliente.password),
    "direccion": cliente.direccion,
    "is_habilitado_para_descuento": cliente.is_habilitado_para_descuento,
    "is_confirmado_para_descuento": cliente.is_confirmado_para_descuento,
    "numero_de_contacto": cliente.numero_de_contacto,
    "id_comuna": cliente.id_comuna,
  })

  await session.commit()

  resultado = result.mappings().first()

  return resultado


@cliente_router.put("/{id}")
async def actualizar_cliente(
  id: int,
  cliente: Cliente,
  session: AsyncSession = Depends(get_session)
):
  query = text("""
UPDATE cliente 
SET nombre_completo = :nombre_completo, correo_electronico = :correo_electronico, password = :password, direccion = :direccion, 
  is_habilitado_para_descuento = :is_habilitado_para_descuento, is_confirmado_para_descuento = :is_confirmado_para_descuento,
  numero_de_contacto = :numero_de_contacto, id_comuna = :id_comuna
WHERE id_cliente = :id_cliente
  """)

  result = await session.execute(query, {
    "id_cliente": id,
    "nombre_completo": cliente.nombre_completo,
    "correo_electronico": cliente.correo_electronico,
    "password": codificar_password(cliente.password),
    "direccion": cliente.direccion,
    "is_habilitado_para_descuento": cliente.is_habilitado_para_descuento,
    "is_confirmado_para_descuento": cliente.is_confirmado_para_descuento,
    "numero_de_contacto": cliente.numero_de_contacto,
    "id_comuna": cliente.id_comuna,
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Cliente no encontrado.")

  return {"mensaje": "Actualización correcta"}


@cliente_router.delete("/{id}")
async def borrar_cliente(id: int, session: AsyncSession = Depends(get_session)):
  query = text("""
        DELETE FROM cliente 
        WHERE id_cliente = :id
    """)

  result = await session.execute(query, {
    "id": id,
  })

  await session.commit()

  filas_afectadas = result.rowcount
  if filas_afectadas == 0:
    raise HTTPException(status_code=404, detail="Cliente no encontrado.")

  return {"filas_eliminadas": filas_afectadas}


@cliente_router.patch("/{id}")
async def partial_update_cliente(
  id: int,
  data: ClienteUpdate,
  session: AsyncSession = Depends(get_session)
):
  query_results = await session.execute(text("SELECT * FROM cliente WHERE id_cliente = :id;"), {"id": id})
  registro_encontrado = query_results.mappings().first()
  if registro_encontrado is None:
    raise HTTPException(status_code=404, detail="Cliente no encontrada.")
  
  cliente_encontrado = Cliente(
    id_cliente=registro_encontrado["id_cliente"],
    nombre_completo=registro_encontrado["nombre_completo"],
    correo_electronico=registro_encontrado["correo_electronico"],
    password=registro_encontrado["password"],
    direccion=registro_encontrado["direccion"],
    is_habilitado_para_descuento=registro_encontrado["is_habilitado_para_descuento"],
    is_confirmado_para_descuento=registro_encontrado["is_confirmado_para_descuento"],
    numero_de_contacto=registro_encontrado["numero_de_contacto"],
    id_comuna=registro_encontrado["id_comuna"],
  )

  cliente_encontrado = cliente_encontrado.copy_with(
    nombre_completo=data.nombre_completo if data.nombre_completo is not None else cliente_encontrado.nombre_completo,
    correo_electronico=data.correo_electronico if data.correo_electronico is not None else cliente_encontrado.correo_electronico,
    password= codificar_password(data.password) if data.password is not None else cliente_encontrado.password,
    direccion=data.direccion if data.direccion is not None else cliente_encontrado.direccion,
    is_habilitado_para_descuento=data.is_habilitado_para_descuento if data.is_habilitado_para_descuento is not None else cliente_encontrado.is_habilitado_para_descuento,
    is_confirmado_para_descuento=data.is_confirmado_para_descuento if data.is_confirmado_para_descuento is not None else cliente_encontrado.is_confirmado_para_descuento,
    numero_de_contacto=data.numero_de_contacto if data.numero_de_contacto is not None else cliente_encontrado.numero_de_contacto,
    id_comuna=data.id_comuna if data.id_comuna is not None else cliente_encontrado.id_comuna,
  )

  query = text("""
UPDATE cliente 
SET nombre_completo = :nombre_completo, correo_electronico = :correo_electronico, password = :password, direccion = :direccion, 
  is_habilitado_para_descuento = :is_habilitado_para_descuento, is_confirmado_para_descuento = :is_confirmado_para_descuento,
  numero_de_contacto = :numero_de_contacto, id_comuna = :id_comuna
WHERE id_cliente = :id_cliente
  """)

  await session.execute(query, {
    "id_cliente": id,
    "nombre_completo": cliente_encontrado.nombre_completo,
    "correo_electronico": cliente_encontrado.correo_electronico,
    "password": cliente_encontrado.password,
    "direccion": cliente_encontrado.direccion,
    "is_habilitado_para_descuento": cliente_encontrado.is_habilitado_para_descuento,
    "is_confirmado_para_descuento": cliente_encontrado.is_confirmado_para_descuento,
    "numero_de_contacto": cliente_encontrado.numero_de_contacto,
    "id_comuna": cliente_encontrado.id_comuna,
  })

  await session.commit()

  return {
    "mensaje": f"Actualización exitosa del usuario {cliente_encontrado.nombre_completo}"
  }


@cliente_router.post("/login")
async def login_cliente(
  correo_electronico: str = Body(), 
  password: str = Body(),
  session: AsyncSession = Depends(get_session)
):
  query_results = await session.execute(text(
    "SELECT * FROM cliente WHERE correo_electronico = :correo_electronico;"), 
    {"correo_electronico": correo_electronico})
  
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=401, detail="Email o contraseña incorrectos.")
  
  password_codificada = resultado["password"]

  if(comprobar_password(password, password_codificada)):
    token = encode_token_cliente({
      "id_cliente": resultado["id_cliente"],
      "correo_electronico": resultado["correo_electronico"],
      "nombre_completo": resultado["nombre_completo"],
    })
    return {
      "access_token": token
    }
  
  raise HTTPException(status_code=401, detail="Email o contraseña incorrectos.")


import smtplib
from email.mime.text import MIMEText
from pydantic import BaseModel, EmailStr

EMAIL_USER = "ferremas36@gmail.com"
EMAIL_PASSWORD = "qurx dzxc ztun dwhj"

class EmailRequest(BaseModel):
    destinatario: EmailStr
    nombre_usuario: str
    enlace_descuento: str


@cliente_router.get("/confirmar_descuento/{id}")
async def confirmar_descuento(id: int, session: AsyncSession = Depends(get_session)):
  query_results = await session.execute(text("SELECT * FROM cliente WHERE id_cliente = :id;"), {"id": id})
  resultado = query_results.mappings().first()
  if resultado is None:
    raise HTTPException(status_code=404, detail="Cliente no encontrado.")
  cliente = {
    "nombre_completo": resultado["nombre_completo"],
    "correo_electronico": resultado["correo_electronico"],
    "is_habilitado_para_descuento": resultado["is_habilitado_para_descuento"],
    "is_confirmado_para_descuento": resultado["is_confirmado_para_descuento"],
  }

  if(cliente["is_habilitado_para_descuento"] == False or cliente["is_confirmado_para_descuento"] == True):
    raise HTTPException(status_code=404, detail="El cliente no está habilitado para activar descuento.")
  
  try:
        # Contenido del correo
        subject = "¡Tienes un descuento disponible!"
        body = f"""
Hola {cliente['nombre_completo']},

¡Tenemos una sorpresa para ti! Has recibido un descuento exclusivo.

Para activarlo, solo haz clic en el siguiente enlace:

{"http://localhost:5173/cliente/descuento_confirmado"}

¡Que lo disfrutes!
"""

        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = EMAIL_USER
        msg["To"] = cliente["correo_electronico"]

        # Enviar usando SMTP de Gmail
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_USER, EMAIL_PASSWORD)
            smtp.send_message(msg)

        return {"mensaje": "Correo enviado correctamente"}

  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Error al enviar correo: {str(e)}")


@cliente_router.patch("/guardar_descuento_anterior/{id}")
async def guardar_descuento_anterior(
  id: int,
  session: AsyncSession = Depends(get_session)
):
  query_results = await session.execute(text("SELECT * FROM cliente WHERE id_cliente = :id;"), {"id": id})
  registro_encontrado = query_results.mappings().first()
  if registro_encontrado is None:
    raise HTTPException(status_code=404, detail="Cliente no encontrado.")
  
  await session.execute(text("UPDATE cliente SET tenia_descuento = TRUE WHERE id_cliente = :id;"), {"id": id})

  await session.commit()

  return {
    "mensaje": f"Actualización exitosa del usuario con id {id}"
  }


@cliente_router.patch("/eliminar_descuento_anterior/{id}")
async def eliminar_descuento_anterior(
  id: int,
  session: AsyncSession = Depends(get_session)
):
  query_results = await session.execute(text("SELECT * FROM cliente WHERE id_cliente = :id;"), {"id": id})
  registro_encontrado = query_results.mappings().first()
  if registro_encontrado is None:
    raise HTTPException(status_code=404, detail="Cliente no encontrado.")
  
  await session.execute(text("UPDATE cliente SET tenia_descuento = FALSE WHERE id_cliente = :id;"), {"id": id})

  await session.commit()

  return {
    "mensaje": f"Actualización exitosa del usuario con id {id}"
  }

@cliente_router.patch("/devolver_descuento_si_tenia/{id}")
async def devolver_descuento_anterior_si_tenia(
  id: int,
  session: AsyncSession = Depends(get_session)
):
  query_results = await session.execute(text("SELECT * FROM cliente WHERE id_cliente = :id;"), {"id": id})
  registro_encontrado = query_results.mappings().first()
  if registro_encontrado is None:
    raise HTTPException(status_code=404, detail="Cliente no encontrado.")
  
  if registro_encontrado["tenia_descuento"] == False:
    return {
      "mensaje": f"Actualización exitosa del usuario con id {id}"
    }
  
  await session.execute(text("UPDATE cliente SET tenia_descuento = FALSE, is_confirmado_para_descuento = TRUE WHERE id_cliente = :id;"), {"id": id})

  await session.commit()

  return {
    "mensaje": f"Actualización exitosa del usuario con id {id}"
  }
