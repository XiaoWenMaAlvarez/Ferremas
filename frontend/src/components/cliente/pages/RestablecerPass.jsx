import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env.js"
import { isTokenValido } from "../../../helpers/auth.js"
import { Modal } from "bootstrap";
import PersonalModal from '../../comunes/PersonalModal.jsx';
import { useRef } from 'react'
import { useParams } from 'react-router-dom'

const RestablecerPass = () => {
  const params = useParams()
  const id_cliente = params.id

  const modalRef = useRef(null);
  
    const [tituloModal, setTituloModal] = useState("")

    const mostrarModal = (titulo) => {
        setTituloModal(titulo)
        const modal = new Modal(modalRef.current);
        modal.show();
    };

    const [loading, setLoading] = useState(false)

  const nav = useNavigate()
  
  useEffect(() => {
    isTokenValido("cliente").then(resultado => {
      if(resultado) {
        nav("/cliente")
      }
    })
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if(loading) return

    const pass = e.target.password.value
    const pass2 = e.target.repeat_password.value

    if(pass != pass2) {
      mostrarModal("Las contraseñas no coinciden")
      return 
    }

    if(pass.length < 4) {
      mostrarModal("La contraseña no puede tener menos de 4 caracteres")
      return 
    }

    const data = {
      password: pass,
    }
    setLoading(true)

    axios.patch(`${USER_API_URL}/cliente/${id_cliente}`, data)
      .then(() => {
        mostrarModal("Contraseña restablecida con éxito")
        nav("/login-cliente")
      })
      .catch(() => {
        mostrarModal("Error al intentar restablecer la contraseña")
      }).finally(() => {
        setLoading(false)
      })
  }

  return (
    <main className='d-flex align-items-center py-4 login-main'>
      <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
      <div className='form-signin w-100 m-auto container'>
        <form onSubmit={handleSubmit}>
          <img class="mb-5" src="/logo.png" alt="" width="72" height="57"></img>
            <h1 className='h3 fw-bold'>Restablecer contraseña</h1>
            <div className="form-floating">
                <input type="password" id="password" name="password" className='form-control form-control-lg' required/>
                <label htmlFor="password">Nueva Contraseña:</label>
            </div>
            <div className="form-floating">
                <input type="password" id="repeat_password" name="repeat_password" className='form-control form-control-lg'/>
                <label htmlFor="repeat_password">Repetir contraseña:</label>
            </div>
            <button type="submit" className="btn w-100 py-2 btn-primary">{loading ? "Cargando..." : "Restablecer contraseña"}</button>
        </form>
        </div>
    </main>
  )

}

export default RestablecerPass