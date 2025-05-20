import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { obtenerIdUsuario } from "../../../helpers/auth"
import { useEffect, useState } from 'react'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'
import "./DescuentoConfirmado.css"

const DescuentoConfirmado = () => {

  const [mensaje, setMensaje] = useState()
  const [error, setError] = useState(null)

  const [state, setState] = useState(0)


  useEffect(() => {
          obtenerIdUsuario("cliente").then((id_cliente) => {
            axios.get(`${USER_API_URL}/cliente/${id_cliente}`).then(async (response) => {
            const cliente = response.data
    
            if(cliente.is_habilitado_para_descuento){
              await axios.patch(`${USER_API_URL}/cliente/${id_cliente}`, {is_habilitado_para_descuento:false, is_confirmado_para_descuento:true})
              setMensaje("Descuento confirmado")
              setState(1)
            }else if(cliente.is_confirmado_para_descuento){
              setMensaje("Ya tienes habilitado el descuento para tu próxima compra")
              setState(1)
            }else{
              setMensaje("No estas habilitado para obtener un descuento")
              setState(0)
            }
          })
          }).catch((e) => {
            setError(e)
          })
          
      }, [])

    if(!mensaje) {
      return (
        <Loader></Loader>
      )
    }

    if(error) {
      <CuerpoError>Error al intentar cargar la información</CuerpoError>
    }

  return (
    <div className='discount--container'>
      <img src={state == 1 ? "/discount.png": "/not-discount.webp"}></img>
      <h1>{mensaje}</h1>
    </div>
  )
}

export default DescuentoConfirmado