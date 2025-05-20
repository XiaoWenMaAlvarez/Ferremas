import './CompraExitosa.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { generarBoletaPDF } from '../../../helpers/boleta';
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const CompraExitosa = () => {

    const transformarFecha = (fechaStr) => {
        const [anio, mes, dia] = fechaStr.split("-");
        return `${dia}-${mes}-${anio}`;
    }

    const params = useParams()
    const id_venta = params.id

    const [venta, setVenta] = useState()
    const [detallesVentas, setDetallesVentas] = useState()
    const [error, setError] = useState()


    useEffect(() => {
        axios.get(`${USER_API_URL}/venta/${id_venta}`)
        .then((response) => {
            setVenta(response.data)
        })
        .catch((error) => {
            setError(error)
        })
    }, [id_venta])

    useEffect(() => {
        axios.get(`${USER_API_URL}/detalle_venta/por_venta/${id_venta}`)
        .then(async (response) => {
            setDetallesVentas(response.data)
            for(let detalleVenta of response.data){
                await axios.patch(`${USER_API_URL}/producto/restar_stock/${detalleVenta.id_producto}?cantidad_a_restar=${detalleVenta.cantidad}`)
            }
        })
        .catch((error) => {
            setError(error)
        })
    }, [id_venta])

    const totalPagado = () => {
        if(!venta || !detallesVentas){
            return 0
        }

        let total = 0

        for(let detalleVenta of detallesVentas){
            total += detalleVenta.subtotal
        }

        const descuento = venta.descuento / 100 * total
        total = total - descuento
        total = Math.round(total * 100) / 100

        if(venta.id_tipo_entrega == 1){
            total += 2500
        }

        return total

    }

    const generarBoleta = () => {
        generarBoletaPDF(venta)
    }


    if(error){
        return (
            <CuerpoError>Error al cargar las tiendas o la información de la venta</CuerpoError>
        )
    }

    if(!venta || !detallesVentas){
        return(
            <Loader></Loader>
        )
    }

  return (
    <main className="contenedor-principal-confirmacion">
        <div className="panel-confirmacion">
            <div className="icono-confirmacion">
                <i class="bi bi-check-circle"></i>
            </div>
            <h1>¡Listo! {venta.id_estado_venta == 1 ? "Tu pago está a la espera de aprobación" : "Tu pago está completo"}</h1>
            <p className="mensaje-agradecimiento">Gracias por tu compra en Ferremas.</p>

            <div className="detalles-pedido-confirmacion">
                <p><strong>Número de Pedido:</strong> <span id="numero-pedido">{venta.id_venta}</span></p>
                <p><strong>Fecha del Pedido:</strong> <span id="fecha-pedido">{transformarFecha(venta.fecha)}</span></p>
                <p><strong>Total Pagado:</strong> <span id="total-pagado-confirmacion">${totalPagado().toLocaleString('de-DE')}</span></p>
            </div>

            <hr className="separador-confirmacion"/>

            <div className="acciones-confirmacion">
                <button className="btn-primario btn-descargar-boleta" onClick={generarBoleta}>
                    <i class="bi bi-receipt"></i>Descargar Boleta
                </button>
                <Link to="/cliente" className="btn-secundario btn-accion-postcompra">
                    <i class="bi bi-bag"></i>Seguir Comprando
                </Link>
                <Link to="/cliente/mis_compras" className="btn-terciario btn-accion-postcompra">
                    <i class="bi bi-box2"></i>Ver Mis Pedidos
                </Link>
            </div>
        </div>
    </main>
  )
}

export default CompraExitosa