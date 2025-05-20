import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const ListaCategorias = ({modo}) => {

  const [categorias, setCategorias] = useState()

  const [error, setError] = useState()

  useEffect(() => {
    axios.get(`${USER_API_URL}/categoria`)
        .then((response) => {
          setCategorias(response.data)
        })
        .catch((error) => {
            setError(error)
        })
  }, [])

  if(!categorias) {
        return (
            <Loader></Loader>
        )
    }

    if(error) {
        return (
            <CuerpoError>Error al cargar la información</CuerpoError>
        )
    }

  return (
    <div class="container px-4 py-5 categories-menu" id="custom-cards">
        <h2 class="pb-2 border-bottom">Categorías disponibles</h2>
        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          {
            categorias.map((categoria) => 
              <Link class="col" key={categoria.id_categoria} to={`/${modo}/productos_por_categoria/${categoria.id_categoria}`}>
                <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg tools-card">
                  <img src={`/category_${categoria.id_categoria}.png`} alt="" />
                  <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 title-container">
                    <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-white landing-card-title">
                      {categoria.descripcion}
                    </h3>
                  </div>
                </div>
              </Link>
            )
          }
          
        </div>
      </div>
  )
}

export default ListaCategorias