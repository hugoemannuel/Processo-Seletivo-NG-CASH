import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserProvider from './context/UserProvider'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Home from './pages/home/Home'


const App: React.FC = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
