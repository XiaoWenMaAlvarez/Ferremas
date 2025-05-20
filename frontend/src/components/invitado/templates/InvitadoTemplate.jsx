import InvitadoHeader from "../components/InvitadoHeader"
import { Outlet } from "react-router-dom"
import Footer from "../../comunes/Footer"

const InvitadoTemplate = () => {
  return (
    <div>
      <InvitadoHeader/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default InvitadoTemplate