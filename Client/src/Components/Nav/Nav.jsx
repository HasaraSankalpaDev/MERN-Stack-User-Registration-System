import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css';


function Nav() {
  return (
    <div><nav className="navbar navbar-expand-lg bg-white py-3">
      <div className="container">
        <a className="navbar-brand fw-600" href="#">MERN <span className='text-danger'>.</span></a>
        <button className="navbar-toggler border-0 outline-none shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav d-flex align-items-center ms-auto">
            <Link to="/home" className='text-dark text-decoration-none me-4 nav-link'>Home</Link>
            <Link to="/gallery" className='text-dark text-decoration-none me-4 nav-link'>Gallery</Link>
            <Link to="/contact" className='text-dark text-decoration-none me-4 nav-link'>Contact Us</Link>
            <Link to="/register" className='text-dark text-decoration-none me-4 '>
              <button className='btn btn-outline-primary py-2 px-4 rounded-5'>Register</button>
            </Link>
            <Link to="/login" className='text-dark text-decoration-none '>
              <button className='btn btn-outline-primary py-2 px-4 rounded-5'>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </nav></div>
  )
}

export default Nav