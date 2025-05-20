import './ClienteHome.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState } from 'react'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const ClienteHome = ({modo}) => {

  const [productos, setProductos] = useState()

    const [error, setError] = useState()

    useEffect(() => {
        axios.get(`${USER_API_URL}/producto`)
        .then(async (response) => {
          let productos = response.data
          for(let i = 0; i < productos.length; i++) {
            let response2 = await axios.get(`${USER_API_URL}/foto_producto/por_id_producto/${productos[i].id_producto}`)
            let response3 = await axios.get(`${USER_API_URL}/marca/${productos[i].id_marca}`)
            productos[i].foto_producto = response2.data[0].url_foto
            productos[i].id_marca = response3.data.descripcion
          }
          setProductos(response.data)
        })
        .catch((error) => {
            setError(error)
        })
    }, [])


    if(!productos) {
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
    <main class="productos">
        <h1>Nuestros Productos</h1>

        <div class="grid-productos">
            {productos.map((producto) => (
                <div class="card" key={producto.id_producto}>
                  <Link to={`/${modo}/producto/${producto.id_producto}`}>
                    <img src={producto.foto_producto} class="card-img-top" alt="foto del producto"/>
                  </Link>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">{producto.nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">{producto.id_marca}</h6>
                        <p class="card-text">Precio: ${producto.precio.toLocaleString('de-DE')}</p>
                        <Link to={`/${modo}/producto/${producto.id_producto}`} class="btn btn-warning">Ver detalles</Link>
                    </div>
                </div>  
            ))}

            </div>
    </main>
  )
}

export default ClienteHome