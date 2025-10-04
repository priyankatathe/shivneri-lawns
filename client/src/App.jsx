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
import ForgotPassword from './component/ForgotPassword'
import ResetPassword from './component/ResetPassword'
import Bill from './pages/Bill'

const App = () => {
  return <>
    <BrowserRouter>
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
      <Routes>
        <Route path="/"
          element={<AdminProtector compo={<Layout />} />}
        >
          <Route index element={<Home />} />
          <Route path='form' element={<Form />} />
          <Route path='Bookinglist' element={<BookingList />} />
          <Route path='Bill' element={<Bill />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/reset' element={<ResetPassword />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter >


  </>

}

export default App
