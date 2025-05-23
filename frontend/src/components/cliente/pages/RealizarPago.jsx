import './RealizarPago.css'
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {obtenerPreciosProductosCarrito, deleteCarrito} from '../../../helpers/carrito.js'
import PaypalButton from '../components/PayPalPayment.jsx'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const RealizarPago = () => {

    const navigate = useNavigate()

    const [opcionElegida, setOpcionElegida] = useState(1)
    const pagoDebitoCreditoRef = useRef()
    const transferenciaRef = useRef()

    const [carrito, setCarrito] = useState()
    const [error, setError] = useState()

    const [file, setFile] = useState(null);
    const [errorForm, setErrorForm] = useState()

    const [loading, setLoading] = useState(false)
    
    const [valorDolar, setValorDolar] = useState(0)

    useEffect(() => {
        axios.get(`https://mindicador.cl/api`).then((miIndicador) => {
            setValorDolar(miIndicador.data.dolar.valor) 
        })
    }, [])

    const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const obtenerMontoPaypal = () => {
    const montoOriginal = carrito.id_tipo_entrega == 1? carrito.subtotal + 2500 : carrito.subtotal
    const montoReducido = montoOriginal / 10
    const montoFinalDolares = (montoReducido / valorDolar).toFixed(2)
    return montoFinalDolares.toString()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!file) {
        setErrorForm(<p className="error-form">Por favor selecciona un archivo</p>)
        return;
    }

    setLoading(true)

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ferremas");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dmzqscp6y/image/upload",
        formData
      );

      const url = res.data.secure_url;

      const hoy = new Date();
      const fechaFormateada = hoy.toISOString().split("T")[0];

    let data = {
        id_cliente: carrito.id_cliente,
        id_tienda: 1,
        id_tipo_entrega: carrito.id_tipo_entrega,
        id_estado_venta: 1,
        id_tipo_pago: 2,
        fecha: fechaFormateada,
        descuento: carrito.descuento,
        sucursal_retiro: carrito.sucursal_retiro,
        url_foto_transferencia: url,
        id_comuna: carrito.id_tipo_entrega == 1? parseInt(carrito.id_comuna): 1,
        direccion_envio: carrito.direccion_envio,
    }

    axios.post(`${USER_API_URL}/venta`, data)
        .then(async (response) => {
            if(response.status === 200) {
                const idVenta = response.data.id_venta
                let cantidadComprada = 0
                await Promise.all(carrito.productos.map(async (producto) => {
                    const registroVenta = {
                        precio_venta: producto.precio,
                        cantidad: producto.cantidad,
                        id_producto: producto.id_producto,
                        id_venta: idVenta,
                    }
                    cantidadComprada = cantidadComprada + producto.cantidad
                    await axios.post(`${USER_API_URL}/detalle_venta/`, registroVenta)
                }))
                deleteCarrito()
                setLoading(false)
                await axios.patch(`${USER_API_URL}/cliente/${carrito.id_cliente}`, {is_confirmado_para_descuento: false})
                if(carrito.descuento > 0){
                    await axios.patch(`${USER_API_URL}/cliente/guardar_descuento_anterior/${carrito.id_cliente}`)
                }
                
                navigate(`/cliente/compra_exitosa/${idVenta}`)
            }else{
                setErrorForm(<p className="error-form">Error al registrar la venta</p>)
            }
            
        })
        .catch(() => {
            setLoading(false)
            setErrorForm("Error al intentar registrar la venta")
        })

    } catch (err) {
        setLoading(false)
        console.error("Error al subir imagen:", err);
    }
  };


  const handleSubmitPayPal = async (detalles) => {

    const hoy = new Date();
    const fechaFormateada = hoy.toISOString().split("T")[0];

    let data = {
        id_cliente: carrito.id_cliente,
        id_tienda: 1,
        id_tipo_entrega: carrito.id_tipo_entrega,
        id_estado_venta: 6,
        id_tipo_pago: 1,
        fecha: fechaFormateada,
        descuento: carrito.descuento,
        sucursal_retiro: carrito.sucursal_retiro,
        id_comuna: carrito.id_tipo_entrega == 1? parseInt(carrito.id_comuna): 1,
        direccion_envio: carrito.direccion_envio,
        id_pago_online: detalles.id,
    }

    axios.post(`${USER_API_URL}/venta`, data)
        .then(async (response) => {
            if(response.status === 200) {
                const idVenta = response.data.id_venta
                let cantidadComprada = 0
                await Promise.all(carrito.productos.map(async (producto) => {
                    const registroVenta = {
                        precio_venta: producto.precio,
                        cantidad: producto.cantidad,
                        id_producto: producto.id_producto,
                        id_venta: idVenta,
                    }
                    cantidadComprada = cantidadComprada + producto.cantidad
                    await axios.post(`${USER_API_URL}/detalle_venta/`, registroVenta)
                }))
                deleteCarrito()
                setLoading(false)
                await axios.patch(`${USER_API_URL}/cliente/${carrito.id_cliente}`, {is_confirmado_para_descuento:false})

                if(cantidadComprada > 4) {
                    await axios.patch(`${USER_API_URL}/cliente/${carrito.id_cliente}`, {is_habilitado_para_descuento: true})
                    await axios.get(`${USER_API_URL}/cliente/confirmar_descuento/${carrito.id_cliente}`)
                }
                
                navigate(`/cliente/compra_exitosa/${idVenta}`)
            }else{
                setErrorForm(<p className="error-form">Error al registrar la venta</p>)
            }
            
        })
        .catch(() => {
            setLoading(false)
            setErrorForm("Error al intentar registrar la venta")
        })
    };

    useEffect(() => {
        if(carrito && valorDolar) {
            if (opcionElegida == 1) {
                pagoDebitoCreditoRef.current.style.display = "block"
                transferenciaRef.current.style.display = "none"
            } else {
                pagoDebitoCreditoRef.current.style.display = "none"
                transferenciaRef.current.style.display = "block"
            }
        }
    }, [opcionElegida, carrito, valorDolar])


    useEffect(() => {
        obtenerPreciosProductosCarrito().then((carrito) => {
            setCarrito(carrito)
        }).catch(() => {
            setError("Error al cargar la información del carrito")
        })
    }, [])

    if(error){
        return (
            <CuerpoError>Error al cargar las tiendas</CuerpoError>
        )
    }

    if(!carrito || valorDolar==0){
        return(
            <Loader></Loader>
        )
    }

  return (
    <main className="contenedor-principal-pago">
        <div className="titulo-pagina-pago">
            <h1>¿Cómo quieres pagar?</h1>
        </div>

        <div className="layout-pago-resumen">
            <section className="opciones-y-detalles-pago">
                <div className="contenedor-opciones-pago">
                    <div className="opcion-pago" id="panel-tarjeta">
                        <input type="radio" name="metodo_pago_seleccionado" id="pago_tarjeta" value="tarjeta" defaultChecked onChange={() => setOpcionElegida(1)}/>
                        <label htmlFor="pago_tarjeta" className="label-opcion-pago">
                            <div className="opcion-pago-icono">
                                <i class="bi bi-credit-card"></i>
                            </div>
                            <div className="opcion-pago-info">
                                <h2>Tarjeta de débito o crédito</h2>
                                <p>Visa, Mastercard, American Express y más.</p>
                            </div>
                            <span className="radio-custom"></span>
                        </label>
                    </div>

                    <div className="opcion-pago" id="panel-transferencia">
                        <input type="radio" name="metodo_pago_seleccionado" id="pago_transferencia" value="transferencia" onChange={() => setOpcionElegida(2)}/>
                        <label htmlFor="pago_transferencia" className="label-opcion-pago">
                            <div className="opcion-pago-icono">
                                <i class="bi bi-bank"></i></div>
                            <div className="opcion-pago-info">
                                <h2>Transferencia bancaria</h2>
                                <p>Realiza una transferencia y adjunta el comprobante.</p>
                            </div>
                            <span className="radio-custom"></span>
                        </label>
                    </div>
                </div>

                <div id="seccion-pago-tarjeta" className="detalles-metodo-pago" ref={pagoDebitoCreditoRef}>
                    <h3>Pagar con Paypal</h3>
                    <PaypalButton
                    monto={obtenerMontoPaypal()}
                    onSuccess={handleSubmitPayPal}/>
                    
                </div>

                <div id="seccion-pago-transferencia" className="detalles-metodo-pago" ref={transferenciaRef}>
                    <h3>Datos para realizar la transferencia</h3>
                    <div className="datos-bancarios">
                        <p><strong>Banco:</strong> Banco Estado</p>
                        <p><strong>Tipo de Cuenta:</strong> Cuenta Corriente</p>
                        <p><strong>Número de Cuenta:</strong> 1234567890</p>
                        <p><strong>Nombre Titular: </strong>Ferremas</p>
                        <p><strong>RUT Titular:</strong> 76.123.456-K</p>
                        <p><strong>Email para notificar:</strong> pagos@ferremas.cl</p>
                        <p><strong>Monto a transferir: </strong> 
                        <span id="monto-transferencia" className="monto-destacado">${(carrito.id_tipo_entrega == 1? carrito.subtotal + 2500 : carrito.subtotal).toLocaleString('de-DE')}
                            </span></p>
                    </div>
                    <hr className="separador-transferencia"/>
                    <h4>Adjuntar comprobante de transferencia</h4>
                    <div className="grupo-form-archivo">
                        <label htmlFor="comprobante_transferencia" className="label-archivo">
                            <i class="bi bi-paperclip"></i>Seleccionar archivo...
                            <span>(JPG, PNG, PDF - Máx 5MB)</span>
                        </label>
                        <input type="file" id="comprobante_transferencia" name="comprobante_transferencia" onChange={handleFileChange}/>
                        <p id="nombre-archivo-seleccionado" className="nombre-archivo">{file ? file.name : "No hay archivo seleccionado"}</p>
                    </div>
                      <button type="button" className="btn-primario btn-finalizar-compra" id="btn-accion-pago" onClick={handleSubmit}>{loading ? "Cargando..." : "Enviar comprobante"}</button>
                      {errorForm ? errorForm : <></>}
                    
                    <p className="instrucciones-transferencia">
                        <i class="bi bi-info-circle"></i>Una vez realizada la transferencia, adjunta el comprobante. La validación puede tardar hasta 24 horas hábiles.
                    </p>
                    
                </div>

            </section>

            <aside className="resumen-pedido-pago">
                <h3>Resumen de tu compra</h3>
                <hr/>
                <div className="linea-resumen-pago">
                    <span>Subtotal:</span>
                    <span id="subtotal-pago-resumen">${carrito.subtotal.toLocaleString('de-DE')}</span>
                </div>
                <div className="linea-resumen-pago">
                    <span>Envío:</span>
                    <span id="envio-pago-resumen">${carrito.id_tipo_entrega == 1? "2.500" : 0}</span>
                </div>
                <hr/>
                <div className="total-final-pago">
                    <h4>Total a pagar:</h4>
                    <h4 id="total-pagar-resumen">${(carrito.id_tipo_entrega == 1? carrito.subtotal + 2500 : carrito.subtotal).toLocaleString('de-DE')}</h4>
                </div>

                <div className="total-final-pago">
                    <h4>Total a pagar (en USD):</h4>
                    <h4 id="total-pagar-resumen">${(carrito.id_tipo_entrega == 1? ((carrito.subtotal + 2500) / valorDolar).toFixed(2) : (carrito.subtotal/valorDolar).toFixed(2)).toLocaleString('de-DE')}</h4>
                </div>
                
            </aside>
        </div>
    </main>
  )
}

export default RealizarPago