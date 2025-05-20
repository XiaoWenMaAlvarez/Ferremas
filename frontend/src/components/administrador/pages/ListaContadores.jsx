import './ListaVendedores.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState, useRef } from 'react'
import { Modal } from "bootstrap";
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const ListaContadores = () => {

    const modalRef = useRef(null);
    
    const [usuarioEliminar, setUsuarioEliminar] = useState("")
    const [idUsuarioEliminar, setIdUsuarioEliminar] = useState()

    const mostrarModal = (nombre_completo, id) => {
        setUsuarioEliminar(nombre_completo)
        setIdUsuarioEliminar(id)
        const modal = new Modal(modalRef.current);
        modal.show();
    };

    const successModalRef = useRef(null);

    const mostrarModalExitoso = () => {
        const modal1 = new Modal(successModalRef.current);
        modal1.show();
    };

    const cerrarModal1YAbrirModal2 = () => {
        const modal1 = Modal.getInstance(modalRef.current);
        modal1.hide();

        modalRef.current.addEventListener("hidden.bs.modal", () => {
        mostrarModalExitoso();
        }, { once: true });
    };

    const [data, setData] = useState()

    const [recargarData, setRecargarData] = useState(false)

    const [error, setError] = useState()

    useEffect(() => {
        axios.get(`${USER_API_URL}/contador`)
        .then((response) => {
            setData(response.data)
        })
        .catch((error) => {
            setError(error)
        })
    }, [recargarData])

    const eliminarContador = (e) => {
        e.preventDefault()
        const id_contador = idUsuarioEliminar
        axios.delete(`${USER_API_URL}/contador/${id_contador}`).then((response) => {
            if(response.status === 200) {
                cerrarModal1YAbrirModal2()
                setRecargarData(!recargarData)
            }
        }).catch(() => {
            alert("Error al eliminar el contador")
        })
    }

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
            <h1>Listado de Contadores</h1>
            <Link to="/administrador/crear_contador" className="btn btn-success">Crear Nuevo Contador</Link>
        </div>

        <div className="table-responsive-wrapper">
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Completo</th>
                        <th>Correo Electrónico</th>
                        <th>Tienda Asociada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    data.map((contador) => (
                        <tr key={contador.id_contador}>
                        <td>{contador.id_contador}</td>
                        <td>{contador.nombre_completo}</td>
                        <td>{contador.correo_electronico}</td>
                        <td>{contador.tienda}</td>
                        <td className="actions-cell">
                            <Link to={`/administrador/editar_contador/${contador.id_contador}`} className="btn btn-warning">Editar</Link>
                            <Link to="#" className="btn btn-danger" onClick={() => mostrarModal(contador.nombre_completo, contador.id_contador)}>Eliminar</Link>
                        </td>
                    </tr>
                    ))
                    }
                    {
                        data.length == 0 ? 
                        <td colspan="5" class="alert alert-warning empty-alert" role="alert">
                            No hay datos
                        </td>
                        :<></>
                    }
                    </tbody>
            </table>

            <div className="modal fade" tabIndex="-1" ref={modalRef} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">¿Está seguro que desea eliminar al usuario {usuarioEliminar}?</h5>
              <button type="button" className="btn-close"data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <p>Esta acción no se puede revertir.</p>
            </div>
            <div className="modal-footer">
                <button type="button" class="btn btn-success" onClick={eliminarContador}>Si, eliminar</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">No, cancelar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" tabIndex="-1" ref={successModalRef} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Se ha eliminado al usuario {usuarioEliminar}</h5>
              <button type="button" className="btn-close"data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-footer">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>

        </div>
    </div>
  )
}

export default ListaContadores