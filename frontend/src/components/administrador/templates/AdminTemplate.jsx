import AdminHeader from "../components/AdminHeader"
import { Outlet } from "react-router-dom"
import Footer from "../../comunes/Footer"

const AdminTemplate = () => {
  return (
    <div>
      <AdminHeader/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default AdminTemplate