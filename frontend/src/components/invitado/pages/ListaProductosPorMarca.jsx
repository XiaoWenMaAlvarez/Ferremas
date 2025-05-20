import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState } from 'react'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const ListaProductosPorMarca = ({modo}) => {

  const params = useParams()
  const id_marca = params.id

  const [productos, setProductos] = useState()

  const [error, setError] = useState()

  const [marca, setMarca] = useState()

    useEffect(() => {
        axios.get(`${USER_API_URL}/producto/por_marca/${id_marca}`)
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
    }, [id_marca])

    useEffect(() => {
      axios.get(`${USER_API_URL}/marca/${id_marca}`).then((response) => {
        setMarca(response.data.descripcion)
      })
    }, [id_marca])


    if(!productos || !marca) {
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
        <h1>Productos para la marca: {marca}</h1>

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
            {
              productos.length == 0 ? <div class="alert alert-warning text-center" role="alert">
              No se encontraron productos
            </div> : <></>
          }
    </main>
  )
}

export default ListaProductosPorMarca