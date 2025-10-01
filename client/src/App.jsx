import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './component/Navbar'
import Home from './pages/Home'
import Form from './formList/Form'
import BookingList from './pages/BookingList'
import Login from './component/Login'
import Layout from './component/Layout'
import AdminProtector from './middleware/AdminProtector'

const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={<AdminProtector compo={<Layout />} />}
        >
          <Route index element={<Home />} />
          <Route path='form' element={<Form />} />
          <Route path='Bookinglist' element={<BookingList />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter >

    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </>

}

export default App
