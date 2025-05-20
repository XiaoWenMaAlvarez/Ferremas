import "./Contacto.css";

const Contacto = () => {
  return (
    <>
      <div class="px-4 py-5 mb-5 text-center contact-hero-banner border-top border-black">
        <img
          class="d-block mx-auto mb-4"
          src="/logo.png"
          alt=""
        />
        <h1 class="display-5 fw-bold text-body-emphasis mb-3">Contáctenos</h1>
        <div class="col-lg-6 mx-auto">
          
          <p class="lead mb-4">
            En Ferremas, la atención al cliente no es solo un valor agregado: es parte esencial del servicio. Muchas veces, los clientes llegan con dudas técnicas o necesidades específicas, y una atención clara, paciente y bien informada marca la diferencia entre una compra acertada y una experiencia frustrante. Escuchar, asesorar y acompañar al cliente con amabilidad fortalece la confianza, fideliza y convierte una venta puntual en una relación duradera.
          </p>
        </div>
      </div>

      <div className="container marketing contact-section">
        <h1 className="border-bottom py-3 text-start">Redes sociales</h1>
        <div class="row">
          <div class="col-lg-4">
            <img src="/wsp.png" alt="logo" className="brand-logo" />
            <h2 class="fw-normal">WhatsApp</h2>
            <p>
              +569 1234 5678 <br />
              Horario de atención: <br />
              Lunes a Viernes desde las 10:00 hasta las 18:00 <br />
              Sábado y domingo desde las 10:00 hasta las 14:00
            </p>
          </div>

          <div class="col-lg-4">
            <img src="/instagram.jpeg" alt="logo" className="brand-logo" />
            <h2 class="fw-normal">Instagram</h2>
            <p>
              @ferremas36
              <br />
              Horario de atención: <br />
              Las 24 horas al día <br />
              Los 7 días de la semana
            </p>
          </div>

          <div class="col-lg-4">
            <img src="/gmail.webp" alt="logo" className="brand-logo stanley" />
            <h2 class="fw-normal">Email</h2>
            <p>
              ferremas36@gmail.com
              <br />
              Horario de atención: <br />
              Lunes a Viernes desde las 10:00 hasta las 18:00 <br />
              Sábado y domingo desde las 10:00 hasta las 14:00
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacto;
