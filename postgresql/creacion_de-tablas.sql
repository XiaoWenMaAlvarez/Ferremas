DROP TABLE IF EXISTS DETALLE_VENTA;
DROP TABLE IF EXISTS VENTA;
DROP TABLE IF EXISTS FOTO_PRODUCTO;
DROP TABLE IF EXISTS PRODUCTO;
DROP TABLE IF EXISTS ADMINISTRADOR;
DROP TABLE IF EXISTS CONTADOR;
DROP TABLE IF EXISTS VENDEDOR;
DROP TABLE IF EXISTS BODEGUERO;
DROP TABLE IF EXISTS CLIENTE;
DROP TABLE IF EXISTS TIENDA;
DROP TABLE IF EXISTS COMUNA;
DROP TABLE IF EXISTS REGION;
DROP TABLE IF EXISTS TIPO_ENTREGA;
DROP TABLE IF EXISTS ESTADO_VENTA;
DROP TABLE IF EXISTS TIPO_PAGO;
DROP TABLE IF EXISTS CATEGORIA;
DROP TABLE IF EXISTS MARCA;


-- Tabla REGION
CREATE TABLE REGION (
    id_region       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descripcion     VARCHAR(80)
);

-- Tabla COMUNA
CREATE TABLE COMUNA (
    id_comuna       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descripcion     VARCHAR(80),
    id_region       INTEGER NOT NULL,
    CONSTRAINT COMUNA_REGION_FK FOREIGN KEY (id_region) REFERENCES REGION(id_region)
);

-- Tabla MARCA
CREATE TABLE MARCA (
    id_marca       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descripcion     VARCHAR(80),
    presentacion     TEXT
);

-- Tabla CATEGORIA
CREATE TABLE CATEGORIA (
    id_categoria       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descripcion     VARCHAR(80)
);

-- Tabla TIENDA
CREATE TABLE TIENDA (
    id_tienda       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre          VARCHAR(80) NOT NULL,
    direccion       VARCHAR(80),
    id_comuna       INTEGER,
    CONSTRAINT TIENDA_COMUNA_FK FOREIGN KEY (id_comuna) REFERENCES COMUNA(id_comuna)
);

-- Tabla CLIENTE
CREATE TABLE CLIENTE (
    id_cliente                  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_completo             VARCHAR(80),
    correo_electronico          VARCHAR(80),
    password                        VARCHAR(150),
    direccion                   VARCHAR(80),
    is_habilitado_para_descuento   BOOLEAN,
    is_confirmado_para_descuento   BOOLEAN,
    tenia_descuento                 BOOLEAN DEFAULT false,
    numero_de_contacto          VARCHAR(20),
    id_comuna                   INTEGER NOT NULL,
    CONSTRAINT CLIENTE_COMUNA_FK FOREIGN KEY (id_comuna) REFERENCES COMUNA(id_comuna)
);

-- Tabla PRODUCTO
CREATE TABLE PRODUCTO (
    id_producto     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo VARCHAR(80) NOT NULL,
    codigo_de_producto VARCHAR(80) NOT NULL,
    fecha_de_lanzamiento DATE NOT NULL,
    nombre          VARCHAR(80),
    precio          INTEGER,
    stock           INTEGER,
    descripcion     TEXT,
    id_categoria         INTEGER NOT NULL,
    id_marca         INTEGER NOT NULL,
    CONSTRAINT PRODUCTO_CATEGORIA_FK FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria),
    CONSTRAINT PRODUCTO_MARCA_FK FOREIGN KEY (id_marca) REFERENCES MARCA(id_marca)
);

-- Tabla FOTO_PRODUCTO
CREATE TABLE FOTO_PRODUCTO (
    id_foto_producto    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    url_foto            VARCHAR(200),
    id_producto         INTEGER NOT NULL,
    CONSTRAINT FOTO_PRODUCTO_PRODUCTO_FK FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
);

-- Tabla ADMINISTRADOR
CREATE TABLE ADMINISTRADOR (
    id_administrador    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_completo     VARCHAR(80),
    correo_electronico  VARCHAR(80),
    password                VARCHAR(150),
    id_tienda           INTEGER NOT NULL,
    is_primer_login   BOOLEAN,
    CONSTRAINT ADMINISTRADOR_TIENDA_FK FOREIGN KEY (id_tienda) REFERENCES TIENDA(id_tienda)
);

-- Tabla CONTADOR
CREATE TABLE CONTADOR (
    id_contador         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_completo     VARCHAR(80),
    correo_electronico  VARCHAR(80),
    password                VARCHAR(150),
    id_tienda           INTEGER NOT NULL,
    CONSTRAINT CONTADOR_TIENDA_FK FOREIGN KEY (id_tienda) REFERENCES TIENDA(id_tienda)
);

-- Tabla VENDEDOR
CREATE TABLE VENDEDOR (
    id_vendedor         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_completo     VARCHAR(80),
    correo_electronico  VARCHAR(80),
    password                VARCHAR(150)
);

-- Tabla BODEGUERO
CREATE TABLE BODEGUERO (
    id_bodeguero        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_completo     VARCHAR(80),
    correo_electronico  VARCHAR(80),
    password                VARCHAR(150)
);

-- Tabla TIPO_ENTREGA
CREATE TABLE TIPO_ENTREGA (
    id_tipo_entrega INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descripcion     VARCHAR(80)
);

-- Tabla ESTADO_VENTA
CREATE TABLE ESTADO_VENTA (
    id_estado_venta INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descripcion     VARCHAR(80)
);

-- Tabla TIPO_PAGO
CREATE TABLE TIPO_PAGO (
    id_tipo_pago    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descripcion     VARCHAR(80)
);

-- Tabla VENTA
CREATE TABLE VENTA (
    id_venta                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fecha                   DATE,
    descuento               INTEGER,
    sucursal_retiro         INTEGER,
    url_foto_transferencia  VARCHAR(200),
    id_pago_online          VARCHAR(200),
    id_cliente              INTEGER NOT NULL,
    id_tienda               INTEGER NOT NULL,
    id_contador             INTEGER, 
    id_vendedor             INTEGER,
    id_bodeguero            INTEGER,
    id_tipo_entrega         INTEGER NOT NULL,
    id_estado_venta         INTEGER NOT NULL,
    id_tipo_pago            INTEGER NOT NULL,
    direccion_envio          VARCHAR(200),
    id_comuna            INTEGER NOT NULL,
    CONSTRAINT VENTA_CLIENTE_FK FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    CONSTRAINT VENTA_TIENDA_FK FOREIGN KEY (id_tienda) REFERENCES TIENDA(id_tienda),
    CONSTRAINT VENTA_CONTADOR_FK FOREIGN KEY (id_contador) REFERENCES CONTADOR(id_contador) ON DELETE SET NULL,
    CONSTRAINT VENTA_VENDEDOR_FK FOREIGN KEY (id_vendedor) REFERENCES VENDEDOR(id_vendedor) ON DELETE SET NULL,
    CONSTRAINT VENTA_BODEGUERO_FK FOREIGN KEY (id_bodeguero) REFERENCES BODEGUERO(id_bodeguero) ON DELETE SET NULL,
    CONSTRAINT VENTA_TIPO_ENTREGA_FK FOREIGN KEY (id_tipo_entrega) REFERENCES TIPO_ENTREGA(id_tipo_entrega),
    CONSTRAINT VENTA_ESTADO_VENTA_FK FOREIGN KEY (id_estado_venta) REFERENCES ESTADO_VENTA(id_estado_venta),
    CONSTRAINT VENTA_TIPO_PAGO_FK FOREIGN KEY (id_tipo_pago) REFERENCES TIPO_PAGO(id_tipo_pago),
    CONSTRAINT VENTA_COMUNA_FK FOREIGN KEY (id_comuna) REFERENCES COMUNA(id_comuna)
);

-- Tabla DETALLE_VENTA
CREATE TABLE DETALLE_VENTA (
    id_detalle_venta    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    precio_venta        INTEGER NOT NULL,
    cantidad            INTEGER NOT NULL,
    id_producto         INTEGER NOT NULL,
    id_venta            INTEGER NOT NULL,
    CONSTRAINT DETALLE_VENTA_PRODUCTO_FK FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto),
    CONSTRAINT DETALLE_VENTA_VENTA_FK FOREIGN KEY (id_venta) REFERENCES VENTA(id_venta)
);
