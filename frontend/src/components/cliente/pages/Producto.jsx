import './Producto.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { isProductoAgregadoAlCarrito, agregarProductoCarrito } from '../../../helpers/carrito.js'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'
import { Modal } from "bootstrap";
import PersonalModal from '../../comunes/PersonalModal';

const Producto = () => {

    const quantityRef = useRef()

    const transformarFecha = (fechaStr) => {
        const [anio, mes, dia] = fechaStr.split("-");
        return `${dia}-${mes}-${anio}`;
    }

    const modalRef = useRef(null);

    const [tituloModal, setTituloModal] = useState("")

    const mostrarModal = (titulo) => {
        setTituloModal(titulo)
        const modal = new Modal(modalRef.current);
        modal.show();
    };

    const params = useParams()
    const id_producto = params.id

    const [isProductoAgregado, setProductoAgregado] = useState()

    const [error, setError] = useState()
    const [data, setData] = useState()

    
    const [cantidad, setCantidad] = useState(1)

    useEffect(() => {
        isProductoAgregadoAlCarrito(id_producto).then((res) => {
            setProductoAgregado(res)
        })      
    })

    useEffect(() => {
        if(data && quantityRef.current){
            if(data.stock == 0) return;
            if(cantidad <= 0) {
                mostrarModal("No puede ordenar una cantidad igual o menor a 0")
                quantityRef.current.value = 1
                return
            }
            if(cantidad > data.stock) {
                mostrarModal(`No puede ordenar una cantidad mayor al stock (${data.stock})`)
                quantityRef.current.value = data.stock
            }
        }

    }, [data, cantidad])

    useEffect(() => {
        if(id_producto) {
            axios.get(`${USER_API_URL}/producto/${id_producto}`)
            .then(async (response) => {
                let producto = response.data
                let imagen = await axios.get(`${USER_API_URL}/foto_producto/por_id_producto/${producto.id_producto}`)
                let marca = await axios.get(`${USER_API_URL}/marca/${producto.id_marca}`)
                let categoria = await axios.get(`${USER_API_URL}/categoria/${producto.id_categoria}`)
                setData({
                    ...producto,
                    foto_producto: imagen.data[0].url_foto,
                    marca: marca.data.descripcion,
                    categoria: categoria.data.descripcion
                })
            })
            .catch(() => {
                setError("Error al cargar la información del producto")
            })
        }
        
    }, [id_producto])

    if(error) {
        return (
            <CuerpoError>Producto no encontrado</CuerpoError>
        )
    }

    if(!data || isProductoAgregado === null || isProductoAgregado === undefined) {
        return (
            <Loader></Loader>
        )
    }

    const agregarProducto = () => {
        let productoConCantidad = {
            id_producto: data.id_producto,
            cantidad: parseInt(quantityRef.current.value)
        }

        agregarProductoCarrito(productoConCantidad)
        setProductoAgregado(true)
    }

  return (
    <main className="product-detail-container">
        <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
        <div className="product-image-section">
            <img src={data.foto_producto} alt="Nombre del Producto" id="mainProductImage"/>
            </div>

        <div className="product-info-section">
            <h1>{data.nombre}</h1>
            <p className="product-sku">{data.codigo}</p>

            <p className="product-sku">Fecha de lanzamiento: {transformarFecha(data.fecha_de_lanzamiento)}</p>

            <p className="product-sku">Stock disponible: {data.stock}</p>

            <div className="product-price">
                <span>${data.precio.toLocaleString('de-DE')}</span>
                </div>

            <div className="product-short-description">
                <p>{data.descripcion}</p>
            </div>

            <div className="product-quantity">
                <label htmlFor="quantity">Cantidad:</label>
                <input type="number" id="quantity" name="quantity" defaultValue="1" min="1" max={data.stock} onChange={(e) => setCantidad(e.target.value)} ref={quantityRef}/>
            </div>

            <div className="product-meta">
                <p><strong>Categoría:</strong> <Link to={`/cliente/productos_por_categoria/${data.id_categoria}`}>{data.categoria}</Link></p>
            </div>

            <div className="product-meta">
                <p><strong>Marca:</strong> <Link to={`/cliente/productos_por_marca/${data.id_marca}`}>{data.marca}</Link></p>
            </div>

            {
            isProductoAgregado ? (
                <button disabled className="btn-add-to-cart">Producto ya agregado al carrito</button>
            ) : data.stock > 0 ? (
                <button type="submit" className="btn-add-to-cart" onClick={agregarProducto}>Agregar al Carrito</button>
            ): (<button disabled className="btn-add-to-cart">No hay stock</button>)
            }
            

        </div>
    </main>
  )
}

export default Producto