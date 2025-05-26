import './RegistroCliente.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useState, useEffect } from 'react'
import { useRef } from "react";
import { Modal } from "bootstrap";
import { useNavigate } from 'react-router-dom';
import PersonalModal from '../../comunes/PersonalModal';
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const RegistroCliente = () => {

    const nav = useNavigate()

    const modalRef = useRef(null);

    const [tituloModal, setTituloModal] = useState("")

    const mostrarModal = (titulo) => {
        setTituloModal(titulo)
        const modal = new Modal(modalRef.current);
        modal.show();
    };

    const [error, setError] = useState()

    const [comunas, setComunas] = useState()

    useEffect(() => {
        axios.get(`${USER_API_URL}/comuna`)
        .then((response) => {
            setComunas(response.data)
        })
        .catch((error) => {
            setError(error)
        })
    }, [])

    const [regiones, setRegiones] = useState()

    const [regionSeleccionada, setRegionSeleccionada] = useState("1")

    useEffect(() => {
        axios.get(`${USER_API_URL}/region`)
        .then((response) => {
            setRegiones(response.data)
        })
        .catch((error) => {
            setError(error)
        })
    }, [])



    const [data, setData] = useState(
        {
            "id_cliente": 0,
            "nombre_completo": "",
            "correo_electronico": "",
            "password": "",
            "repeat_password": "",
            "direccion": "",
            "is_habilitado_para_descuento": false,
            "is_confirmado_para_descuento": false,
            "numero_de_contacto": "",
            "id_comuna": 1,
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
        if(data.direccion.length < 4) {
            mostrarModal("La dirección no puede tener menos de 4 caracteres")
            return false
        }
        if(data.numero_de_contacto.length < 8) {
            mostrarModal("Número de contacto no válido")
            return false
        }
        if(data.password != data.repeat_password) {
            mostrarModal("Las contraseñas no coinciden")
            return false
        }
        const response = await axios.get(`${USER_API_URL}/cliente`)
        const clientes = response.data
        const isEmailOcupado = clientes.some(cliente => cliente.correo_electronico === data.correo_electronico)
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

        axios.post(`${USER_API_URL}/cliente`, data)
        .then(() => {
            mostrarModal("Cliente creado con éxito")
            nav("/login-cliente")
        })
        .catch(() => {
            mostrarModal("Error al intentar registrar al cliente")
        }).finally(() => {
            setLoading(false)
        })
    }

    if(error){
        return (
            <>
                <CuerpoError>Error al cargar la información</CuerpoError>
                <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
            </>
        )
    }

    if(!comunas || !regiones){
        return(
            <>
                <Loader></Loader>
                <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
            </>
        )
    }

    return (
        <main className='d-flex align-items-center py-4 login-main'>
            <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
      <div className='form-signin w-100 m-auto container'>
        <form onSubmit={submit}>
          <img class="mb-5" src="logo.png" alt="" width="72" height="57"></img>
            <h1 className='h3 fw-bold'>Crear cuenta</h1>

            <div class="form-floating">
                <input type="text" id="nombre_completo" name="nombre_completo" className='form-control' required onChange={changeData}/>
                <label htmlFor="nombre_completo">Nombre Completo:</label>
            </div>

            <div className="form-floating">
                <input type="email" id="correo_electronico" name="correo_electronico" className='form-control' required onChange={changeData}/>
                <label htmlFor="email">Email:</label>
            </div>

            <div className="form-floating">
                <input type="password" id="password" name="password" className='form-control form-control-lg' required onChange={changeData}/>
                <label htmlFor="password">Contraseña:</label>
            </div>

            <div className="form-floating">
                <input type="password" id="repeat_password" name="repeat_password" className='form-control form-control-lg' required onChange={changeData}/>
                <label htmlFor="repeat_password">Repetir contraseña:</label>
            </div>

            <div class="form-floating">
                <input type="text" id="direccion" name="direccion" className='form-control' required onChange={changeData}/>
                <label htmlFor="direccion">Dirección:</label>
            </div>

            <div class="form-floating">
                <input type="text" id="numero_de_contacto" name="numero_de_contacto" className='form-control' required onChange={changeData}/>
                <label htmlFor="numero_de_contacto">Número de contacto:</label>
            </div>

            <label for="region">Seleccione su región:</label>
            <select id="region" name="region" className='form-select' required onChange={(e) => setRegionSeleccionada(e.target.value)}>
            {
                regiones.map((region) => (
                    <option key={region.id_region} value={region.id_region.toString()}>{region.descripcion}</option>
                ))
            }
            </select>

            <label for="id_comuna">Seleccione su comuna:</label>
            <select id="id_comuna" name="id_comuna" className='form-select' required onChange={changeData}>
                {
                    comunas[regionSeleccionada].map((comuna) => (
                        <option key={comuna.id_comuna} value={comuna.id_comuna}>{comuna.descripcion}</option>
                    ))
                }
            </select>

            <button type="submit" className="btn w-100 py-2 btn-primary">{loading ? "Cargando..." : "Registrarse"}</button>
        </form>
        {error != null ? 
        <div className="alert alert-danger" role="alert">
            Ha ocurrido un error al intentar registrar la cuenta
          </div> : <></>
          }
          <div class="register-link">
            <p>¿¿Ya tienes una cuenta? <Link to="/login-cliente">Inicia sesión</Link></p>
        </div>
        </div>
    </main>
    )
}

export default RegistroCliente;
