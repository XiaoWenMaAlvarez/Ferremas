import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminHome.css'
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { obtenerIdUsuario } from '../../../helpers/auth'
import CuerpoError from "../../comunes/CuerpoError"
import { useRef } from "react";
import { Modal } from "bootstrap";
import PersonalModal from '../../comunes/PersonalModal';
import Loader from '../../comunes/Loader'

const CambiarNombreYPass = () => {

    const modalRef = useRef(null);
    
    const [tituloModal, setTituloModal] = useState("")

    useEffect(() => {
        if(tituloModal != ""){
            const modal = new Modal(modalRef.current);
            modal.show();
        }
    }, [tituloModal])

  const nav = useNavigate()

  const [error, setError] = useState()

  const [administrador, setAdministrador] = useState()
  const [loading, setLoading] = useState(false)    

  useEffect(() => {
      obtenerIdUsuario("administrador").then((id_administrador) => {
          axios.get(`${USER_API_URL}/administrador/${id_administrador}`)
          .then((response) => {
              setAdministrador({
                  "password": "",
                  "id_administrador": id_administrador,
                  "nombre_completo": response.data.nombre_completo,
                  "correo_electronico": response.data.correo_electronico,
                  "id_tienda": response.data.id_tienda,
              })
          })
          .catch((error) => {
              setError(error)
          })
      })
        
    }, [])

    const changeData = (e) => {
        setAdministrador({
            ...administrador,
            [e.target.name]: e.target.value
        })
    }

    const isFormularioValido = async () => {
        if(administrador.nombre_completo.length < 4) {
            setTituloModal("El nombre no puede tener menos de 4 letras")
            return false
        }
        if(administrador.password.length < 4) {
            setTituloModal("La contraseña no puede tener menos de 4 caracteres")
            return false
        }

        const response = await axios.get(`${USER_API_URL}/administrador`)
        const administradores = response.data
        const isEmailOcupado = administradores.filter(admin => admin.correo_electronico === administrador.correo_electronico).length
        
        const adminActual = await axios.get(`${USER_API_URL}/administrador/${administrador.id_administrador}`)

        if(adminActual.data.correo_electronico !== administrador.correo_electronico && isEmailOcupado > 0){
            setTituloModal("El correo electrónico ya se encuentra registrado")
            return false
        }
        return true
    }

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const isValido = await isFormularioValido()

        if(!isValido) {
            setLoading(false)
            return
        }

        axios.put(`${USER_API_URL}/administrador/${administrador.id_administrador}`, administrador)
        .then(() => {
            setTituloModal("Administrador actualizado con éxito")
            nav("/administrador")
        })
        .catch(() => {
            setTituloModal("Error al intentar actualizar al administrador")
        }).finally(() => {
            setLoading(false)
        })
    }

    

    if(error){
        return (
            <>
            <CuerpoError>Error al intentar cargar el administrador</CuerpoError>
            <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
            </>
        )
    }

    if(!administrador) {
        return (
            <Loader></Loader>
        )
    }

    return (
    <main className='d-flex align-items-center py-4 login-main'>
      <div className='form-signin w-100 m-auto container'>
        <form onSubmit={submit}>
          <img class="mb-5" src="/logo.png" alt="" width="72" height="57"></img>
            <h1 className='h3 fw-bold'>Debe cambiar sus datos</h1>
            <div className="form-floating">
                <input type="text" id="nombre_completo" name="nombre_completo" className='form-control' required onChange={changeData} defaultValue={administrador.nombre_completo}/>
                <label htmlFor="nombre_completo">Nombre Completo:</label>
            </div>
            <div className="form-floating">
                <input type="email" id="correo_electronico" name="correo_electronico" className='form-control' required onChange={changeData} defaultValue={administrador.correo_electronico}/>
                <label htmlFor="correo_electronico">Email:</label>
            </div>
            <div className="form-floating">
                <input type="password" id="password" name="password" className='form-control form-control-lg' required onChange={changeData} defaultValue={administrador.password}/>
                <label htmlFor="password">Contraseña:</label>
            </div>
            <button type="submit" className="btn w-100 py-2 btn-primary">{loading ? "Cargando..." : "Editar Administrador"}</button>
        </form>
        <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
        </div>
    </main>
  )
}

export default CambiarNombreYPass