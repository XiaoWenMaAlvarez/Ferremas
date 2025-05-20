import './CrearVendedor.css'
import './AdminHome.css'
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useRef } from "react";
import { Modal } from "bootstrap";
import PersonalModal from '../../comunes/PersonalModal';
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const CrearContador = () => {

    const modalRef = useRef(null);

    const [tituloModal, setTituloModal] = useState("")

    const mostrarModal = (titulo) => {
        setTituloModal(titulo)
        const modal = new Modal(modalRef.current);
        modal.show();
    };

    const [tiendas, setTiendas] = useState()

    const [error, setError] = useState()

    const [data, setData] = useState(
        {
            "id_contador": 0,
            "nombre_completo": "",
            "correo_electronico": "",
            "password": "",
            "id_tienda": 0
        }
    )
    const [loading, setLoading] = useState(false)    

    useEffect(() => {
        axios.get(`${USER_API_URL}/tienda`)
        .then((response) => {
            setTiendas(response.data)
        })
        .catch((error) => {
            setError(error)
        })
    }, [])


    if(error){
        return (
            <CuerpoError>Error al cargar las tiendas</CuerpoError>
        )
    }

    if(!tiendas){
        return(
            <Loader></Loader>
        )
    }

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

        const response = await axios.get(`${USER_API_URL}/contador`)
        const contadores = response.data
        const isEmailOcupado = contadores.some(contador => contador.correo_electronico === data.correo_electronico)
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

        axios.post(`${USER_API_URL}/contador`, data)
        .then(() => {
            mostrarModal("Contador creado con éxito")
        })
        .catch(() => {
            mostrarModal("Error al intentar registrar al contador")
        }).finally(() => {
            setLoading(false)
        })
    }

  return(
    <div className="admin-form-container">
        <form className="admin-form" onSubmit={submit}>
            <h1>Crear Nuevo Contador</h1>

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
            
            <div className="form-group">
            <label htmlFor="id_tienda">Tienda Asociada:</label>
            <select id="id_tienda" name="id_tienda" required onChange={changeData}>
                {
                    tiendas.map((tienda) => (
                        <option key={tienda.id_tienda} value={tienda.id_tienda.toString()}>{tienda.nombre}</option>
                    ))
                }
                </select>
            </div>

            <button type="submit" className="btn-create-user">{loading ? "Cargando..." : "Crear contador"}</button>

            <div className="form-links">
                <Link to="/administrador/contadores">Volver al listado de contadores</Link>
            </div>
        </form>
        <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
    </div>
  )
}

export default CrearContador