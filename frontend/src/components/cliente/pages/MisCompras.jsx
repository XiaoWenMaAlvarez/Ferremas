import './MisCompras.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState } from 'react'
import { obtenerIdUsuario } from '../../../helpers/auth.js'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const MisCompras = () => {

    const transformarFecha = (fechaStr) => {
        const [anio, mes, dia] = fechaStr.split("-");
        return `${dia}-${mes}-${anio}`;
    }


    const [data, setData] = useState()

    const [error, setError] = useState()

    useEffect(() => {
        obtenerIdUsuario("cliente").then((id_cliente) => {
            axios.get(`${USER_API_URL}/venta/por_cliente/${id_cliente}`)
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                setError(error)
            })
        })
    }, [])

    if(!data) {
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

  return (
    <div className="admin-list-container">
        <div className="list-header">
            <h1>Listado de Compras</h1>
            </div>

        <div className="table-responsive-wrapper">
            <table className="data-table sales-table">
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    data.map((venta) => (
                        <tr key={venta.id_venta}>
                        <td>{venta.id_venta}</td>
                        <td>{transformarFecha(venta.fecha)}</td>
                        <td><span className={obtenerEstadoCSS(venta.id_estado_venta)}>{obtenerEstadoJSX(venta.id_estado_venta)}</span></td>
                        <td className="actions-cell">
                            <Link to={`/cliente/detalle_compra/${venta.id_venta}`} className="btn btn-info">
                            Ver detalle
                        </Link>
                        </td>
                    </tr>
                    ))
                    }
                    {
                        data.length == 0 ? 
                        <td colspan="4" class="alert alert-warning empty-alert" role="alert">
                            No hay compras registradas
                        </td>
                        :<></>
                    }
                    </tbody>
            </table>
        </div>
    </div>
  )
}

export default MisCompras