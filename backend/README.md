# Documentación de la API Ferremas

**Versión:** {{Versión de la API, ej: 1.0.0}}
**Fecha de última actualización:** {{2025-05-16}}

---

## Introducción

Bienvenido a la documentación de la API de Ferremas.

Asegúrate de leer la sección de [Empezando](#empezando) para configurar tu acceso.

## Empezando

Esta sección te guiará a través de los pasos necesarios para comenzar a usar la API.

### Requisitos Previos

- Requisito 1: Conocimientos básicos de HTTP y APIs REST.

### Autenticación

La API Ferremas utiliza autenticación por token Bearer, OAuth 2.0, Clave API en cabecera.

## Endpoints

A continuación se detallan los endpoints disponibles en la API.

### Recurso: Administrador

Este recurso representa a un administrador de la app/sitio web.

#### `GET /administrador/Validar-token`

Valida token administrador.

**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---
#### `GET /administrador`

Obtiene una lista de los administradores.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_administrador": ,
  "nombre_completo": "",
  "correo_electronico": "",
  "password": "",
  "id_tienda": 1
}
{
  "id_administrador": ,
  "nombre_completo": "",
  "correo_electronico": "",
  "password": "",
  "id_tienda": 1
}
```

---
#### `GET /administrador/{id_administrador}`

Obtiene una lista de los administradores con la ID entregada.

**Respuesta Exitosa (Código "200 OK"):**

```json
"string"
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

---
#### `PUT /administrador/{id_administrador}`

Actualiza un administrador en el sistema.


| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para actualizar un administrador:

```json
{
  "id_administrador": 0,
  "nombre_completo": "string",
  "correo_electronico": "string",
  "password": "string",
  "id_tienda": 1
}
```
---
**Respuesta Exitosa (Código "200 OK"):**

```json
"string"
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `POST /administrador`

Crea un nuevo administrador en el sistema.


| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para crear un nuevo administrador:

```json
{
  "correo_electronico": "string",
  "password": "string"
}
```
---
**Respuesta Exitosa (Código "200 OK"):**

```json
"string"
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---

### Recurso: Vendedor

Este recurso representa a un vendedor de la app/sitio web.

#### `GET /vendedor/validar-token`

Valida token vendedor.

**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---
#### `GET /vendedor`

Obtiene una lista de los vendedores.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_vendedor": ,
  "nombre_completo": "",
  "correo_electronico": "",
  "password": ""
}
{
  "id_vendedor": ,
  "nombre_completo": "",
  "correo_electronico": "",
  "password": ""
}
```
---
#### `POST /vendedor`

Crea un nuevo vendedor en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para crear un nuevo vendedor:

```json
{
  {
  "id_vendedor": 0,
  "nombre_completo": "string",
  "correo_electronico": "string",
  "password": "string"
  }
}
```
---
**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `GET /vendedor/{id_vendedor}`

Obtiene una lista de los vendedores con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_vendedor": ,
  "nombre_completo": "",
  "correo_electronico": "",
  "password": ""
}
```
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---

#### `PUT /vendedor/{id_vendedor}`

Actualiza un vendedor en el sistema.


| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para actualizar un vendedor:

```json
{
  {
  "id_vendedor": 0,
  "nombre_completo": "string",
  "correo_electronico": "string",
  "password": "string"
}
}
```
---
**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `DELETE /vendedor/{id_vendedor}`

Elimina permanentemente un vendedor existente identificado por su `id_vendedor`.
**Advertencia:** Esta operación es irreversible. Una vez eliminado, el vendedor no podrá ser recuperado.

**Parámetros de Ruta (Path Parameters):**

| Parámetro    | Tipo   | Requerido | Descripción                             |
|--------------|--------|-----------|-----------------------------------------|
| `id_vendedor`| Int | Sí        | Identificador único del vendedor a eliminar. |

**Cabeceras (Headers):**

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer.| Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

**Cuerpo de la Solicitud (Request Body):**

No requieren un cuerpo.

**Respuesta Exitosa (Código `200 OK` con cuerpo):**

```markdown
**Respuesta Exitosa (Código `200 OK`):**
*Content-Type: `application/json`*

```json
{
  "mensaje": "El vendedor ha sido eliminado exitosamente."
}
```
### Recurso: Bodeguero

Este recurso representa a un bodeguero de la app/sitio web.

#### `GET /bodeguero/validar-token`

Valida token bodeguero.

**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---
#### `GET /bodeguero`

Obtiene una lista de los bodegueros.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_bodeguero": ,
  "nombre_completo": "",
  "correo_electronico": "",
  "password": ""
}
```
---
#### `POST /bodeguero`

Crea un nuevo bodeguero en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para crear un nuevo xxxx:

```json
{
  {
  "id_bodeguero": 0,
  "nombre_completo": "string",
  "correo_electronico": "string",
  "password": "string"
  }
}
```
---
**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---

**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `GET /bodeguero/{id_bodeguero}`

Obtiene una lista de los bodegueros con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
  {
  "id_bodeguero": ,
  "nombre_completo": "",
  "correo_electronico": "",
  "password": ""
  }
}
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `PUT /bodeguero/{id_bodeguero}`

Actualiza un bodeguero en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para actualizar un bodeguero:

```json
{
  {
  "id_bodeguero": 0,
  "nombre_completo": "string",
  "correo_electronico": "string",
  "password": "string"
  }
}
```
---
**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---

**Error de validacion (codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `DELETE /bodeguero/{id_bodeguero}`

Elimina permanentemente un bodeguero existente identificado por su `id_bodeguero`.
**Advertencia:** Esta operación es irreversible. Una vez eliminado, el bodeguero no podrá ser recuperado.

**Parámetros de Ruta (Path Parameters):**

| Parámetro    | Tipo   | Requerido | Descripción                             |
|--------------|--------|-----------|-----------------------------------------|
| `id_bodeguero`| Int | Sí        | Identificador único del bodeguero a eliminar. |

**Cabeceras (Headers):**

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer.| Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

**Cuerpo de la Solicitud (Request Body):**

No requieren un cuerpo.

**Respuesta Exitosa (Código `200 OK` con cuerpo):**

```markdown
**Respuesta Exitosa (Código `200 OK`):**
*Content-Type: `application/json`*

```json
{
  "mensaje": "El bodeguero ha sido eliminado exitosamente."
}
```
---
### Recurso: Contador

Este recurso representa a un contador de la app/sitio web.

#### `GET /contador/validar-token`

Valida token contador.

**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---
#### `GET /contador`

Obtiene una lista de los contadores.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_contador":  ,
  "nombre_completo": " ",
  "correo_electronico": " ",
  "password": " ",
  "id_tienda":  
}
```
---
#### `POST /contador`

Crea un nuevo contador en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para crear un nuevo contador:
```json
{
  {
  "id_contador": 0,
  "nombre_completo": "string",
  "correo_electronico": "string",
  "password": "string",
  "id_tienda": 1
  }
}
```
**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "mensaje": "El contador ha sido creado exitosamente."
}
```
---

**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `GET /contador/{id_contador}`

Obtiene una lista de los contador con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**
```json
{
  "id_contador": ,
  "nombre_completo": "string",
  "correo_electronico": "string",
  "password": "string",
  "id_tienda": 1
}
```
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `PUT /contador/{id_contador}`

Actualiza un contador en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para actualizar un contador:

```json
{
  {
  "id_contador": 0,
  "nombre_completo": "string",
  "correo_electronico": "string",
  "password": "string",
  "id_tienda": 1
  }
}
```

**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---

**Error de validacion (codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `DELETE /contador/{id_contador}`

Elimina permanentemente un vendedor existente identificado por su `id_contador`.
**Advertencia:** Esta operación es irreversible. Una vez eliminado, el contador no podrá ser recuperado.

**Parámetros de Ruta (Path Parameters):**

| Parámetro    | Tipo   | Requerido | Descripción                             |
|--------------|--------|-----------|-----------------------------------------|
| `id_contador`| Int | Sí        | Identificador único del contador a eliminar. |

**Cabeceras (Headers):**

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer.| Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

**Cuerpo de la Solicitud (Request Body):**

No requieren un cuerpo.

**Respuesta Exitosa (Código `200 OK` con cuerpo):**

```markdown
**Respuesta Exitosa (Código `200 OK`):**
*Content-Type: `application/json`*

```json
{
  "mensaje": "El contador ha sido eliminado exitosamente."
}
```
---
### Recurso: Cliente

Este recurso representa a un cliente de la app/sitio web.

#### `GET /cliente/Validar-token`

Valida token cliente.

**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---
#### `GET /cliente`

Obtiene una lista de los clientes.

**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---
#### `POST /cliente`

Crea un nuevo cliente en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para crear un nuevo cliente:

```json
{
  {
  "id_cliente": 0,
  "nombre_completo": "string",
  "correo_electronico": "string",
  "password": "string",
  "direccion": "string",
  "is_habilitado_para_descuento": false,
  "is_confirmado_para_descuento": false,
  "numero_de_contacto": "string",
  "id_comuna": 1
  }
}
```
**Respuesta Exitosa (Código `200 OK`):**

```json
    "mensaje": "El cliente ha sido creado exitosamente."
```
---

**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `GET /cliente/{id_cliente}`

Obtiene una lista de los cliente con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
    {
    "id_cliente": 0,
    "nombre_completo": "string",
    "correo_electronico": "string",
    "password": "string",
    "direccion": "string",
    "is_habilitado_para_descuento": false,
    "is_confirmado_para_descuento": false,
    "numero_de_contacto": "string",
    "id_comuna": 1
    }
    {
    "id_cliente": 0,
    "nombre_completo": "string",
    "correo_electronico": "string",
    "password": "string",
    "direccion": "string",
    "is_habilitado_para_descuento": false,
    "is_confirmado_para_descuento": false,
    "numero_de_contacto": "string",
    "id_comuna": 1
    }
}
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `PUT /cliente/{id_cliente}`

Actualiza un cliente en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para actualizar un cliente:

```json
{
  {
  "id_cliente": 0,
  "nombre_completo": "string",
  "correo_electronico": "string",
  "password": "string",
  "direccion": "string",
  "is_habilitado_para_descuento": false,
  "is_confirmado_para_descuento": false,
  "numero_de_contacto": "string",
  "id_comuna": 1
  }
}
```
---
**Respuesta Exitosa (Código `200 OK`):**

```json
"mensaje": "El cliente ha sido actualizado exitosamente."
```
---

**Error de validacion (codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `DELETE /cliente/{id_cliente}`

Elimina permanentemente un cliente existente identificado por su `id_cliente`.
**Advertencia:** Esta operación es irreversible. Una vez eliminado, el cliente no podrá ser recuperado.

**Parámetros de Ruta (Path Parameters):**

| Parámetro    | Tipo   | Requerido | Descripción                             |
|--------------|--------|-----------|-----------------------------------------|
| `id_cliente`| Int | Sí        | Identificador único del cliente a eliminar. |

**Cabeceras (Headers):**

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer.| Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

**Cuerpo de la Solicitud (Request Body):**

No requieren un cuerpo.

**Respuesta Exitosa (Código `200 OK` con cuerpo):**

```markdown
**Respuesta Exitosa (Código `200 OK`):**
*Content-Type: `application/json`*

```json
{
  "mensaje": "El cliente ha sido eliminado exitosamente."
}
```
---
#### `PATCH /cliente/{id_cliente}`

Actualiza parcialmente un cliente en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

**Cuerpo de la Solicitud (Request Body):** `application/json`

Envía un objeto JSON conteniendo únicamente los campos del vendedor que deseas actualizar.

---
**Respuesta Exitosa (Código `200 OK`):**

```json
"mensaje": "El cliente ha sido actualizado exitosamente."
```
---

**Error de validacion (codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `GET /cliente/confirmar_descuento/{id_cliente}`

Confirma el descuento del cliente con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**

```json
 "mensaje": "descuento confirmado."
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `PATCH /cliente/guardar_descuento_anterior/{id_cliente}`

Actualiza parcialmente un cliente en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

---
**Respuesta Exitosa (Código `200 OK`):**

```json
"mensaje": "El cliente ha sido actualizado exitosamente."
```
---

**Error de validacion (codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `PATCH /cliente/eliminar_descuento_anterior/{id_cliente}`

Actualiza parcialmente un cliente en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

---
**Respuesta Exitosa (Código `200 OK`):**

```json
"mensaje": "El cliente ha sido actualizado exitosamente."
```
---

**Error de validacion (codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `PATCH /cliente/devolver_descuento_si_tenia/{id_cliente}`

Actualiza parcialmente un cliente en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


---
**Respuesta Exitosa (Código `200 OK`):**

```json
"mensaje": "El cliente ha sido actualizado exitosamente."
```
---
### Recurso: Categoria

Este recurso representa las categorias de pagos.

#### `GET /categoria`

Obtiene una lista de los tipos de pago.

**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---
#### `GET /categoria/{id_categoria}`

Obtiene una lista de las categorias con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**

```json
"string"
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### Recurso: Marca 

Este recurso representa una marca de productos disponible en Ferremas.

### `GET /marca`

Obtiene una lista de todas las marcas disponibles.
---
**Respuesta Exitosa (Código 200 OK):**
```json
[
  {
    "id_marca": 1,
    "descripcion": "Descripción marca"
  },
  {
    "id_marca": 2,
    "descripcion": "Descripción marca"
  }
]
```
---
**Error de validacion (codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---

#### `GET /marca/{id_marca}`

Obtiene una lista de los marca con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_marca": 1,
    "descripcion": "Descripción marca"
  }
]
```
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### Recurso: Producto 

Este recurso representa un producto disponible en Ferremas.

#### `GET /producto`

Obtiene una lista de los productos.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_producto": 1,
    "descripcion": "Martillo de carpintero con cabeza de acero y mango de madera."
  },
  {
    "id_producto": 2,
    "nombre": "Destornillador Phillips",
  }
]
```
---
#### `GET /producto/{id_producto}`

Obtiene una lista de los producto con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_producto": 1,
    "descripcion": "Martillo de carpintero con cabeza de acero y mango de madera."
  }
]
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `GET /producto/por_categoria/{id_categoria}`

Obtiene una lista de los producto con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_producto": 1,
    "descripcion": "Martillo de carpintero con cabeza de acero y mango de madera.",
  },
  {
    "id_producto": 2,
    "descripcion": "Sierra circular eléctrica, potente motor de 1500W.",
  }
]
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
### PATCH /producto/restar_stock/{id}

Actualiza parcialmente el stock de un producto específico, usualmente para restar una cantidad. Este endpoint es útil para reflejar ventas o ajustes de inventario.

**Parámetros de Ruta (Path Parameters):**

| Parámetro    | Tipo   | Requerido | Descripción                             |
|--------------|--------|-----------|-----------------------------------------|
| `id_producto`| Int | Sí        | Identificador único del Producto a actualizar. |

**Cabeceras (Headers):**

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer| Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

```json
{
  "cantidad_a_restar": 5
}
```
```json

*Respuesta Exitosa (Código 200 OK):*
{
  "id_producto": 101,
  "nombre": "Martillo de Carpintero",
  "stock_anterior": 75,
  "cantidad_restada": 5,
  "stock_nuevo": 70,
  "mensaje": "Stock actualizado exitosamente."
}
```
---
*Respuesta de Error (Código 404 Not Found):*
```json
{
  "error": "Solicitud inválida",
  "mensaje": "La cantidad a restar debe ser un número positivo."
}
```
---
#### `GET /producto/por_marca/{id_producto}`

Obtiene una lista de productos que pertenecen a una marca específica, identificada por su ID.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_producto": 1,
    "descripcion": "Martillo de carpintero con cabeza de acero y mango de madera.",
  },
  {
    "id_producto": 2,
    "descripcion": "Sierra circular eléctrica, potente motor de 1500W.",
  }
]
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### Recurso: Foto de productos

Este recurso maneja las imágenes asociadas a los productos. Permite obtener una lista de todas las fotos de productos, una foto específica por su ID, o todas las fotos asociadas a un producto en particular.

#### `GET /foto_producto`

Obtiene una lista de todas las fotos de productos disponibles en el sistema.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_foto_producto": 1,
    "id_producto": 101,
    "url_imagen": "[https://ferremas.cl/imagenes/productos/martillo_carpintero_101_principal.jpg](https://ferremas.cl/imagenes/productos/martillo_carpintero_101_principal.jpg)",
    "descripcion_alt": "Martillo de carpintero vista frontal",
    "es_principal": true,
    "orden": 1
  },
  {
    "id_foto_producto": 2,
    "id_producto": 101,
    "url_imagen": "[https://ferremas.cl/imagenes/productos/martillo_carpintero_101_detalle.jpg](https://ferremas.cl/imagenes/productos/martillo_carpintero_101_detalle.jpg)",
    "descripcion_alt": "Detalle cabeza martillo de carpintero",
    "es_principal": false,
    "orden": 2
  },
  {
    "id_foto_producto": 3,
    "id_producto": 102,
    "url_imagen": "[https://ferremas.cl/imagenes/productos/destornillador_phillips_102.jpg](https://ferremas.cl/imagenes/productos/destornillador_phillips_102.jpg)",
    "descripcion_alt": "Destornillador Phillips mediano",
    "es_principal": true,
    "orden": 1
  }
]
```
---
#### `GET /foto_producto/{id}`

Obtiene los detalles de una foto de producto específica utilizando su identificador único.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_foto_producto": 1,
  "id_producto": 101,
  "nombre_producto": "Martillo de Carpintero",
  "url_imagen": "[https://ferremas.cl/imagenes/productos/martillo_carpintero_101_principal.jpg](https://ferremas.cl/imagenes/productos/martillo_carpintero_101_principal.jpg)",
  "descripcion_alt": "Martillo de carpintero vista frontal",
  "es_principal": true,
  "orden": 1,
  "fecha_subida": "2024-01-15T11:00:00Z",
  "tipo_mime": "image/jpeg",
  "tamano_kb": 128
}
```
---
**Error de validacion (Codigo `422`)**
```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `GET /foto_producto/por_id_producto/{id}`

Obtiene una lista de todas las fotos asociadas a un producto específico, identificado por el id del producto.

**Respuesta Exitosa (Código `200 OK`):**
(Si el producto existe pero no tiene fotos asociadas, se podría devolver una lista vacía.)
```json
[
  {
    "id_foto_producto": 1,
    "url_imagen": "[https://ferremas.cl/imagenes/productos/martillo_carpintero_101_principal.jpg](https://ferremas.cl/imagenes/productos/martillo_carpintero_101_principal.jpg)",
    "descripcion_alt": "Martillo de carpintero vista frontal",
    "es_principal": true,
    "orden": 1
  },
  {
    "id_foto_producto": 2,
    "url_imagen": "[https://ferremas.cl/imagenes/productos/martillo_carpintero_101_detalle.jpg](https://ferremas.cl/imagenes/productos/martillo_carpintero_101_detalle.jpg)",
    "descripcion_alt": "Detalle cabeza martillo de carpintero",
    "es_principal": false,
    "orden": 2
  }
]
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
### Recurso: Ventas

Este recurso gestiona todas las operaciones relacionadas con las ventas en Ferremas. Permite crear nuevas ventas.

#### `GET /ventas`

Obtiene una lista de los ventas.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_venta": 1001,
    "fecha_venta": "2025-05-17T10:30:00Z",
    "id_cliente": 205,
    "nombre_cliente": "Ana Martínez",
    "id_vendedor": 12,
    "nombre_vendedor": "Carlos Soto",
    "id_tienda": 2,
    "nombre_tienda": "Costanera Center",
    "id_estado_venta": 3,
    "descripcion_estado_venta": "Completada",
    "total_venta": 114990,
    "metodo_pago": "Tarjeta de Crédito",
    "numero_documento": "BOL-001-001001" // Boleta o Factura
  },
  {
    "id_venta": 1002,
    "fecha_venta": "2025-05-18T11:45:00Z",
    "id_cliente": 310,
    "nombre_cliente": "Luis González",
    "id_vendedor": 15,
    "nombre_vendedor": "Laura Peña",
    "id_tienda": 1,
    "nombre_tienda": "Plaza Oeste",
    "id_estado_venta": 2,
    "descripcion_estado_venta": "Pendiente de Pago",
    "total_venta": 24950,
    "metodo_pago": "Transferencia",
    "numero_documento": null
  }
]
```
---
#### `POST /ventas`

Crea una nueva venta en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para crear una nueva venta:

```json
{
  "id_venta": 0,
  "id_cliente": 1,
  "id_tienda": 1,
  "id_tipo_entrega": 1,
  "id_estado_venta": 1,
  "id_tipo_pago": 1,
  "fecha": "2025-05-18",
  "descuento": 0,
  "sucursal_retiro": 0,
  "url_foto_transferencia": "string",
  "id_pago_online": "string",
  "id_contador": 0,
  "id_vendedor": 0,
  "id_bodeguero": 0,
  "id_comuna": 0,
  "direccion_envio": "string"
}
```
---
**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_cliente": 401, // Puede ser nulo para ventas a cliente genérico/anónimo
  "id_vendedor": 12,
  "id_tienda": 2,
  "id_estado_venta": 1, // Ej: 1 = "En Proceso" o "Abierta"
  "metodo_pago_propuesto": "Efectivo", // Método que el cliente planea usar
  "observaciones": "Cliente consulta por instalación."
}
```
---

**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `GET /venta/{id_venta}`

Obtiene una lista de los venta con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_venta": 1001,
  "fecha_venta": "2025-05-17T10:30:00Z",
  "id_cliente": 205,
  "nombre_cliente": "Ana Martínez",
  "rut_cliente": "12345678-9",
  "id_vendedor": 12,
  "nombre_vendedor": "Carlos Soto",
  "id_tienda": 2,
  "nombre_tienda": "Costanera Center",
  "id_estado_venta": 3,
  "descripcion_estado_venta": "Completada",
  "subtotal_neto": 96630,
  "iva": 18360,
  "total_venta": 114990,
  "metodo_pago": "Tarjeta de Crédito",
  "numero_transaccion_pago": "TRX-567890",
  "numero_documento": "BOL-001-001001",
  "tipo_documento": "Boleta Electrónica", // Boleta, Factura
  "observaciones": "Cliente frecuente.",
  "detalles_venta": [
    {
      "id_detalle_venta": 1,
      "id_producto": 101,
      "nombre_producto": "Martillo de Carpintero",
      "cantidad": 2,
      "precio_unitario_venta": 12500,
      "subtotal_item": 25000,
      "descuento_aplicado_item": 0
    },
    {
      "id_detalle_venta": 2,
      "id_producto": 205,
      "nombre_producto": "Sierra Circular 7 1/4\"",
      "cantidad": 1,
      "precio_unitario_venta": 89990,
      "subtotal_item": 89990,
      "descuento_aplicado_item": 0 // El descuento total podría estar en la cabecera o por item
    }
  ]
}
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `DELETE /venta/{id_venta}`

Elimina permanentemente un vendedor existente identificado por su `id_venta`.
**Advertencia:** Esta operación es irreversible. Una vez eliminado, la ventar no podrá ser recuperada.

**Parámetros de Ruta (Path Parameters):**

| Parámetro    | Tipo   | Requerido | Descripción                             |
|--------------|--------|-----------|-----------------------------------------|
| `id_venta`| Int | Sí        | Identificador único de la venta a eliminar. |

**Cabeceras (Headers):**

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer.| Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

**Cuerpo de la Solicitud (Request Body):**

No requieren un cuerpo.

**Respuesta Exitosa (Código `200 OK` con cuerpo):**

```markdown
**Respuesta Exitosa (Código `200 OK`):**
*Content-Type: `application/json`*

```json
{
  "mensaje": "La venta ha sido eliminada exitosamente."
}
```
---
### PATCH /venta/{id}

Actualiza parcialmente la información de una venta existente. Esto podría usarse para cambiar el estado de la venta.

**Parámetros de Ruta (Path Parameters):**

| Parámetro    | Tipo   | Requerido | Descripción                             |
|--------------|--------|-----------|-----------------------------------------|
| `id_venta`| Int | Sí        | Identificador único de la venta a actualizar. |

**Cabeceras (Headers):**

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer| Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

*Respuesta Exitosa (Código 200 OK):*
```json
{
  "id_venta": 1002,
  "fecha_venta": "2025-05-18T11:45:00Z",
  "id_cliente": 310,
  "id_vendedor": 15,
  "id_tienda": 1,
  "id_estado_venta": 3,
  "descripcion_estado_venta": "Completada", // Actualizado
  "total_venta": 24950,
  "metodo_pago": "Tarjeta de Débito", // Actualizado
  "numero_transaccion_pago": "TRX-DEB-12345", // Actualizado
  "numero_documento": "BOL-001-001002", // Actualizado
  "tipo_documento": "Boleta Electrónica", // Actualizado
  "observaciones": "Cliente solicitó despacho urgente.", // Actualizado
  "mensaje": "Venta actualizada exitosamente."
}
```
---
**Error de validacion (Codigo `422`)**
```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `GET /venta/por_estado_venta/{id_venta}`

Obtiene una lista de ventas que se encuentran en un estado específico (ej. "Pendiente", "Pagada", "Enviada", "Cancelada").

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_venta": 1002,
    "fecha_venta": "2025-05-18T11:45:00Z",
    "id_cliente": 310,
    "nombre_cliente": "Luis González",
    "id_vendedor": 15,
    "nombre_vendedor": "Laura Peña",
    "id_tienda": 1,
    "nombre_tienda": "Plaza Oeste",
    "id_estado_venta": 2, // Corresponde al {id} de la ruta
    "descripcion_estado_venta": "Pendiente de Pago",
    "total_venta": 24950
  }
]
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
### `GET /venta/por_cliente/{id_venta}`

Obtiene una lista de todas las ventas asociadas a un cliente específico.

**Respuesta Exitosa (`Código 200 OK`):**
```json
[
  {
    "id_venta": 1001,
    "fecha_venta": "2025-05-17T10:30:00Z",
    "id_cliente": 205, // Corresponde al {id} de la ruta
    "id_vendedor": 12,
    "id_tienda": 2,
    "id_estado_venta": 3,
    "descripcion_estado_venta": "Completada",
    "total_venta": 114990,
    "numero_documento": "BOL-001-001001"
  }
]
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
### `GET /venta/por_tienda/{id_venta}/{month}/{year}`

Obtiene una lista de ventas realizadas en una tienda específica durante un mes y año determinados.

**Respuesta Exitosa (`Código 200 OK`):**
```json
[
  {
    "id_venta": 1001,
    "fecha_venta": "2025-05-17T10:30:00Z", // Fecha dentro de May/2025
    "id_cliente": 205,
    "nombre_cliente": "Ana Martínez",
    "id_vendedor": 12,
    "id_tienda": 2, // Corresponde al {id} de la ruta
    "id_estado_venta": 3,
    "descripcion_estado_venta": "Completada",
    "total_venta": 114990
  }
]
```
---
**Error de validacion (Codigo `422`)**
```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
### Recurso: Detalles de venta

Este recurso representa los ítems individuales que componen una venta. Cada detalle de venta está asociado a una venta general y a un producto específico, e incluye información como la cantidad, el precio unitario al momento de la venta y el subtotal.

#### `GET /detalle_venta`

Obtiene una lista de todos los detalles de venta registrados en el sistema.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_detalle_venta": 1,
    "id_venta": 1001,
    "id_producto": 101,
    "nombre_producto": "Martillo de Carpintero",
    "cantidad": 2,
    "precio_unitario_venta": 12500,
    "subtotal": 25000,
    "descuento_aplicado": 0
  },
  {
    "id_detalle_venta": 2,
    "id_venta": 1001,
    "id_producto": 205,
    "nombre_producto": "Sierra Circular 7 1/4\"",
    "cantidad": 1,
    "precio_unitario_venta": 89990,
    "subtotal": 89990,
    "descuento_aplicado": 5000
  }
]
```
---
#### `POST /detalle_venta`

Crea un nuevo detalle de venta (un ítem) y lo asocia a una venta existente.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para crear un nuevo detalle de venta:

```json
{
  {
  "id_detalle_venta": 0,
  "precio_venta": 0,
  "cantidad": 1,
  "id_producto": 1,
  "id_venta": 1
  }
}
```
---
**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_detalle_venta": 4,
  "id_venta": 1003,
  "id_producto": 315,
  "nombre_producto": "Tornillos Autorroscantes 1 pulgada (Caja 100u)",
  "cantidad": 3,
  "precio_unitario_venta": 750,
  "subtotal": 2250, 
  "descuento_aplicado": 100,
  "mensaje": "Detalle de venta creado exitosamente."
}
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
#### `GET /detalle_venta/{id}`

Obtiene los detalles de un ítem de venta específico utilizando su identificador único (id del detalle_venta).

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_detalle_venta": 1,
    "id_venta": 1001,
    "id_producto": 101,
    "nombre_producto": "Martillo de Carpintero",
    "cantidad": 2,
    "precio_unitario_venta": 12500,
    "subtotal": 25000,
    "descuento_aplicado": 0
  }
]
```
---
**Error de validacion (Codigo `422`)**
```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---

#### `PUT /detalle_venta/{id}`

Actualiza la información de un detalle de venta existente. Esto podría usarse para cambiar la cantidad de un producto.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para actualizar un xxxx:

```json
{
  "id_detalle_venta": 0,
  "precio_venta": 0,
  "cantidad": 1,
  "id_producto": 1,
  "id_venta": 1
}
```
---
**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_detalle_venta": 1,
  "id_venta": 1001,
  "id_producto": 101,
  "nombre_producto": "Martillo de Carpintero",
  "cantidad": 3,
  "precio_unitario_venta": 12000,
  "subtotal": 35500, // (3 * 12000) - 500
  "descuento_aplicado": 500,
  "notas": "Cliente cambió de opinión, ahora quiere 3 unidades.",
  "mensaje": "Detalle de venta actualizado exitosamente."
}
```
---

**Error de validacion (codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
### DELETE /detalle_venta/{id}

Elimina un detalle de venta (un ítem) de una venta. Esto es útil si un cliente decide no llevar un producto antes de finalizar la compra.

**Parámetros de Ruta (Path Parameters):**

| Parámetro    | Tipo   | Requerido | Descripción                             |
|--------------|--------|-----------|-----------------------------------------|
| `id_detalle_venta`| Int | Sí        | Identificador único del detalle_venta a eliminar. |

**Cabeceras (Headers):**

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer| Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |

*Respuesta Exitosa (Código 200 OK):*
```json
{
  "mensaje": "El detalle de venta con ID 1 ha sido eliminado exitosamente."
}
```
---

**Error de validacion (codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
### GET /detalle_venta/por_venta/{id}

Obtiene una lista de todos los detalles de venta (ítems) asociados a una venta específica, identificada por el id de la venta.

*Respuesta Exitosa (Código 200 OK):*
Si la venta existe pero no tiene detalles (ítems) asociados, se podría devolver una lista vacía.
```json
[
  {
    "id_detalle_venta": 1,
    "id_producto": 101,
    "nombre_producto": "Martillo de Carpintero",
    "cantidad": 2,
    "precio_unitario_venta": 12500,
    "subtotal": 25000,
    "descuento_aplicado": 0
  },
  {
    "id_detalle_venta": 2,
    "id_producto": 205,
    "nombre_producto": "Sierra Circular 7 1/4\"",
    "cantidad": 1,
    "precio_unitario_venta": 89990,
    "subtotal": 89990,
    "descuento_aplicado": 5000
  }
]
```
---
**Error de validacion (codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
### Recurso: Estado de venta

Este recurso representa los diferentes estados por los que puede pasar una venta dentro del sistema Ferremas.

#### `GET /estado_venta`

Obtiene una lista de todos los posibles estados de venta definidos en el sistema.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_estado_venta": 1,
    "codigo_estado": "PROCE",
    "descripcion": "En Proceso",
    "permite_modificacion_venta": true,
    "es_estado_final": false
  },
  {
    "id_estado_venta": 2,
    "codigo_estado": "PENDP",
    "descripcion": "Pendiente de Pago",
    "permite_modificacion_venta": true,
    "es_estado_final": false
  },
  {
    "id_estado_venta": 3,
    "codigo_estado": "PAGAD",
    "descripcion": "Pagada",
    "permite_modificacion_venta": false,
    "es_estado_final": false
  },
  {
    "id_estado_venta": 4,
    "codigo_estado": "ENVIA",
    "descripcion": "Enviada",
    "permite_modificacion_venta": false,
    "es_estado_final": false
  },
  {
    "id_estado_venta": 5,
    "codigo_estado": "COMPL",
    "descripcion": "Completada",
    "permite_modificacion_venta": false,
    "es_estado_final": true
  },
  {
    "id_estado_venta": 6,
    "codigo_estado": "CANCE",
    "descripcion": "Cancelada por Cliente",
    "permite_modificacion_venta": false,
    "es_estado_final": true
  },
  {
    "id_estado_venta": 7,
    "codigo_estado": "ANULA",
    "descripcion": "Anulada por Sistema/Admin",
    "permite_modificacion_venta": false,
    "es_estado_final": true
  }
]
```
---
#### `GET /estado_venta/{id}`

Obtiene los detalles de un estado de venta específico utilizando su ID.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
    "id_estado_venta": 1,
    "codigo_estado": "PROCE",
    "descripcion": "En Proceso",
    "permite_modificacion_venta": true,
    "es_estado_final": false
}
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
### Recurso: Tipo de entrega

Este recurso representa las diferentes modalidades de entrega que Ferremas ofrece a sus clientes para sus compras.

#### `GET /tipo_entrega`

Obtiene una lista de todos los tipos de entrega disponibles en el sistema.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_tipo_entrega": 1,
    "codigo_entrega": "RETTIEN",
    "nombre_tipo": "Retiro en Tienda",
    "descripcion": "El cliente retira su pedido directamente en la tienda seleccionada.",
  },
  {
    "id_tipo_entrega": 2,
    "codigo_entrega": "DESPDOM",
    "nombre_tipo": "Despacho a Domicilio Estándar",
    "descripcion": "El pedido se envía a la dirección proporcionada por el cliente.",
  },
  {
    "id_tipo_entrega": 3,
    "codigo_entrega": "DESPEXP",
    "nombre_tipo": "Despacho a Domicilio Express",
    "descripcion": "Entrega rápida del pedido a la dirección del cliente (costo adicional).",
  },
  {
    "id_tipo_entrega": 4,
    "codigo_entrega": "ENVSUCCOUR",
    "nombre_tipo": "Envío a Sucursal de Courier",
    "descripcion": "El pedido se envía a una sucursal de un transportista externo para ser retirado por el cliente.",
  }
]
```
---
#### `GET /tipo_entrega/{id}`

Obtiene los detalles de un tipo de entrega específico utilizando su ID.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_tipo_entrega": 2,
  "codigo_entrega": "DESPDOM",
  "nombre_tipo": "Despacho a Domicilio Estándar",
}
```
---
**Error de validacion (Codigo `422`)**
```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
### Recurso: Tipo de pago

Este recurso representa los diferentes métodos de pago que los clientes pueden utilizar para abonar sus compras en Ferremas.

#### `GET /tipo_pago`

Obtiene una lista de todos los tipos de pago aceptados por el sistema.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_tipo_pago": 1,
    "codigo_pago": "EFECT",
    "nombre_tipo": "Efectivo",
    "descripcion": "Pago realizado en dinero físico al momento de la entrega o en tienda.",
  },
  {
    "id_tipo_pago": 2,
    "codigo_pago": "TCRED",
    "nombre_tipo": "Tarjeta de Crédito",
    "descripcion": "Pago realizado mediante tarjeta de crédito (Visa, Mastercard, Amex, etc.).",
  },
  {
    "id_tipo_pago": 3,
    "codigo_pago": "TDEB",
    "nombre_tipo": "Tarjeta de Débito",
  },
  {
    "id_tipo_pago": 4,
    "codigo_pago": "TRANS",
    "nombre_tipo": "Transferencia Bancaria",
  },
  {
    "id_tipo_pago": 5,
    "codigo_pago": "PAYPL",
    "nombre_tipo": "PayPal",
  }
]
```
---
#### `GET /tipo_pago/{id}`

Obtiene los detalles de un tipo de pago específico utilizando su ID.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
  "id_tipo_pago": 2,
  "codigo_pago": "TCRED",
  "nombre_tipo": "Tarjeta de Crédito",
  "descripcion_detallada": "Permite el pago utilizando las principales tarjetas de crédito del mercado. La transacción se procesa a través de una pasarela de pago segura.",
}
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---

### Recurso: Tienda

Este recurso representa una de las tiendas de Ferremas en pais de Chile.

#### `GET /tienda`

Obtiene una lista de las tiendas.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_tienda": 2,
    "nombre": "Costanera Center",
    "direccion": "Avenida Andres Bello 2447, local 196"
    "comuna": "providencia",
    "region": "Metropolitana de Santiago"
  },
]
```
---
#### `GET /tienda/{id_tienda}`

Obtiene una lista de las tiendas con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_tienda": 2,
    "nombre": "Costanera Center",
    "direccion": "Avenida Andres Bello 2447, local 196"
    "comuna": "providencia",
    "region": "Metropolitana de Santiago"
  },
]
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---

### Recurso: Region

Este recurso representa una region del pais de Chile.

#### `GET /region`

Obtiene una lista de las regiones.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_region": 1,
    "descripcion": "Arica y Parinacota"
  },
  {
    "id_region": 2,
    "descripcion": "Tarapaca"
  }
]
```

#### `GET /region/{id_region}`

Obtiene una lista de las regiones con la ID entregada

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_region": 1,
    "descripcion": "Arica y Parinacota"
  },
]
```
**Error de validacion (Codigo `422`)**
```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---
### Recurso: Comuna

Este recurso representa una comuna del pais de Chile.

#### `GET /comuna`

Obtiene una lista de las comunas.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_comuna": 327,
    "descripcion": "Puente Alto"
  },
  {
    "id_comuna": 328,
    "descripcion": "Pirque"
  }
]

```
---
#### `GET /comuna/{id_comuna}`

Obtiene una lista de los comunas con la ID entregada.

**Respuesta Exitosa (Código `200 OK`):**

```json
{
    "id_comuna": 327,
    "descripcion": "Puente Alto"
},
```
---
**Error de validacion (Codigo `422`)**

```json
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```
---


### Recurso: Tienda

Este recurso representa una de las tiendas de Ferremas en pais de Chile.

#### `GET /tienda`

Obtiene una lista de las tiendas.

**Respuesta Exitosa (Código `200 OK`):**

```json
[
  {
    "id_tienda": 2,
    "nombre": "Costanera Center",
    "direccion": "Avenida Andres Bello 2447, local 196"
    "comuna": "providencia",
    "region": "Metropolitana de Santiago"
  },
]

```

---

#### `POST /vendedor`

Crea un nuevo vendedor en el sistema.


| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para crear un nuevo vendedor:

```json
{
  "id_vendedor": 1,
  "nombre_completo": "Jaime Contreras",
  "correo_electronico": "jaime@contreras.com",
  "password": "123456"
}
```
---
#### `PUT /vendedor/{id_vendedor}`

Actualiza un vendedor en el sistema.

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer | Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

A continuación se muestra un ejemplo del cuerpo de la solicitud para actualizar un vendedor:

```json
{
  "id_vendedor": 1,
  "nombre_completo": "Jaime Contreras",
  "correo_electronico": "jaime@contreras.com",
  "password": "123456"
}
```
---

#### `PATCH /vendedor/{id_vendedor}`

Actualiza parcialmente la información de un vendedor existente identificado por su `id_vendedor`.
Solo necesitas enviar los campos que deseas modificar. Los campos no incluidos en la solicitud permanecerán sin cambios.

**Parámetros de Ruta (Path Parameters):**

| Parámetro    | Tipo   | Requerido | Descripción                             |
|--------------|--------|-----------|-----------------------------------------|
| `id_producto`| Int | Sí        | Identificador único del vendedor a actualizar. |

**Cabeceras (Headers):**

| Cabecera        | Descripción                                       | Requerido | Ejemplo                               |
|-----------------|---------------------------------------------------|-----------|---------------------------------------|
| `Authorization` | Token de autenticación Bearer| Sí        | `Bearer TU_CLAVE_DE_API_AQUI`         |


**Cuerpo de la Solicitud (Request Body):** `application/json`

Envía un objeto JSON conteniendo únicamente los campos del vendedor que deseas actualizar.

**Ejemplo 1: Actualizar solo el precio y el stock**
```json
{
  "nombre_completo": "Jaime Contreras",
  "correo_electronico": "jaime@contreras.com",
  "password": "123456"
}
```

---
