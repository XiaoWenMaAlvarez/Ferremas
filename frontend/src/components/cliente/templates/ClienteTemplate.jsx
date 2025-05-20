import ClienteHeader from "../components/ClienteHeader"
import { Outlet } from "react-router-dom"
import Footer from "../../comunes/Footer"

const ClienteTemplate = () => {
  return (
    <div>
      <ClienteHeader/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default ClienteTemplate