import './PedidosPorEntregar.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState } from 'react'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const PedidosPorEntregar = () => {

    const [data, setData] = useState()

    const [error, setError] = useState()

    useEffect(() => {
        axios.get(`${USER_API_URL}/venta/por_estado_venta/3`)
        .then((response) => {
            setData(response.data)
        })
        .catch((error) => {
            setError(error)
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

  return (
    <div className="admin-list-container">
        <div className="list-header">
            <h1>Pedidos por entregar</h1>
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
                        <td>{venta.fecha}</td>
                        <td><span className="status-badge status-completed">Por entregar</span></td>
                        <td className="actions-cell">
                            <Link to={`/vendedor/detalle_pedido_por_entregar/${venta.id_venta}`} className="btn btn-info">Ver Detalles</Link>
                        </td>
                    </tr>
                    ))
                    }

                    {
                        data.length == 0 ? 
                        <td colspan="4" class="alert alert-warning empty-alert" role="alert">
                            No hay datos
                        </td>
                        :<></>
                    }
                    
                    </tbody>
            </table>
        </div>
    </div>
  )
}

export default PedidosPorEntregar