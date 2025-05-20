import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { setToken } from '../../../helpers/auth.js'
import { USER_API_URL } from "../../../constants/env"
import { isTokenValido } from "../../../helpers/auth"
import { Link } from 'react-router-dom'


const LoginCliente = () => {

  const nav = useNavigate()

  const [error, setError] = useState()
  
  useEffect(() => {
    isTokenValido("cliente").then(resultado => {
      if(resultado) {
        nav("/cliente")
      }
    })
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError()
    const data = {
      correo_electronico: e.target.email.value,
      password: e.target.password.value,
    }

    axios.post(`${USER_API_URL}/cliente/login`, data)
      .then(response => {
        const responseData = response.data
        setToken(responseData["access_token"])
        nav("/cliente")
      })
      .catch(error => {
        setError(error)
      })
  }

  return (
    <main className='d-flex align-items-center py-4 login-main'>
      <div className='form-signin w-100 m-auto container'>
        <form onSubmit={handleSubmit}>
          <img class="mb-5" src="logo.png" alt="" width="72" height="57"></img>
            <h1 className='h3 fw-bold'>Iniciar Sesión Cliente</h1>
            <div className="form-floating">
                <input type="email" id="email" name="email" className='form-control' required/>
                <label htmlFor="email">Email:</label>
            </div>
            <div className="form-floating">
                <input type="password" id="password" name="password" className='form-control form-control-lg' required/>
                <label htmlFor="password">Contraseña:</label>
            </div>
            <button type="submit" className="btn w-100 py-2 btn-primary">Ingresar</button>
        </form>
        {error != null ? <div className="alert alert-danger" role="alert">
            Usuario o contraseña incorrecta.
          </div> : <></>}
          <div class="register-link">
            <p>¿No tienes una cuenta? <Link to="/registro_cliente">Regístrate aquí</Link></p>
        </div>
        </div>
    </main>
  )

}

export default LoginCliente