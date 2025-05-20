import { useEffect, useState } from 'react';
import { deleteToken } from '../../../helpers/auth';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenValido } from "../../../helpers/auth"

const VendedorHeader = () => {
  const navigation = useNavigate()
  
  useEffect(() => {
    isTokenValido("vendedor").then(resultado => {
      if(!resultado) {
        navigation("/login-vendedor")
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
        <Link class="navbar-brand" to="/vendedor">
          <img src="/logo.png" alt="Logo" class="d-inline-block align-text-top"/>
        </Link>
        <button class="navbar-toggler" type="button" onClick={switchNavbar}>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class={`collapse navbar-collapse ${showNavBar? "show" : ""}`} id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/vendedor">Solicitudes de venta</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/vendedor/pedidos_por_entregar">Pedidos por entregar</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login-vendedor" onClick={handleSession}>Cerrar sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default VendedorHeader