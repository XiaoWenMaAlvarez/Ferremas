import bcrypt # type: ignore

def codificar_password(password):
  salt = bcrypt.gensalt()
  hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
  return hashed_password.decode('utf-8')


def comprobar_password(password_entregado, password_codificado):
  if bcrypt.checkpw(password_entregado.encode('utf-8'), password_codificado.encode('utf-8')):
    return True
  return False
