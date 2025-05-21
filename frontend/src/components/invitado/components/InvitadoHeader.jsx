import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isTokenValido } from "../../../helpers/auth"
import { useNavigate } from 'react-router-dom';

const InvitadoHeader = () => {
  const [showNavBar, setShowNavBar] = useState(false)

  const navigation = useNavigate()

  useEffect(() => {
      isTokenValido("cliente").then(resultado => {
        if(resultado) {
          navigation("/cliente")
        }
      })
    }, [navigation])

  const switchNavbar = () => {
    setShowNavBar(!showNavBar)
  }


  return (
    <nav class="navbar navbar-expand-lg  main-navbar">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/invitado">
          <img src="/logo.png" alt="Logo" class="d-inline-block align-text-top"/>
        </Link>
        <button class="navbar-toggler" type="button" onClick={switchNavbar}>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class={`collapse navbar-collapse ${showNavBar? "show" : ""}`} id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/invitado">Inicio</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/invitado/productos">Productos</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/invitado/categorias">Categorías</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/invitado/marcas">Marcas</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/invitado/contacto">Contacto</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/invitado/intranet">Intranet</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login-cliente">Iniciar sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default InvitadoHeader