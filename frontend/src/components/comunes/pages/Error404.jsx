import { Link } from 'react-router-dom';
import './Error404.css'

const Error404 = () => {
  return (
    <main className='d-flex align-items-center py-4 login-main page404'>
      <div className='form-signin w-100 m-auto container'>
        <form>
          <img class="mb-5" src="/404.png" alt="" width="72" height="57"></img>
            <h1 className='h3 fw-bold'>Página no encontrada</h1>
            <Link to="/">
              <button className="btn w-100 py-2 btn-warning">Volver a Ferremas</button>
            </Link>
        </form>
        </div>
    </main>
  )
}

export default Error404