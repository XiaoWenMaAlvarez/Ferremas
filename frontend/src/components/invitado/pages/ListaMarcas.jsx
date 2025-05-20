import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const ListaMarcas = ({modo}) => {
  const [marcas, setMarcas] = useState()

  const [error, setError] = useState()

  useEffect(() => {
    axios.get(`${USER_API_URL}/marca`)
        .then((response) => {
          setMarcas(response.data)
        })
        .catch((error) => {
            setError(error)
        })
  }, [])

  if(!marcas) {
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
    <>
      <div className="container marketing brand-list">
        <h1 className="border-bottom py-3 text-start">Marcas con las que trabajamos</h1>
        <div class="row">
          

          {
            marcas.map((marca) => 
              <div class="col-lg-4" key={marca.id_marca}>
                <img src={`/brand_${marca.id_marca}.png`} alt="logo" className="brand-logo" />
                <h2 class="fw-normal">{marca.descripcion}</h2>
                <p className="brand-description">
                   {marca.presentacion}
                </p>
                <p>
                  <Link class="btn btn-warning" to={`/${modo}/productos_por_marca/${marca.id_marca}`}>
                    Ver productos »
                  </Link>
                </p>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default ListaMarcas