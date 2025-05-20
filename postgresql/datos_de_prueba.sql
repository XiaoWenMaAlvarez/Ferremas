
-- Relleno de la tabla TIENDA
INSERT INTO TIENDA(nombre) 
VALUES ('Venta online');

INSERT INTO TIENDA(nombre, direccion, id_comuna) 
VALUES ('Mall Costanera Center', 'Avenida Andrés Bello 2447, local 196', 317);

INSERT INTO TIENDA(nombre, direccion, id_comuna) 
VALUES ('Mall Parque Arauco', 'Av. Presidente Kennedy 5413, local 92', 308);

INSERT INTO TIENDA(nombre, direccion, id_comuna) 
VALUES ('Mall Plaza Egaña', 'Av. Larraín 5862, local 24', 307);

INSERT INTO TIENDA(nombre, direccion, id_comuna) 
VALUES ('Mall Marina', '14 Norte 821, local 12', 63);

-- Relleno de la tabla ADMINISTRADOR
-- La contraseña es 123456789
INSERT INTO ADMINISTRADOR(nombre_completo, correo_electronico, password, id_tienda, is_primer_login) 
VALUES (
  'Juan Perez',
  'juan@perez.com',
  '$2b$12$5bsAuUqkRZyKo.yz6av4JO7U8kc9.MiYymDf7j5WcLDH0dlTcbiPy',
  2,
  TRUE
);


-- Relleno de la tabla CONTADOR
-- La contraseña es contador123
INSERT INTO CONTADOR(nombre_completo, correo_electronico, password, id_tienda) 
VALUES (
  'Rodrigo Gonzales',
  'rodrigo@gonzales.com',
  '$2b$12$mjw41kAy7KYWwQnwbH3d1eojDbDm51x4337S/fG82ySayj6miq3YS',
  2
);


-- Relleno de la tabla BODEGUERO
-- La contraseña es bodeguero123
INSERT INTO BODEGUERO(nombre_completo, correo_electronico, password) 
VALUES (
  'Felipe Cortes',
  'felipe@cortes.com',
  '$2b$12$4suAixIMSe4vBUA3FxmaE..rBlTDlFWPvWaR5UR/y6EJ4b0XfDCsa'
);


-- Relleno de la tabla VENDEDOR
-- La contraseña es vendedor123
INSERT INTO VENDEDOR(nombre_completo, correo_electronico, password) 
VALUES (
  'Jaime Contreras',
  'jaime@contreras.com',
  '$2b$12$YUCbgC22j2w.KeE8DjWdTOEJ88OFaBh6vENa48LS.hJNXd313VynC'
);


-- Relleno de la tabla CLIENTE
-- La contraseña es cliente123
INSERT INTO CLIENTE(nombre_completo, correo_electronico, password, direccion, is_habilitado_para_descuento, 
is_confirmado_para_descuento, numero_de_contacto, id_comuna) 
VALUES (
  'Xiao Ma', 'xi.ma@duocuc.cl', '$2b$12$.zAFv.xZ6HSq3LS.yFMfwuYP8Odvgkh2fU/ol4TcobC7xif5MLJ/G',
  'Calle falsa 123', FALSE, FALSE, '+56912345678', 327
);


-- Relleno de la tabla MARCA
INSERT INTO MARCA(descripcion, presentacion) 
VALUES ('Husqvarna', 'Reconocida marca sueca con más de 300 años de historia, especializada en la fabricación de herramientas y maquinaria para silvicultura, jardinería, agricultura y construcción. Es conocida mundialmente por la calidad, innovación y durabilidad de sus productos, que incluyen motosierras, cortadoras de césped, tractores, desbrozadoras, y robots cortacésped.');

INSERT INTO MARCA(descripcion, presentacion) 
VALUES ('Bauker', 'Bauker es una marca chilena especializada en herramientas y maquinaria para construcción, bricolaje (DIY) y jardinería. Se destaca por ofrecer productos de alta resistencia y calidad, diseñados para satisfacer tanto a profesionales como a aficionados.');

INSERT INTO MARCA(descripcion, presentacion) 
VALUES ('Bosch', 'Empresa que desarrolla tecnología y servicios en áreas como electrodomésticos, herramientas eléctricas, movilidad (automotriz), automatización industrial y soluciones energéticas.');

INSERT INTO MARCA(descripcion, presentacion) 
VALUES ('Makita', 'Empresa japonesa especializada en la fabricación de herramientas eléctricas, inalámbricas y a gasolina. Es reconocida por su durabilidad, rendimiento e innovación en equipos para la construcción, carpintería y jardinería.');

INSERT INTO MARCA(descripcion, presentacion) 
VALUES ('Stanley', 'Marca estadounidense reconocida por fabricar herramientas manuales, eléctricas y soluciones de almacenamiento. Destacada por su durabilidad, precisión y presencia tanto en el ámbito profesional como doméstico.');

INSERT INTO MARCA(descripcion, presentacion) 
VALUES ('Topex', 'Marca polaca de herramientas dirigida al usuario doméstico y de bricolaje. Ofrece una amplia gama de herramientas manuales y accesorios con enfoque en funcionalidad y economía. Es reconocida por su presencia internacional y su diseño práctico.');

-- Relleno de la tabla PRODUCTO
INSERT INTO PRODUCTO(codigo, codigo_de_producto, fecha_de_lanzamiento, nombre, precio, stock, descripcion, id_categoria, id_marca) 
VALUES ('Husqvarna-67890', 'FER-12345', '2025-05-02', 'Motosierra Husqvarna 120 Espada 16', 191000, 100, 
'La Motosierra Husqvarna 120 Espada 16" es la herramienta ideal para realizar trabajos de corte en árboles y madera de tamaño mediano. Con su potente motor de 35,4 cc y una espada de 16", podrás realizar cortes precisos y eficientes sin necesidad de depender de una fuente de energía externa. Su diseño robusto y duradero, junto a sus características de seguridad, te brindarán la confianza necesaria para realizar tus proyectos de manera segura y eficiente.',
1, 1);

INSERT INTO PRODUCTO(codigo, codigo_de_producto, fecha_de_lanzamiento, nombre, precio, stock, descripcion, id_categoria, id_marca) 
VALUES ('Bauker-111000', 'FER-67890', '2025-05-19', 'Taladro Inalámbrico Percutor 13 mm 18 V/1 Batería/70 Accesorios', 140990, 100, 
'El Taladro Inalámbrico Percutor 13 mm 18V + 1 batería + 70 accesorios de Bauker Free Power es la herramienta ideal para tus proyectos de bricolaje y construcción. Con su potente motor de 18V y su batería de litio-ion, podrás perforar madera, metal y concreto con facilidad. Además, incluye 70 accesorios para que puedas realizar una variedad de tareas, desde atornillar hasta taladrar. ¡Olvídate de los cables y disfruta de la libertad de trabajar sin restricciones!',
1, 2);

INSERT INTO PRODUCTO(codigo, codigo_de_producto, fecha_de_lanzamiento, nombre, precio, stock, descripcion, id_categoria, id_marca) 
VALUES ('Topex-213042', 'FER-40162', '2025-05-19', 'Topex hormigón rápido 25 kg',  4790, 100, 
'Construye con la máxima resistencia y eficiencia usando Topex Hormigón Rápido! Este producto de 25 kg es la solución ideal para tus proyectos, ya sean radieres, sobrelosas, entradas de autos o pilares. Olvida el acopio de arena y grava, ahorrando tiempo y esfuerzo. Con Topex, obtendrás resultados sólidos y duraderos que resistirán el paso del tiempo y el tráfico diario.',
2, 6);

INSERT INTO PRODUCTO(codigo, codigo_de_producto, fecha_de_lanzamiento, nombre, precio, stock, descripcion, id_categoria, id_marca) 
VALUES ('Bosch-544621', 'FER-92401', '2025-05-19', 'Extintor ABC multipropósito 30x9 cm rojo',  19290, 30, 
'Protege tu hogar y a tu familia de incendios con el extintor multipropósito Firemaster. Con su práctico diseño de 30 cm de largo y 9 cm de ancho, este extintor de 1 kg es perfecto para cualquier espacio. ¡Combate incendios de clase A, B y C con facilidad y tranquilidad!',
3, 3);

INSERT INTO PRODUCTO(codigo, codigo_de_producto, fecha_de_lanzamiento, nombre, precio, stock, descripcion, id_categoria, id_marca) 
VALUES ('Makita-681235', 'FER-67201', '2025-05-19', 'Tornillo Autoperforante Cabeza Hexagonal Metal 3 " 12 mm 100 Unidades',  17990, 100, 
'Dale un giro profesional a tus proyectos con los tornillos autoperforantes Mamut. Estos tornillos hexagonales con golilla de 12 mm de diámetro y 3" de largo, son ideales para fijar materiales duros como el acero o la madera. Su diseño robusto y su alta calidad te asegurarán una fijación firme y duradera, sin necesidad de pre-perforar. Con 100 unidades por paquete, tendrás suficiente para completar tus trabajos. ¡No esperes más y adquiere los tuyos!',
4, 4);

INSERT INTO PRODUCTO(codigo, codigo_de_producto, fecha_de_lanzamiento, nombre, precio, stock, descripcion, id_categoria, id_marca) 
VALUES ('Stanley-822012', 'FER-52912', '2025-05-19', 'Cinta doble contacto resistente a la humedad 1,5mx19mm para azulejos',  4890, 100, 
'La cinta adhesiva de doble cara tesa® para colgar en azulejos y metales es perfecta para colgar espejos y otros objetos finos (de hasta 4 mm de grosor) en superficies sólidas y lisas, incluso en condiciones húmedas como las del baño y la cocina. Iguala las irregularidades menores de la superficie.',
5, 5);

INSERT INTO PRODUCTO(codigo, codigo_de_producto, fecha_de_lanzamiento, nombre, precio, stock, descripcion, id_categoria, id_marca) 
VALUES ('Bauker-853273', 'FER-35924', '2025-05-19', 'Multimetro de pinza', 23990, 50, 
'El Multímetro de Pinza Bauker PM2016AB es la herramienta ideal para electricistas y aficionados al bricolaje. Con su diseño compacto y fácil de usar, podrás medir voltaje, corriente, resistencia y continuidad con precisión. Además, su pinza te permite medir la corriente sin necesidad de cortar el circuito, lo que te facilita el trabajo. ¡No te pierdas la oportunidad de tener este práctico multímetro en tu caja de herramientas!',
6, 2);

INSERT INTO PRODUCTO(codigo, codigo_de_producto, fecha_de_lanzamiento, nombre, precio, stock, descripcion, id_categoria, id_marca) 
VALUES ('Makita-502142', 'FER-77730', '2025-05-19', 'Sierra circular eléctrica 7-1/4" 1800W',  128990, 100, 
'Dale vida a tus proyectos con la Sierra Circular Bauker de 7 1/4", ¡la herramienta ideal para madera y sus derivados! Su potente motor de 1800W y empuñadura auxiliar te brindan la estabilidad necesaria para cortes precisos y eficientes. Con 3 años de garantía, esta sierra circular es una inversión inteligente para tus trabajos en casa o en la construcción. Descubre la facilidad y precisión que te ofrece Bauker.',
1, 4);

INSERT INTO PRODUCTO(codigo, codigo_de_producto, fecha_de_lanzamiento, nombre, precio, stock, descripcion, id_categoria, id_marca) 
VALUES ('Bosch-963503', 'FER-16903', '2025-05-19', 'Medidor láser verde de 50m con conectividad GLM 50-27 CG',  159990, 100, 
'El Medidor láser verde Bosch GLM 50-27 CG es la herramienta perfecta para profesionales que buscan precisión y eficiencia en sus mediciones. Con un alcance de hasta 50 metros, este medidor láser te permitirá realizar tus trabajos con mayor rapidez y exactitud. Su diseño robusto y su láser verde, con una visibilidad cuatro veces mayor, te permitirán trabajar incluso en ambientes con mucha iluminación. ¡No esperes más para optimizar tus proyectos!',
6, 3);

INSERT INTO PRODUCTO(codigo, codigo_de_producto, fecha_de_lanzamiento, nombre, precio, stock, descripcion, id_categoria, id_marca) 
VALUES ('Stanley-439513', 'FER-60142', '2025-05-19', 'Serrucho 20" Mango BI Mat. Uso Pesado Stanley STHT20375',  16390, 100, 
'Este serrucho de alto rendimiento cuenta con una hoja de 20 pulgadas (500 mm) de largo y un grosor de 0,03 pulgadas (0,85 mm), fabricada en acero con alto contenido de carbono para ofrecer una excelente durabilidad y precisión en cada corte. Diseñado con una configuración de 8/9 dientes por pulgada (DPP), permite un corte agresivo y eficiente en todo tipo de maderas. Su mango ergonómico de ABS con recubrimiento de goma proporciona un agarre cómodo y seguro, incluso durante usos prolongados. Además, incorpora marcas guía en ángulos de 90° y 45° para facilitar el trazado rápido y preciso, haciendo de este serrucho una herramienta indispensable para trabajos de carpintería exigentes.',
1, 5);

-- Relleno de la tabla FOTO_PRODUCTO
INSERT INTO FOTO_PRODUCTO(url_foto, id_producto) 
VALUES ('https://media.falabella.com/sodimacCL/418274X_01', 1);

INSERT INTO FOTO_PRODUCTO(url_foto, id_producto) 
VALUES ('https://media.falabella.com/sodimacCL/3661830_01', 2);

INSERT INTO FOTO_PRODUCTO(url_foto, id_producto) 
VALUES ('https://media.falabella.com/sodimacCL/3307387_01', 3);

INSERT INTO FOTO_PRODUCTO(url_foto, id_producto) 
VALUES ('https://media.falabella.com/sodimacCL/644064_01', 4);

INSERT INTO FOTO_PRODUCTO(url_foto, id_producto) 
VALUES ('https://media.falabella.com/sodimacCL/249777_01', 5);

INSERT INTO FOTO_PRODUCTO(url_foto, id_producto) 
VALUES ('https://media.falabella.com/sodimacCL/3904237_01', 6);

INSERT INTO FOTO_PRODUCTO(url_foto, id_producto) 
VALUES ('https://media.falabella.com/sodimacCL/9010513_01', 7);

INSERT INTO FOTO_PRODUCTO(url_foto, id_producto) 
VALUES ('https://media.falabella.com/sodimacCL/5646073_01', 8);

INSERT INTO FOTO_PRODUCTO(url_foto, id_producto) 
VALUES ('https://media.falabella.com/sodimacCL/734595X_01', 9);

INSERT INTO FOTO_PRODUCTO(url_foto, id_producto) 
VALUES ('https://media.falabella.com/falabellaCL/141067636_02', 10);

-- Relleno de la tabla VENTA
INSERT INTO VENTA(fecha, descuento, sucursal_retiro, url_foto_transferencia, id_pago_online, id_cliente, id_tienda, 
id_contador, id_vendedor, id_bodeguero, id_tipo_entrega, id_estado_venta, id_tipo_pago, direccion_envio, id_comuna) 
VALUES ('2025-05-02', 10, 2, 'https://www.bingo.es/imagenes/metodos-pago/pago-transferencia-bancaria.jpg',
'id-pago-123', 1, 2, 1, 1, 1, 2, 4, 2, 'Calle falsa 123', 327);


-- Relleno de la tabla DETALLE_VENTA
INSERT INTO DETALLE_VENTA(precio_venta, cantidad, id_producto, id_venta) 
VALUES (191000, 1, 1, 1);
