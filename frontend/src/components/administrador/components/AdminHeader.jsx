import { useEffect, useState } from 'react';
import { deleteToken } from '../../../helpers/auth';
import './styles/AdminHeader.css'
import { Link, useNavigate } from 'react-router-dom';
import { isTokenValido } from "../../../helpers/auth"

const AdminHeader = () => {
  const navigation = useNavigate()
  
  useEffect(() => {
    isTokenValido("administrador").then(resultado => {
      if(!resultado) {
        navigation("/login-admin")
      }
    })
  })

  const [showNavBar, setShowNavBar] = useState(false)

  const switchNavbar = () => {
    setShowNavBar(!showNavBar)
  }

  const handleSession = () => {
    deleteToken()
  }

  return (
    <nav class="navbar navbar-expand-lg  main-navbar">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/administrador">
          <img src="/logo.png" alt="Logo" class="d-inline-block align-text-top"/>
        </Link>
        <button class="navbar-toggler" type="button" onClick={switchNavbar}>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class={`collapse navbar-collapse ${showNavBar? "show" : ""}`} id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/administrador">Reportes</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/administrador/vendedores">Vendedores</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/administrador/bodegueros">Bodegueros</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/administrador/contadores">Contadores</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login-admin" onClick={handleSession}>Cerrar sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdminHeader