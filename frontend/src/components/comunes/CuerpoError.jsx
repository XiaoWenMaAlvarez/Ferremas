
const CuerpoError = ({children}) => {
  return (
    <main className='d-flex align-items-center py-4 login-main'>
      <div className='form-signin w-100 m-auto container'>
          <img class="mb-5" src="/logo.png" alt="" width="72" height="57"></img>
            <h1 className='h3 fw-bold'>{children}</h1>
        </div>
    </main>
  )
}

export default CuerpoError