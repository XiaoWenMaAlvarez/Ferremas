import { Link } from "react-router-dom";

const Intranet = () => {

  return (
    <div class="container px-4 py-5 categories-menu" id="custom-cards">
        <h2 class="pb-2 border-bottom">Intranet</h2>
        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">

          <Link class="col" to="/login-admin">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg tools-card">
              <img src="/admin.jpg" alt="" className="w-100 h-100 object-fit-cover" />
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 title-container">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-white landing-card-title">
                  Administrador
                </h3>
              </div>
            </div>
          </Link>

          <Link class="col" to="/login-vendedor">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg tools-card">
              <img src="/vendedor.jpeg" alt="" className="w-100 h-100 object-fit-cover" />
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 title-container">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-white landing-card-title">
                  Vendedor
                </h3>
              </div>
            </div>
          </Link>

          <Link class="col" to="/login-bodeguero">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg tools-card">
              <img src="/bodeguero.jpg" alt="" className="w-100 h-100 object-fit-cover" />
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 title-container">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-white landing-card-title">
                  Bodeguero
                </h3>
              </div>
            </div>
          </Link>

          <Link class="col" to="/login-contador">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg tools-card">
              <img src="/contador.webp" alt="" className="w-100 h-100 object-fit-cover" />
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 title-container">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-white landing-card-title">
                  Contador
                </h3>
              </div>
            </div>
          </Link>

        </div>
      </div>
  )
}

export default Intranet