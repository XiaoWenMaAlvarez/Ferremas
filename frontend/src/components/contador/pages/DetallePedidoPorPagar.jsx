import './DetallePedidoPorPagar.css'
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

const DetallePedidoPorPagar = () => {

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

    const [constoEnvio, setConstoEnvio] = useState(0)


    useEffect(() => {
        if(id_venta) {
            setLoading(true)
            axios.get(`${USER_API_URL}/venta/${id_venta}`)
            .then((response) => {
                setVenta(response.data)
                if(response.data.id_tipo_entrega === 1) {
                    setConstoEnvio(2500)
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
    const [subtotalVenta, setSubtotalVenta] = useState()

    useEffect(() => {
        if(id_venta) {
            setLoading(true)
            axios.get(`${USER_API_URL}/detalle_venta/por_venta/${id_venta}`)
            .then((response) => {
                setProductos(response.data)
                let totalVenta = 0
                for (let producto of response.data) {
                    totalVenta = totalVenta + producto.subtotal
                }
                setSubtotalVenta(totalVenta)
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
            <Loader>Cargando información</Loader>
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

    const aprobarPago = async () => {
        setLoading(true)
        const data = {
            "id_estado_venta": 6,
            "id_contador": await obtenerIdUsuario("contador"),
        }
        axios.patch(`${USER_API_URL}/venta/${venta.id_venta}`, data)
        .then(async () => {
            const detallesVentaResponse = await axios.get(`${USER_API_URL}/detalle_venta/por_venta/${venta.id_venta}`)
            const detallesVentas = detallesVentaResponse.data
            let cantidadComprada = 0
            for(let detalleVentas of detallesVentas){
                cantidadComprada = cantidadComprada + detalleVentas.cantidad
            }
            if(cantidadComprada > 4) {
                await axios.patch(`${USER_API_URL}/cliente/${venta.id_cliente}`, {is_habilitado_para_descuento:true})
                await axios.get(`${USER_API_URL}/cliente/confirmar_descuento/${venta.id_cliente}`)
            }
            await axios.patch(`${USER_API_URL}/cliente/eliminar_descuento_anterior/${venta.id_cliente}`)
            setTituloModal("Pago aprobado")
            navigation("/contador/pagos_por_confirmar")
        })
        .catch(() => {
            setTituloModal("Error al aprobar el pago")
        }).finally(() => {
            setLoading(false)
        })
    }

    const rechazarPago = async () => {
        setLoading(true)
        const data = {
            "id_estado_venta": 5,
            "id_contador": await obtenerIdUsuario("contador"),
        }
        axios.patch(`${USER_API_URL}/venta/${venta.id_venta}`, data)
        .then(async () => {
            await axios.patch(`${USER_API_URL}/cliente/devolver_descuento_si_tenia/${venta.id_cliente}`)
            setTituloModal("Pago rechazado")
            navigation("/contador/pagos_por_confirmar")
        })
        .catch(() => {
            setTituloModal("Error al rechazar el pago")
        }).finally(() => {
            setLoading(false)
        })
    }

  return (
   <>

    <div className="sale-detail-container">
        <header className="sale-detail-header">
            <h1>Detalle de Venta con id: {venta.id_venta}</h1>
            <span className="status-badge status-pending">Pendiente de Aprobación</span>
        </header>

        <section className="products-section">
            <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
            <h2>Productos en la Venta</h2>
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

        <section className="summary-section">
            <h2>Resumen de la Venta</h2>
            <div className="summary-grid">
                <div className="summary-item">
                    <span className="summary-label">Subtotal Productos:</span>
                    <span className="summary-value">${subtotalVenta.toLocaleString('de-DE')}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Descuento Aplicado ({venta.descuento}%):</span>
                    <span className="summary-value discount-value">-${(Math.ceil(venta.descuento / 100 * subtotalVenta)).toLocaleString('de-DE')}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Costo de Envío:</span>
                    <span className="summary-value">${constoEnvio.toLocaleString('de-DE')}</span> </div>
                <hr className="summary-divider"/>
                <div className="summary-item total-general">
                    <span className="summary-label">TOTAL GENERAL:</span>
                    <span className="summary-value">${(subtotalVenta + constoEnvio - Math.ceil(venta.descuento / 100 * subtotalVenta)).toLocaleString('de-DE')}</span>
                </div>
            </div>
        </section>

        <section className="summary-section">
            <h2>Foto de la transacción</h2>
            <img src={venta.url_foto_transferencia} alt="Foto de transferencia" className='payment-photo'/>
        </section>

        <section className="actions-section">
            <h2>Acciones de Venta</h2>
            <div className="action-buttons">
                <button className="btn btn-success btn-approve" onClick={aprobarPago}>Aprobar Pago</button>
                <button className="btn btn-danger btn-reject" onClick={rechazarPago}>Rechazar Pago</button>
            </div>
        </section>
    </div></> 
  )
}

export default DetallePedidoPorPagar