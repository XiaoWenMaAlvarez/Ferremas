import { Link } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'
import { Modal } from "bootstrap";
import PersonalModal from '../../comunes/PersonalModal';

const ProductoInvitado = () => {

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

    const [error, setError] = useState()
    const [data, setData] = useState()

    
    const [cantidad, setCantidad] = useState(1)


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

    if(!data) {
        return (
            <Loader></Loader>
        )
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
                <p><strong>Categoría:</strong> <Link to={`/invitado/productos_por_categoria/${data.id_categoria}`}>{data.categoria}</Link></p>
            </div>

            <div className="product-meta">
                <p><strong>Marca:</strong> <Link to={`/invitado/productos_por_marca/${data.id_marca}`}>{data.marca}</Link></p>
            </div>

            {
            data.stock > 0 ? (
                <Link to="/login-cliente" className="btn btn-warning">Agregar al Carrito</Link>
            ): (<button disabled className="btn-add-to-cart">No hay stock</button>)
            }
            

        </div>
    </main>
  )
}

export default ProductoInvitado