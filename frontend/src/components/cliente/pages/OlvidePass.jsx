import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env.js"
import { isTokenValido } from "../../../helpers/auth.js"
import { Modal } from "bootstrap";
import PersonalModal from '../../comunes/PersonalModal.jsx';
import { useRef } from 'react'

const OlvidePass = () => {

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
    const data = {
      email: e.target.email.value,
    }
    setLoading(true)

    axios.post(`${USER_API_URL}/cliente/enviar_correo_recuperacion`, data)
      .then(() => {
        mostrarModal("Correo electrónico enviado")
        nav("/login-cliente")
      })
      .catch(() => {
        mostrarModal("El correo electrónico no se encuentra registrado como cliente")
      }).finally(() => {
        setLoading(false)
      })
  }

  return (
    <main className='d-flex align-items-center py-4 login-main'>
      <PersonalModal modalRef={modalRef} titulo={tituloModal}></PersonalModal>
      <div className='form-signin w-100 m-auto container'>
        <form onSubmit={handleSubmit}>
          <img class="mb-5" src="logo.png" alt="" width="72" height="57"></img>
            <h1 className='h3 fw-bold'>Recuperar contraseña</h1>
            <div className="form-floating">
                <input type="email" id="email" name="email" className='form-control' required/>
                <label htmlFor="email">Email:</label>
            </div>
            <button type="submit" className="btn w-100 py-2 btn-primary">{loading ? "Cargando..." : "Recuperar contraseña"}</button>
        </form>
        </div>
    </main>
  )

}

export default OlvidePass