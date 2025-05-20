import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef } from "react";
import { Modal } from "bootstrap";
import PersonalModal from '../../comunes/PersonalModal.jsx';
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const DetallePedidoPorEntregar = () => {

    const modalRef = useRef(null);
        
        const [tituloModal, setTituloModal] = useState("")
    
        const mostrarModal = (titulo) => {
        setTituloModal(titulo);
            setTimeout(() => {
                const modal = new Modal(modalRef.current);
                modal.show();
                navigation("/vendedor/pedidos_por_entregar")
            }, 1);
           
        };

    function formatearFecha(fecha) {
  const [año, mes, dia] = fecha.split("-");
  return `${dia}-${mes}-${año}`;
}

  const params = useParams()
    const id_venta = params.id
    const navigation = useNavigate()

    const [venta, setVenta] = useState()
    const [loading, setLoading] = useState(false)    
    const [error, setError] = useState()

    const [constoEnvio, setConstoEnvio] = useState(0)
    const [tipoEntrega, setTipoEntrega] = useState()
    const [sucursal, setSucursal] = useState()
    const [tipoPago, setTipoPago] = useState()


    useEffect(() => {
        if(id_venta) {
            setLoading(true)
            axios.get(`${USER_API_URL}/venta/${id_venta}`)
            .then((response) => {
                setVenta(response.data)
                if(response.data.id_tipo_entrega === 1) {
                    setConstoEnvio(2500)
                }
                if(response.data.id_tipo_pago === 1) {
                    setTipoPago("Tarjeta de Crédito o Débito")
                }else{
                    setTipoPago("Tranferencia")
                }
                if(response.data.id_tipo_entrega === 1) {
                    setTipoEntrega("Envío a domicilio")
                    setSucursal(response.data.direccion_envio)
                } else {
                    axios.get(`${USER_API_URL}/tienda/${response.data.sucursal_retiro}`)
                    .then((tienda) => {
                        setTipoEntrega(`Retiro en tienda `)
                        setSucursal(tienda.data.nombre)
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
                <Loader></Loader>
                <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
            </>
        )
    }

    if(error) {
        return (
            <>
                <CuerpoError>Error al cargar la información</CuerpoError>
                <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
            </>
        )
    }

    const finalizarVenta = async () => {
        setLoading(true)
        const data = {
            "id_estado_venta": 4,
        }
        axios.patch(`${USER_API_URL}/venta/${venta.id_venta}`, data)
        .then(() => {
            mostrarModal("Venta completada")
        })
        .catch(() => {
            mostrarModal("Error al completar la venta")
        }).finally(() => {
            setLoading(false)
        })
    }

  return (
    <>
    <div className="sale-detail-container">
        <header className="sale-detail-header">
            <h1>Detalle de Venta con id: {venta.id_venta}</h1>
            <span className="status-badge status-completed">A espera de {tipoEntrega == "Envío a domicilio" ? "Despacho" : "Retiro"}</span>
        </header>

        <section className="sale-info-section">
            <h2>Información General de la Venta</h2>
            <div className="info-grid">
                <div className="info-item">
                    <span className="info-label">Fecha:</span>
                    <span className="info-value">{formatearFecha(venta.fecha)}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Tipo de Pago:</span>
                    <span className="info-value">{tipoPago}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Método de Entrega:</span>
                    <span className="info-value">{tipoEntrega}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">{tipoEntrega == "Envío a domicilio" ? "Dirección de Envío" : "Sucursal Asociada"}:</span>
                    <span className="info-value">{sucursal}</span>
                </div>
                 </div>
        </section>

        <section className="products-section">
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

        <section className="actions-section">
            <h2>Acciones de Venta</h2>
            <div className="action-buttons">
                <button className="btn btn-success btn-approve" onClick={finalizarVenta}>Confirmar {tipoEntrega == "Envío a domicilio" ? "despacho" : "retiro"}</button>
            </div>
            <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
        </section>
    </div></>
  )
}

export default DetallePedidoPorEntregar