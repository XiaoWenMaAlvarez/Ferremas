import './SeleccionarEntrega.css'
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState, useRef } from 'react'
import { getCarrito, agregarPropiedadesAlCarrito} from '../../../helpers/carrito.js'
import { useNavigate } from 'react-router-dom'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const SeleccionarEntrega = () => {

    const navigate = useNavigate()

    const [subtotal, setSubtotal] = useState(0)
    const [productos, setProductos] = useState()

    const [errorForm, setErrorForm] = useState()

    const [direccionCompleta, setDireccionCompleta] = useState()

    const [direccionEnvio, setDireccionEnvio] = useState({
        direccion: "",
        id_comuna: 0,
    })

    const [regionSeleccionada, setRegionSeleccionada] = useState("1")

    useEffect(() => {
        getCarrito().then( async (carrito) => {
            setProductos(carrito.productos)
            const userResponse = await  axios.get(`${USER_API_URL}/cliente/${carrito.id_cliente}`)
            const comunaResponse = await  axios.get(`${USER_API_URL}/comuna/${userResponse.data.id_comuna}`)
            let direccion = {
                "direccion": userResponse.data.direccion,
                "id_comuna": userResponse.data.id_comuna,
                "id_region": comunaResponse.data.id_region
            }
            setDireccionCompleta(direccion)
            setDireccionEnvio({
                direccion: userResponse.data.direccion,
                "id_comuna": userResponse.data.id_comuna,
            })
            setRegionSeleccionada(comunaResponse.data.id_region.toString())
            for(let producto of carrito.productos) {
                axios.get(`${USER_API_URL}/producto/${producto.id_producto}`).then((response) => {
                    let precio = response.data.precio
                    let descuento = parseInt(precio) * parseInt(producto.cantidad) * carrito.descuento / 100
                    setSubtotal(subtotal => Math.floor(subtotal + (parseInt(precio) * parseInt(producto.cantidad) - descuento)))
                })
                
            }
        }).catch(() => {
            setError("Error al cargar la información del carrito")
        })
    }, [])

    const [opcionElegida, setOpcionElegida] = useState(1)

    const datosEnvioRef = useRef()

    const puntoDeRetiroRef = useRef()

    const [error, setError] = useState()

    const [comunas, setComunas] = useState()

    const [puntoDeRetiro, setPuntoDeRetiro] = useState({
        id_punto_retiro: 2,
    })

    const [tiendas, setTiendas] = useState()

    useEffect(() => {
        axios.get(`${USER_API_URL}/tienda`)
        .then((response) => {
            setTiendas(response.data)
        })
        .catch((error) => {
            setError(error)
        })
    }, [])

    const changeSucursalRetiro = (e) => {
        setPuntoDeRetiro({
            id_punto_retiro: e.target.value
        })
    }

    const changeDireccionEnvio = (e) => {
        setDireccionEnvio({
            ...direccionEnvio,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        axios.get(`${USER_API_URL}/comuna`)
        .then((response) => {
            setComunas(response.data)
        })
        .catch((error) => {
            setError(error)
        })
    }, [])

    const [regiones, setRegiones] = useState()

    

    useEffect(() => {
        axios.get(`${USER_API_URL}/region`)
        .then((response) => {
            setRegiones(response.data)
        })
        .catch((error) => {
            setError(error)
        })
    }, [])

    useEffect(() => {
        if(comunas && regiones && tiendas && direccionCompleta){
        if (opcionElegida == 1) {
            datosEnvioRef.current.style.display = "block"
            puntoDeRetiroRef.current.style.display = "none"
        } else {
            datosEnvioRef.current.style.display = "none"
            puntoDeRetiroRef.current.style.display = "block"
        }
    }}, [opcionElegida, comunas, regiones, tiendas, direccionCompleta])


    const validarFormulario = () => {

        if(opcionElegida == 1) {
            if(direccionEnvio.direccion.length < 4) {
                setErrorForm("La dirección no puede tener menos de 4 letras")
                return
            }

            if(direccionEnvio.id_comuna == 0) {
                setErrorForm("Debes seleccionar una comuna")
                return
            }

            const propiedades = ["id_tipo_entrega", "direccion_envio", "id_comuna"]
            const valores = [1, direccionEnvio.direccion, direccionEnvio.id_comuna]

            agregarPropiedadesAlCarrito(propiedades, valores)
        }else{
            const propiedades = ["id_tipo_entrega", "sucursal_retiro"]
            const valores = [2, puntoDeRetiro.id_punto_retiro]

            agregarPropiedadesAlCarrito(propiedades, valores)
        }

        navigate("/cliente/realizar_pago")
    }

    if(error){
        return (
            <CuerpoError>Error al cargar las tiendas</CuerpoError>
        )
    }

    if(!comunas || !regiones || !tiendas || !productos || !direccionCompleta){
        return(
            <Loader></Loader>
        )
    }

  return (
    <main className="contenedor-principal-entrega">
        <div className="titulo-pagina-entrega">
            <h1>¿Cómo quieres recibir tu compra?</h1>
            <p>Selecciona una opción para continuar.</p>
        </div>

        <div className="layout-entrega-resumen">
            <section className="opciones-y-formularios">
                <div className="contenedor-opciones-entrega">
                    <div className="opcion-entrega" id="panel-despacho">
                        <input type="radio" name="metodo_entrega" id="despacho_domicilio" value="domicilio" defaultChecked onChange={() => setOpcionElegida(1)}/>
                        <label htmlFor="despacho_domicilio" className="label-opcion-entrega">
                            <div className="opcion-entrega-icono">
                                <i class="bi bi-truck"></i>
                            </div>
                            <div className="opcion-entrega-info">
                                <h2>Enviar a mi domicilio</h2>
                                <p>Recibe tus productos sin salir de casa.</p>
                                <span className="opcion-entrega-costo-estimado">Costo estimado: $2.500</span>
                            </div>
                            <span className="radio-custom"></span>
                        </label>
                    </div>

                    <div className="opcion-entrega" id="panel-retiro">
                        <input type="radio" name="metodo_entrega" id="retiro_punto" value="retiro" onChange={() => setOpcionElegida(2)}/>
                        <label htmlFor="retiro_punto" className="label-opcion-entrega">
                            <div className="opcion-entrega-icono">
                                <i className="bi bi-shop"></i>
                            </div>
                            <div className="opcion-entrega-info">
                                <h2>Retirar en punto de entrega</h2>
                                <p>Elige una de nuestras sucursales o puntos asociados.</p>
                                <span className="opcion-entrega-costo-estimado">Gratis</span>
                            </div>
                            <span className="radio-custom"></span>
                        </label>
                    </div>
                </div>

                <div id="seccion-despacho-domicilio" className="detalles-metodo-entrega" ref={datosEnvioRef}>
                    <h3>Completa los datos para el envío</h3>
                    <form action="#" method="POST" className="formulario-direccion">
                        <div className="grupo-form">
                            <label htmlFor="direccion">Dirección</label>
                            <input type="text" id="direccion" name="direccion" defaultValue={direccionCompleta.direccion} required onChange={changeDireccionEnvio}/>
                        </div>
                        <div className="grupo-form-doble">
                            <div className="grupo-form">
                                <label htmlFor="region">Región</label>
                                <select id="region" name="region" required defaultValue={direccionCompleta.id_region} onChange={(e) => setRegionSeleccionada(e.target.value)}>
                                    {
                                        regiones.map((region) => (
                                            <option key={region.id_region} value={region.id_region.toString()}>{region.descripcion}</option>
                                        ))
                                    }
                                    </select>
                            </div>
                            <div className="grupo-form">
                                <label htmlFor="id_comuna">Comuna</label>
                                <select id="id_comuna" name="id_comuna" required defaultValue={direccionCompleta.id_comuna} onChange={changeDireccionEnvio}> 
                                    <option value="0">Selecciona una comuna</option>
                                    {
                                        comunas[regionSeleccionada].map((comuna) => (
                                            <option key={comuna.id_comuna} value={comuna.id_comuna}>{comuna.descripcion}</option>
                                        ))
                                    }
                                    </select>
                            </div>
                        </div>
                    </form>
                </div>

                <div id="seccion-retiro-punto" className="detalles-metodo-entrega" ref={puntoDeRetiroRef}>
                    <h3>Selecciona un punto de retiro</h3>
                    <div className="form-group">
            <label htmlFor="id_tienda">Tienda Asociada:</label>
            <select id="id_tienda" name="id_tienda" required onChange={changeSucursalRetiro}>
                {
                    tiendas.filter((tienda) => tienda.nombre != "Venta online").map((tienda) => (
                        <option key={tienda.id_tienda} value={tienda.id_tienda.toString()}>{tienda.nombre}</option>
                    ))
                }
                </select>
            </div>
                </div>
            </section>

            <aside className="resumen-pedido-entrega">
                <h3>Resumen de tu pedido</h3>
            
                <div className="total-resumen-entrega">
                    <p>Subtotal: <span>${subtotal.toLocaleString('de-DE')}</span></p>
                    <p>Envío: <span id="costo-envio-resumen">${opcionElegida == 1 ? "2.500" : "0"}</span></p>
                    <h4>Total: <span id="total-pedido-resumen">${opcionElegida == 1 ? (subtotal + 2500).toLocaleString('de-DE') : subtotal.toLocaleString('de-DE')}</span></h4>
                </div>
                  <button type="button" className="btn-primario btn-continuar-pago" onClick={validarFormulario}>Continuar al Pago</button>

                {errorForm ? errorForm : <></>}
                
            </aside>
        </div>
    </main>
  )
}

export default SeleccionarEntrega