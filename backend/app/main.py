from fastapi import FastAPI # type: ignore
from src.routers.persona_router import persona_router
from src.routers.tienda_router import tienda_router
from src.routers.region_router import region_router
from src.routers.comuna_router import comuna_router
from src.routers.administrador_router import administrador_router
from src.routers.contador_router import contador_router
from src.routers.bodeguero_router import bodeguero_router
from src.routers.vendedor_router import vendedor_router
from src.routers.estado_venta_router import estado_venta_router
from src.routers.tipo_entrega_router import tipo_entrega_router
from src.routers.tipo_pago_router import tipo_pago_router
from src.routers.marca_router import marca_router
from src.routers.categoria_router import categoria_router
from src.routers.foto_producto_router import foto_producto_router
from src.routers.producto_router import producto_router
from src.routers.cliente_router import cliente_router
from src.routers.detalle_venta_router import detalle_venta_router
from src.routers.venta_router import venta_router
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
]

api = FastAPI()

api.title = "API para personas con Postgres"
api.version = "0.0.2"
api.description = "Esta API ofrece un CRUD completo sobre la tabla Persona"

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

api.include_router(router=administrador_router)
api.include_router(router=vendedor_router)
api.include_router(router=bodeguero_router)
api.include_router(router=contador_router)
api.include_router(router=cliente_router)

api.include_router(router=categoria_router)
api.include_router(router=marca_router)
api.include_router(router=producto_router)
api.include_router(router=foto_producto_router)

api.include_router(router=venta_router)
api.include_router(router=detalle_venta_router)

api.include_router(router=estado_venta_router)
api.include_router(router=tipo_entrega_router)
api.include_router(router=tipo_pago_router)

api.include_router(router=tienda_router)
api.include_router(router=region_router)
api.include_router(router=comuna_router)

api.include_router(router=persona_router)