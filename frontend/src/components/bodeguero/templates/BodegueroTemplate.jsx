import BodegueroHeader from "../components/BodegueroHeader"
import { Outlet } from "react-router-dom"
import Footer from "../../comunes/Footer"

const BodegueroTemplate = () => {
  return (
    <div>
      <BodegueroHeader/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default BodegueroTemplate