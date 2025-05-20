import './CrearVendedor.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useState } from 'react'
import { useRef } from "react";
import { Modal } from "bootstrap";
import PersonalModal from '../../comunes/PersonalModal';

const CrearBodeguero = () => {

    const modalRef = useRef(null);

    const [tituloModal, setTituloModal] = useState("")

    const mostrarModal = (titulo) => {
        setTituloModal(titulo)
        const modal = new Modal(modalRef.current);
        modal.show();
    };

    const [data, setData] = useState(
        {
            "id_bodeguero": 0,
            "nombre_completo": "",
            "correo_electronico": "",
            "password": ""
        }
    )
    const [loading, setLoading] = useState(false)    

    const changeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const isFormularioValido = async () => {
        if(data.nombre_completo.length < 4) {
            mostrarModal("El nombre no puede tener menos de 4 letras")
            return false
        }
        if(data.password.length < 4) {
            mostrarModal("La contraseña no puede tener menos de 4 caracteres")
            return false
        }
        const response = await axios.get(`${USER_API_URL}/bodeguero`)
        const bodegueros = response.data
        const isEmailOcupado = bodegueros.some(bodeguero => bodeguero.correo_electronico === data.correo_electronico)
        if(isEmailOcupado){
            mostrarModal("El correo electrónico ya se encuentra registrado")
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

        axios.post(`${USER_API_URL}/bodeguero`, data)
        .then(() => {
            mostrarModal("Bodeguero creado con éxito")
        })
        .catch(() => {
            mostrarModal("Error al intentar registrar al bodeguero")
        }).finally(() => {
            setLoading(false)
        })
    }

  return(
    <div className="admin-form-container">
        <form className="admin-form" onSubmit={submit}>
            <h1>Crear Nuevo Bodeguero</h1>

            <div className="form-group">
                <label htmlFor="nombre_completo">Nombre Completo:</label>
                <input type="text" id="nombre_completo" name="nombre_completo" required onChange={changeData}/>
            </div>

            <div className="form-group">
                <label htmlFor="correo_electronico">Correo Electrónico:</label>
                <input type="email" id="correo_electronico" name="correo_electronico" required onChange={changeData}/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" required onChange={changeData}/>
                </div>

            <button type="submit" className="btn-create-user">{loading ? "Cargando..." : "Crear bodeguero"}</button>

            <div className="form-links">
                <Link to="/administrador/bodegueros">Volver al listado de bodegueros</Link>
            </div>
        </form>
        <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
    </div>
  )
}

export default CrearBodeguero