import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div class="container footer"> 
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"> 
        <div class="col-md-4 d-flex align-items-center"> 
          <Link to="#" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1" aria-label="Bootstrap"> 
          <i class="bi bi-wrench"></i>
          </Link> 
            <span class="mb-3 mb-md-0 text-body-secondary">© 2025 Ferremas, Inc</span> 
        </div> 
        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex"> 
          <li class="ms-3">
            <Link class="text-body-secondary" to="#" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </Link>
          </li> 
          <li class="ms-3">
            <Link class="text-body-secondary" to="#" aria-label="Facebook">
              <i class="bi bi-facebook"></i>
            </Link>
          </li> 
        </ul> 
      </footer>
    </div>
  )
}

export default Footer