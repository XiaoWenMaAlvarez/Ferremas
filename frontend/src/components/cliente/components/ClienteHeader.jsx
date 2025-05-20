import { useEffect, useState } from 'react';
import { deleteToken } from '../../../helpers/auth';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenValido } from "../../../helpers/auth"

const ClienteHeader = () => {
  const navigation = useNavigate()
  
  useEffect(() => {
    isTokenValido("cliente").then(resultado => {
      if(!resultado) {
        navigation("/login-cliente")
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
        <Link class="navbar-brand" to="/cliente/inicio">
          <img src="/logo.png" alt="Logo" class="d-inline-block align-text-top"/>
        </Link>
        <button class="navbar-toggler" type="button" onClick={switchNavbar}>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class={`collapse navbar-collapse ${showNavBar? "show" : ""}`} id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/cliente">Productos</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/cliente/categorias">Categorías</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/cliente/marcas">Marcas</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/cliente/contacto">Contacto</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/cliente/carrito">Carrito</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/cliente/mis_compras">Mis compras</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/cliente/editar_perfil">Editar perfil</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login-cliente" onClick={handleSession}>Cerrar sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default ClienteHeader