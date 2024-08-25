import React from 'react'
import Nav from './Components/Nav/Nav'
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home'
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Contact from './Components/Contact/Contact';
import Gallery from './Components/Gallery/Gallery';
import AdminPage from './Components/AdminPage/AdminPage';

function App() {
  return (
    <div>

      <React.Fragment>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </React.Fragment>

    </div>
  )
}

export default App
