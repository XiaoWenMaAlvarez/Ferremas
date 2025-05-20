import "./InvitadoHome.css";
import { Link } from "react-router-dom";

const InvitadoHome = () => {
  return (
    <>
      <div class="px-4  mb-5 text-center first-section">
        <h1 class="display-4 fw-bold .text-white">Bienvenido a Ferremas</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            Aquí, se puede encontrar una amplia gama de productos, desde
            herramientas manuales y eléctricas, pinturas, materiales eléctricos,
            hasta accesorios y artículos de seguridad. Trabajan con marcas
            reconocidas del sector como Bosch, Makita, Stanley y Sika,
            ofreciendo así diversidad y calidad en sus productos.
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-4">
            <Link to="/login-cliente">
              <button type="button" class="btn btn-warning btn-lg px-4 me-sm-3">
                Iniciar sesión
              </button>
            </Link>
            <Link to="/invitado/productos">
              <button type="button" class="btn btn-outline-light btn-lg px-4">
                Ver productos
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div class="container px-4 pt-5" id="hanging-icons">
        <h1 class="border-bottom pb-2">Características</h1>
        <div class="row g-4 pt-5 row-cols-1 row-cols-lg-3">
          <div class="col d-flex align-items-start">
            <div class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <i class="bi bi-truck"></i>
            </div>
            <div>
              <h3 class="fs-2 text-body-emphasis">Despacho a domicilio</h3>
              <p>
                Recibe tus productos directamente en la puerta de tu casa, de
                forma rápida, segura y confiable. Ofrecemos envíos a todo el
                país con seguimiento en tiempo real y opciones de entrega
                flexible para tu comodidad.
              </p>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <i class="bi bi-shop"></i>
            </div>
            <div>
              <h3 class="fs-2 text-body-emphasis">Retiro en tienda</h3>
              <p>
                Compra online y retira tu pedido en la tienda que elijas, sin
                costos de envío ni esperas. Te avisaremos cuando esté listo para
                que lo retires en el horario que más te convenga.
              </p>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <i class="bi bi-credit-card"></i>
            </div>
            <div>
              <h3 class="fs-2 text-body-emphasis">Diversos métodos de pago</h3>
              <p>
                Paga como prefieras: aceptamos tarjetas de crédito, débito y
                transferencias bancarias. Tu compra es 100% segura con nuestros
                sistemas de pago confiables y certificados.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="container px-4 py-5" id="custom-cards">
        <h2 class="pb-2 border-bottom">Categorías disponibles</h2>
        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">

          <div class="col">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg tools-card">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-white landing-card-title">
                  Herramientas manuales
                </h3>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg materials-card">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-white landing-card-title">
                  Materiales básicos
                </h3>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg security-card">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-white landing-card-title">
                  Equipos de seguridad
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container marketing">
        <h1 className="border-bottom pb-3 text-start">Marcas con las que trabajamos</h1>
        <div class="row">
          
          <div class="col-lg-4">
            <img src="/bosch.png" alt="logo" className="brand-logo" />
            <h2 class="fw-normal">Bosch</h2>
            <p>
              Empresa que desarrolla tecnología y servicios en áreas como electrodomésticos, 
              herramientas eléctricas, movilidad (automotriz), automatización industrial y soluciones energéticas.
            </p>
          </div>

          <div class="col-lg-4">
            <img src="/Makita.png" alt="logo" className="brand-logo" />
            <h2 class="fw-normal">Makita</h2>
            <p>
              Empresa japonesa especializada en la fabricación de herramientas eléctricas, inalámbricas y a gasolina.
              Es reconocida por su durabilidad, rendimiento e innovación en equipos para la construcción, carpintería y jardinería.
            </p>
          </div>

          <div class="col-lg-4">
            <img src="/Stanley.png" alt="logo" className="brand-logo stanley" />
            <h2 class="fw-normal">Stanley</h2>
            <p>
              Marca estadounidense reconocida por fabricar herramientas manuales, eléctricas y soluciones de almacenamiento. 
              Destacada por su durabilidad, precisión y presencia tanto en el ámbito profesional como doméstico.
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default InvitadoHome;
