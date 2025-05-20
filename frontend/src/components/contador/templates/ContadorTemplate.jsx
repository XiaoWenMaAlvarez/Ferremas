import ContadorHeader from "../components/ContadorHeader"
import { Outlet } from "react-router-dom"
import Footer from "../../comunes/Footer"

const ContadorTemplate = () => {
  return (
    <div>
      <ContadorHeader/>
      <Outlet/>
      <Footer></Footer>
    </div>
  )
}

export default ContadorTemplate