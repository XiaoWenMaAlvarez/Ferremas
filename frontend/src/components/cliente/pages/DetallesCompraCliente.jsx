import './DetalleCompraCliente.css'
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { generarBoletaPDF } from '../../../helpers/boleta'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const DetalleCompraCliente = () => {

    const transformarFecha = (fechaStr) => {
        const [anio, mes, dia] = fechaStr.split("-");
        return `${dia}-${mes}-${anio}`;
    }


    const params = useParams()
    const id_venta = params.id

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
            <Loader></Loader>
        )
    }

    if(error) {
        return (
            <CuerpoError>Error al cargar la información</CuerpoError>
        )
    }

    const obtenerEstadoCSS = (id_estado_venta) => {
        switch (id_estado_venta) {
            case 1:
                return "status-badge status-processing";
            case 2:
                return "status-badge status-pending";
            case 3:
                return "status-badge status-shipped";
            case 4:
                return "status-badge status-completed";
            case 5:
                return "status-badge status-cancelled";
            case 6:
                return "status-badge status-processing";
        }
    }

    const obtenerEstadoJSX = (id_estado_venta) => {
        switch (id_estado_venta) {
            case 1:
                return "Por pagar";
            case 2:
                return "En preparación";
            case 3:
                return "Por entregar";
            case 4:
                return "Entregado";
            case 5:
                return "Rechazado";
            case 6:
                return "Por confirmar";
        }
    }

    const generarBoleta = () => {
        generarBoletaPDF(venta)
    }

  return (
    <>
    <div className="sale-detail-container">
        <header className="sale-detail-header">
            <h1>Detalle de Venta con id: {venta.id_venta}</h1>
            <span className={obtenerEstadoCSS(venta.id_estado_venta)}>{obtenerEstadoJSX(venta.id_estado_venta)}</span>
        </header>

        <section className="sale-info-section">
            <h2>Información General de la Venta</h2>
            <div className="info-grid">
                <div className="info-item">
                    <span className="info-label">Fecha:</span>
                    <span className="info-value">{transformarFecha(venta.fecha)}</span>
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
                    <span className="summary-label">Descuento Aplicado ({venta.descuento.toLocaleString('de-DE')}%):</span>
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

        <div className="acciones-confirmacion">
            {venta.id_estado_venta == 4 ? (
            <button className="btn btn-success btn-descargar-boleta" onClick={generarBoleta}>
                <i class="bi bi-receipt"></i> Descargar Boleta
            </button>
        ) : <></> }
        </div>

    </div></>
  )
}

export default DetalleCompraCliente