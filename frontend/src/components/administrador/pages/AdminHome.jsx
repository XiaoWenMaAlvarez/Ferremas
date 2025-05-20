import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminHome.css'
import axios from 'axios'
import { USER_API_URL } from "../../../constants/env"
import exportarVentasAExcel from '../../../helpers/reports'
import { obtenerIdUsuario } from '../../../helpers/auth'
import CuerpoError from '../../comunes/CuerpoError'
import Loader from '../../comunes/Loader'

const AdminHome = () => {

    const nav = useNavigate()

    const actualYear = new Date().getFullYear()
    const validYears = []
    for(let i = actualYear; i >= 2025; i--){
        validYears.push(i)
    }

    const [tiendas, setTiendas] = useState()

    const [error, setError] = useState()

    useEffect(() => {
        axios.get(`${USER_API_URL}/tienda`)
        .then((response) => {
            setTiendas(response.data)
        })
        .catch((error) => {
            setError(error)
        })
    }, [])

    useEffect(() => {
        obtenerIdUsuario("administrador").then((id_administrador) => {
            axios.get(`${USER_API_URL}/administrador/${id_administrador}`)
            .then((response) => {
                if(response.data.is_primer_login){
                    nav("/administrador/cambiar_nombre_y_pass")
                }
            })
            .catch((error) => {
                setError(error)
            })
        })
        
    }, [nav])

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(
        {
            "monthFilter": 1,
            "yearFilter": 2025,
            "storeFilter": 1
        }
    )

    const [errorForm, setErrorForm] = useState()

    const submit = (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorForm(null)

        axios.get(`${USER_API_URL}/venta/por_tienda/${data.storeFilter}/${data.monthFilter}/${data.yearFilter}`)
        .then((response) => {
            exportarVentasAExcel(response.data, data.monthFilter, data.yearFilter)
        })
        .catch((error) => {
            setErrorForm(error)
        }).finally(() => {
            setLoading(false)
        })
    }
  
    if(error){
        return (
            <CuerpoError>Error al cargar las tiendas</CuerpoError>
        )
    }

    if(!tiendas){
        return(
            <Loader></Loader>
        )
    }

    const changeData = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    })
}


  return (
    <div className="report-generator-container">
        <header className="page-header">
            <h1>Generar Informe de Ventas</h1>
            <p>Seleccione los criterios para generar su informe personalizado.</p>
        </header>

        <form className="report-criteria-form" id="reportForm">
            <section className="criteria-section">
                <h2>1. Periodo del Informe</h2>
                <div className="form-row">
                  <div className="form-group">
                      <label htmlFor="monthFilter">Seleccionar mes:</label>
                      <select id="monthFilter" name="monthFilter" onChange={changeData}>
                          <option value="1">Enero</option>
                          <option value="2">Febrero</option>
                          <option value="3">Marzo</option>
                          <option value="4">Abril</option>
                          <option value="5">Mayo</option>
                          <option value="6">Junio</option>
                          <option value="7">Julio</option>
                          <option value="8">Agosto</option>
                          <option value="9">Septiembre</option>
                          <option value="10">Octubre</option>
                          <option value="11">Noviembre</option>
                          <option value="12">Diciembre</option>
                          </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="yearFilter">Seleccionar año:</label>
                      <select id="yearFilter" name="yearFilter" onChange={changeData}>
                          {
                            validYears.map((year) => (
                                <option key={year.toString()} value={year.toString()}>{year}</option>
                            ))
                          }
                          </select>
                    </div>
                </div>
            </section>

            <section className="criteria-section">
                <h2>2. Tipo de Informe y Filtros</h2>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="reportType">Tipo de Informe:</label>
                        <select id="reportType" name="reportType" required>
                            <option value="summary">Resumen General de Ventas</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="storeFilter">Filtrar por Tienda:</label>
                        <select id="storeFilter" name="storeFilter" onChange={changeData}>
                            {
                            tiendas.map((tienda) => (
                                <option key={tienda.id_tienda.toString()} value={tienda.id_tienda.toString()}>{tienda.nombre}</option>
                            ))
                          }
                            </select>
                    </div>
                </div>
            </section>

            <div className="form-actions">
                <input type="submit" className="btn btn-warning btn-generate-report" 
                    value={loading ? "Cargando..." : "Generar informe"} onClick={submit}
                />
            </div>
            {errorForm ? <p>Error al cargar los datos</p> : <></>}
        </form>
    </div>
  )
}

export default AdminHome