import './CrearVendedor.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRef } from "react";
import { Modal } from "bootstrap";
import PersonalModal from '../../comunes/PersonalModal';
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const EditarVendedor = () => {

    const modalRef = useRef(null);

    const [tituloModal, setTituloModal] = useState("")

    const mostrarModal = (titulo) => {
        setTituloModal(titulo)
        const modal = new Modal(modalRef.current);
        modal.show();
    };

  const params = useParams()
  const id_vendedor = params.id

  const [data, setData] = useState(
        {
            "id_vendedor": 0,
            "nombre_completo": "",
            "correo_electronico": "",
            "password": ""
        }
    )
    const [loading, setLoading] = useState(false)    
    const [error, setError] = useState()

    useEffect(() => {
        if(id_vendedor) {
            setLoading(true)
            axios.get(`${USER_API_URL}/vendedor/${id_vendedor}`)
            .then((response) => {
                setData({
                    "password": "",
                    ...response.data
                })
            })
            .catch(() => {
                setError("Error al cargar la información del vendedor")
            }).finally(() => {
                setLoading(false)
            })  
        }
        
    }, [id_vendedor])

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
        const response = await axios.get(`${USER_API_URL}/vendedor`)
        const vendedores = response.data
        const isEmailOcupado = vendedores.filter(vendedor => vendedor.correo_electronico === data.correo_electronico).length
        
        const vendedorActual = await axios.get(`${USER_API_URL}/vendedor/${id_vendedor}`)

        if(vendedorActual.data.correo_electronico !== data.correo_electronico && isEmailOcupado > 0){
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

        axios.put(`${USER_API_URL}/vendedor/${id_vendedor}`, data)
        .then(() => {
            mostrarModal("Vendedor actualizado con éxito")
        })
        .catch(() => {
            mostrarModal("Error al intentar actualizar al vendedor")
        }).finally(() => {
            setLoading(false)
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

  return(
    <div className="admin-form-container">
        <form className="admin-form" onSubmit={submit}>
            <h1>Editar Vendedor</h1>

            <div className="form-group">
                <label htmlFor="nombre_completo">Nombre Completo:</label>
                <input type="text" id="nombre_completo" name="nombre_completo" required onChange={changeData} defaultValue={data.nombre_completo}/>
            </div>

            <div className="form-group">
                <label htmlFor="correo_electronico">Correo Electrónico:</label>
                <input type="email" id="correo_electronico" name="correo_electronico" required onChange={changeData} defaultValue={data.correo_electronico}/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" required onChange={changeData} defaultValue={data.password}/>
                </div>

            <button type="submit" className="btn-create-user">{loading ? "Cargando..." : "Editar vendedor"}</button>

            <div className="form-links">
                <Link to="/administrador/vendedores">Volver al listado de vendedores</Link>
            </div>
        </form>
        <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
    </div>
  )
}

export default EditarVendedor;