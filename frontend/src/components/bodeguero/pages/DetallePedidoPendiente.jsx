import './DetallePedido.css'
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { obtenerIdUsuario } from '../../../helpers/auth.js'
import { useRef } from "react";
import { Modal } from "bootstrap";
import PersonalModal from '../../comunes/PersonalModal.jsx';
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const DetallePedidoPendiente = () => {

    const modalRef = useRef(null);
    
    const [tituloModal, setTituloModal] = useState("")

    useEffect(() => {
        if(tituloModal != ""){
            const modal = new Modal(modalRef.current);
            modal.show();
        }
    }, [tituloModal])

    const params = useParams()
    const id_venta = params.id
    const navigation = useNavigate()

    const [venta, setVenta] = useState()
    const [loading, setLoading] = useState(false)    
    const [error, setError] = useState()

    const [tipoEntrega, setTipoEntrega] = useState()


    useEffect(() => {
        if(id_venta) {
            setLoading(true)
            axios.get(`${USER_API_URL}/venta/${id_venta}`)
            .then((response) => {
                setVenta(response.data)
                if(response.data.id_tipo_entrega === 1) {
                    setTipoEntrega("Envío a domicilio")
                } else {
                    axios.get(`${USER_API_URL}/tienda/${response.data.sucursal_retiro}`)
                    .then((tienda) => {
                        setTipoEntrega(`Retiro en la tienda: ${tienda.data.nombre} (${tienda.data.direccion}, ${tienda.data.comuna}, ${tienda.data.region}) `)
                    })
                    .catch(() => {
                        setError("Error al cargar la información de la venta")
                    })
                }
            })
            .catch(() => {
                setError("Error al cargar la información de la venta")
            }).finally(() => {
                setLoading(false)
            })  
        }
        
    }, [id_venta])

    const [productos, setProductos] = useState()

    useEffect(() => {
        if(id_venta) {
            setLoading(true)
            axios.get(`${USER_API_URL}/detalle_venta/por_venta/${id_venta}`)
            .then((response) => {
                setProductos(response.data)
            })
            .catch(() => {
                setError("Error al cargar la información de la venta")
            }).finally(() => {
                setLoading(false)
            })  
        }
        
    }, [id_venta])


    if(loading || !venta || !productos) {
        return (
            <>
            <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
            <Loader></Loader>
            </>
        )
    }

    if(error) {
        return (
            <>
            <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
            <CuerpoError>Error al cargar la información</CuerpoError>
            </>
        )
    }

    const confirmarEnvio = async () => {
        setLoading(true)
        const data = {
            "id_estado_venta": 3,
            "id_bodeguero": await obtenerIdUsuario("bodeguero"),
        }
        axios.patch(`${USER_API_URL}/venta/${venta.id_venta}`, data)
        .then(() => {
            setTituloModal("Envío confirmado")
            navigation("/bodeguero/pedidos_pendientes")
        })
        .catch(() => {
            setTituloModal("Error al reportar el envío")
        }).finally(() => {
            setLoading(false)
        })
    }

  return (
    <>
    <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
    <div className="sale-detail-container">
        <header className="sale-detail-header">
            <h1>Detalle de Pedido con id: {venta.id_venta}</h1>
        </header>
        <h2>{tipoEntrega}</h2>

        <section className="products-section">
            <div className="table-responsive-wrapper">
                <table className="data-table products-in-sale-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Código</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                    productos.map((producto) => (
                        <tr key={producto.id_producto}>
                            <td>{producto.nombre}</td>
                            <td>{producto.codigo}</td>
                            <td>{producto.cantidad}</td>
                            <td>${producto.precio_venta.toLocaleString('de-DE')}</td>
                            <td>${producto.subtotal.toLocaleString('de-DE')}</td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>
        </section>

        <section className="actions-section">
            <h2>Acciones de Venta</h2>
            <div className="action-buttons">
                <button className="btn btn-success btn-approve" onClick={confirmarEnvio}>Confirmar envío</button>
            </div>
        </section>
    </div></>
  )
}

export default DetallePedidoPendiente