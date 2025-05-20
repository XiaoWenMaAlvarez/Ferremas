import './Carrito.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState } from 'react'
import { getCarrito, actualizarCantidadProductoCarrito, deleteCarrito, eliminarProductoCarrito, verificarDescuento } from '../../../helpers/carrito.js'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'
import { useRef } from "react";
import { Modal } from "bootstrap";
import PersonalModal from '../../comunes/PersonalModal';

const Carrito = () => {

    const modalRef = useRef(null);

    const [tituloModal, setTituloModal] = useState("")

    const mostrarModal = (titulo) => {
        setTituloModal(titulo)
        const modal = new Modal(modalRef.current);
        modal.show();
    };

    const nav = useNavigate()

    const [productos, setProductos] = useState()

    const [error, setError] = useState()

    const [subtotal, setSubtotal] = useState(0)

    const [descuento, setDescuento] = useState(0)

    useEffect(() => {
        verificarDescuento().then(() => {
            getCarrito().then((carrito) => {
                setDescuento(carrito.descuento)
            })
        })
    }, [])

    useEffect(() => {
        if(productos) {
            let subtotal = 0
        for(let producto of productos) {
            subtotal += parseInt(producto.precio) * parseInt(producto.cantidad)
        }
        setSubtotal(subtotal)
        }
    }, [productos])

    useEffect(() => {
        getCarrito().then((carrito) => {
            setProductos(carrito.productos)
            for(let producto of carrito.productos) {
        axios.get(`${USER_API_URL}/producto/${producto.id_producto}`)
        .then(async (response) => {
            let productoRespuesta = response.data
            let imagen = await axios.get(`${USER_API_URL}/foto_producto/por_id_producto/${productoRespuesta.id_producto}`)
            let marca = await axios.get(`${USER_API_URL}/marca/${productoRespuesta.id_marca}`)
            let categoria = await axios.get(`${USER_API_URL}/categoria/${productoRespuesta.id_categoria}`)

            let nvoProducto = {
                ...producto,
                ...productoRespuesta,
                foto_producto: imagen.data[0].url_foto,
                marca: marca.data.descripcion,
                categoria: categoria.data.descripcion
            }

            setProductos(productos => productos.filter(item => item.id_producto !== nvoProducto.id_producto).concat(nvoProducto))
            
        })
        .catch(() => {
            setError("Error al cargar la información del producto")
        })    
        }   
        
        }).catch(() => {
            setError("Error al cargar la información del carrito")
        })
    }, [])

    const cambiarCantidad = async (e) => {
        let id_producto = e.target.id
        let cantidad = e.target.value

        if(cantidad == "") {
            cantidad = 1
        }

        if(cantidad > parseInt(e.target.max)) {
            e.target.value = productos.find((producto) => producto.id_producto == id_producto).cantidad
            mostrarModal("No hay suficiente stock")
            return
        }

        if(cantidad <= 0) {
            e.target.value = productos.find((producto) => producto.id_producto == id_producto).cantidad
            mostrarModal("No puede ingresar una cantidad menor a 1")
            return
        }

        setProductos(productos => productos.map((producto) => {
            if(producto.id_producto == id_producto) {
                return {
                    ...producto,
                    cantidad: cantidad
                }
            } else {
                return producto
            }
        }))

        await actualizarCantidadProductoCarrito({
            id_producto: id_producto,
            cantidad: cantidad
        })

    }

    const eliminarProducto = async (e) => {
        let id_producto = e.target.id
        setProductos(productos => productos.filter((producto) => producto.id_producto != id_producto))
        await eliminarProductoCarrito(id_producto)
    }

    const vaciarCarrito = async () => {
        setProductos([])
        await deleteCarrito()
    }

    const continuarCompra = () => {
        if(productos.length > 0) {
            nav("/cliente/seleccionar_entrega")
        }else {
            mostrarModal("Debe haber al menos un producto en su carrito")
        }
        
    }


    if(error) {
        return (
            <CuerpoError>Carrito no encontrado</CuerpoError>
        )
    }

    if(!productos || descuento == null || descuento == undefined) {
        return (
            <Loader></Loader>
        )
    }

  return (
    <main className="contenedor-carrito">
        <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
        <h1>Carrito de Compras</h1>

        <div className="layout-carrito">
            <section className="productos-en-carrito">
                <h2>Productos</h2>
                { productos.length > 0 ?
                    productos.map((producto) => (
                        <div className="item-carrito" key={producto.id_producto}>
                    <div className="item-imagen">
                        <img src={producto.foto_producto} alt="Nombre del Producto Ejemplo 1"/>
                    </div>
                    <div className="item-detalles">
                        <h3 className="item-nombre">{producto.nombre}</h3>
                        <p className="item-info-adicional">{producto.marca}</p>
                        </div>
                    <div className="item-cantidad">
                        <label htmlFor={producto.id_producto} className="sr-only">Cantidad</label>
                        <input type="number" id={producto.id_producto} defaultValue={producto.cantidad} min="1" max={producto.stock} onChange={cambiarCantidad}/>
                    </div>
                    <div className="item-precio">
                        <p className="precio-unitario">Precio unitario: ${parseInt(producto.precio).toLocaleString('de-DE')}</p>
                        <p className="precio-subtotal-item">Subtotal: ${(parseInt(producto.precio) * parseInt(producto.cantidad)).toLocaleString('de-DE')}</p>
                    </div>
                    <div className="item-acciones">
                        <button type="button" className="btn-eliminar" aria-label="Eliminar producto" id={producto.id_producto} onClick={eliminarProducto}>
                            X
                        </button>
                    </div>
                </div>
                ))
                    : <div class="alert alert-warning empty-alert" role="alert">
                            No hay productos en el carrito
                        </div>
                }

                { productos.length > 0 ? 

                <div className="opciones-carrito-inferior">
                    <Link to="/cliente" className="btn-secundario">Seguir comprando</Link>
                    <button type="button" className="btn-secundario" onClick={vaciarCarrito}>Vaciar carrito</button>
                </div>

                : <></>
                }

            </section>

            <aside className="resumen-compra">
                <h2>Resumen de compra</h2>
                <div className="resumen-linea">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString('de-DE')}</span>
                </div>
                <div className="resumen-linea">
                    <span>Descuento ({descuento}%):</span>
                    <span>${(Math.ceil( descuento / 100 * subtotal)).toLocaleString('de-DE')}</span> </div>
                <div className="resumen-linea total-compra">
                    <span>Total:</span>
                    <span>${(subtotal - Math.ceil( descuento / 100 * subtotal)).toLocaleString('de-DE')}</span>
                </div>

                <button type="button" className="btn-primario btn-continuar-compra" onClick={continuarCompra}>Continuar compra</button>

                

            </aside>
        </div>
    </main>
  )
}

export default Carrito