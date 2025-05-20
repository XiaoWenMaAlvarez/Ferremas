import VendedorHeader from "../components/VendedorHeader"
import { Outlet } from "react-router-dom"
import Footer from "../../comunes/Footer"

const VendedorTemplate = () => {
  return (
    <div>
      <VendedorHeader/>
      <Outlet/>
      <Footer></Footer>
    </div>
  )
}

export default VendedorTemplate