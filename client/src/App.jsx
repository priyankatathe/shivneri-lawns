import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import { Form } from 'formik'

const App = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/Bookinglist' element={<BookingList />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
