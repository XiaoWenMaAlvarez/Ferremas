from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer 
from jose import jwt

oauth2_scheme_administrador = OAuth2PasswordBearer(tokenUrl="administrador/login")

def encode_token_administrador(payload: dict) -> str:
  payload["tipo"] = "administrador"
  token = jwt.encode(payload, "clave-secreta", algorithm="HS256")
  return token

def decode_token_administrador(token: str = Depends(oauth2_scheme_administrador)) -> dict:
  data = jwt.decode(token, "clave-secreta", algorithms=["HS256"])
  if data["tipo"] != "administrador":
    raise HTTPException(status_code=401, detail="Autorización errónea.")
  return data


oauth2_scheme_vendedor = OAuth2PasswordBearer(tokenUrl="vendedor/login")

def encode_token_vendedor(payload: dict) -> str:
  payload["tipo"] = "vendedor"
  token = jwt.encode(payload, "clave-secreta", algorithm="HS256")
  return token

def decode_token_vendedor(token: str = Depends(oauth2_scheme_vendedor)) -> dict:
  data = jwt.decode(token, "clave-secreta", algorithms=["HS256"])
  if data["tipo"] != "vendedor":
    raise HTTPException(status_code=401, detail="Autorización errónea.")
  return data


oauth2_scheme_bodeguero = OAuth2PasswordBearer(tokenUrl="bodeguero/login")

def encode_token_bodeguero(payload: dict) -> str:
  payload["tipo"] = "bodeguero"
  token = jwt.encode(payload, "clave-secreta", algorithm="HS256")
  return token

def decode_token_bodeguero(token: str = Depends(oauth2_scheme_bodeguero)) -> dict:
  data = jwt.decode(token, "clave-secreta", algorithms=["HS256"])
  if data["tipo"] != "bodeguero":
    raise HTTPException(status_code=401, detail="Autorización errónea.")
  return data


oauth2_scheme_contador = OAuth2PasswordBearer(tokenUrl="contador/login")

def encode_token_contador(payload: dict) -> str:
  payload["tipo"] = "contador"
  token = jwt.encode(payload, "clave-secreta", algorithm="HS256")
  return token

def decode_token_contador(token: str = Depends(oauth2_scheme_contador)) -> dict:
  data = jwt.decode(token, "clave-secreta", algorithms=["HS256"])
  if data["tipo"] != "contador":
    raise HTTPException(status_code=401, detail="Autorización errónea.")
  return data


oauth2_scheme_cliente = OAuth2PasswordBearer(tokenUrl="cliente/login")

def encode_token_cliente(payload: dict) -> str:
  payload["tipo"] = "cliente"
  token = jwt.encode(payload, "clave-secreta", algorithm="HS256")
  return token

def decode_token_cliente(token: str = Depends(oauth2_scheme_cliente)) -> dict:
  data = jwt.decode(token, "clave-secreta", algorithms=["HS256"])
  if data["tipo"] != "cliente":
    raise HTTPException(status_code=401, detail="Autorización errónea.")
  return data
