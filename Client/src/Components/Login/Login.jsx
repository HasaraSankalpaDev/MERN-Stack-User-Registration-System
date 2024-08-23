import React from 'react'
import Nav from '../Nav/Nav'


function Login() {
  return (
    <div>
      <Nav />
      <div className="container">
        <h3 className='mt-5'>User Login Page</h3>
        <form className='mt-5'>

          <div className="mb-3 w-50">
            <label for="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control rounded-0 border-0 outline-0 py-2" id="exampleFormControlInput1" placeholder="Enter Your Email Address" />
          </div>
          <div className="mb-3 w-50">
            <label for="exampleFormControlInput1" className="form-label">Password</label>
            <input type="password" className="form-control rounded-0 border-0 outline-0 py-2" id="exampleFormControlInput1" placeholder="Enter Your Password" />
          </div>
          <div className='w-50'>
            <button className='btn btn-light w-100 rounded-0 outline-0 border-0 text-white py-2 mt-2' >Log In</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login