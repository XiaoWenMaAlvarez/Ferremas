import {obtenerIdUsuario} from './auth.js'
import axios from 'axios'
import { USER_API_URL } from "../constants/env"


export const isProductoAgregadoAlCarrito = async (id_producto) => {

  let carrito = await getCarrito()

  if(carrito.productos.length == 0){
    return false
  }

  const productoExistente = carrito.productos.some(item => item.id_producto == id_producto)

  if(productoExistente){
    return true
  }
  
  return false
}

export const obtenerPreciosProductosCarrito = async () => {

  let carrito = await getCarrito()

  let subtotal = 0

  carrito.productos = await Promise.all(carrito.productos.map(async (producto) => {
    const productoEncontrado = await axios.get(`${USER_API_URL}/producto/${producto.id_producto}`)
    const precio = productoEncontrado.data.precio
    subtotal += precio * producto.cantidad
    return {
      ...producto,
      precio: precio
    }
  }))

  subtotal = subtotal - Math.floor(subtotal * carrito.descuento / 100)
  
  carrito = {
    ...carrito,
    subtotal: subtotal
  }

  setCarrito(JSON.stringify(carrito))

  return carrito
}


export const agregarProductoCarrito = async (productoConCantidad) => {
  let carrito = await getCarrito()

  let yaEstaAgregado = await isProductoAgregadoAlCarrito(productoConCantidad.id_producto)

  if(yaEstaAgregado){
    return
  } else {
    carrito.productos.push({
      ...productoConCantidad,
    })
  }

  setCarrito(JSON.stringify(carrito))
}

export const agregarPropiedadesAlCarrito = async (propiedades, valores) => {
  let carrito = await getCarrito()

  for(let i = 0; i < propiedades.length; i++){
    const propiedad = propiedades[i]
    const valor = valores[i]

    carrito = {
      ...carrito,
      [propiedad]: valor
    }
  }

  
  setCarrito(JSON.stringify(carrito))
}

export const eliminarProductoCarrito = async(id_producto) => {
  let carrito = await getCarrito()

  const productoExistente = carrito.productos.some(item => item.id_producto == id_producto)

  if(productoExistente){
    carrito.productos = carrito.productos.filter(item => item.id_producto != id_producto)
    setCarrito(JSON.stringify(carrito))
  }
}

export const actualizarCantidadProductoCarrito = async (productoConCantidad) => {
  let carrito = await getCarrito()

  const productoExistente = carrito.productos.find(item => item.id_producto == productoConCantidad.id_producto)

  if(productoExistente){
    carrito.productos = carrito.productos.map(item => {
      if(item.id_producto == productoConCantidad.id_producto){
        return {
          ...item,
          cantidad: productoConCantidad.cantidad
        }
      }
      return item
    })
  }

  setCarrito(JSON.stringify(carrito))
}


export const deleteCarrito = () => localStorage.removeItem("carrito-compras")

export const getCarrito = async()  => {
  let carrito = localStorage.getItem("carrito-compras")
  if(!carrito){
    await crearCarritoVacio()
    carrito = localStorage.getItem("carrito-compras")
  }
  return JSON.parse(carrito)
}

const setCarrito = (carrito) => localStorage.setItem("carrito-compras", carrito)

const crearCarritoVacio = async () => {

  const idCliente = await obtenerIdUsuario("cliente")

  const cliente = await axios.get(`${USER_API_URL}/cliente/${idCliente}`)

  let descuento = 0

  if(cliente.data.is_confirmado_para_descuento){
    descuento = 10
  }

  const carrito = {
    productos: [],
    descuento: descuento,
    id_cliente: idCliente,
    id_tienda: 1
  }

  setCarrito(JSON.stringify(carrito))

}

export const verificarDescuento = async () => {

  let carrito = await getCarrito()

  const idCliente = await obtenerIdUsuario("cliente")

  const cliente = await axios.get(`${USER_API_URL}/cliente/${idCliente}`)

  let descuento = 0

  if(cliente.data.is_confirmado_para_descuento){
    descuento = 10
  }

  carrito = {
    ...carrito,
    descuento: descuento,
  }

  setCarrito(JSON.stringify(carrito))
}
