import axios from 'axios'
import { USER_API_URL } from "../constants/env"

export const token = () => localStorage.getItem("access-token")

export const setToken = (token) => localStorage.setItem("access-token", token)

export const deleteToken = () => localStorage.clear()

export const clearLocal = () => localStorage.clear()


export const isTokenValido = async (tipoUsuario) => {
  const accessToken = token()
  
    if(!token){
      return false
    }

    let resultado = false

    await axios.get(`${USER_API_URL}/${tipoUsuario}/validar-token`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        const responseData = response.data
        if(responseData["tipo"] == tipoUsuario){
          resultado = true
        }
      })
      .catch(() => {
        resultado = false
      })
  
  return resultado
}

export const obtenerIdUsuario = async (tipoUsuario) => {
  const accessToken = token()

    let id_usuario = 0
    

    try {
      let response = await axios.get(`${USER_API_URL}/${tipoUsuario}/validar-token`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    
    const responseData = response.data
    id_usuario = responseData[`id_${tipoUsuario}`]
  
    return id_usuario
  } catch(e) {
    console.log(e)
    return 0
  }
}