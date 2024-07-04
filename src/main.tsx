import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage, Header, AuthProvider, Login, UserProfile, Basket, InformationOrderList, CardPaymentInfo, CartProvider } from '@/constants/imports'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
    <Header />
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<Login onClose={() => {}} />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/information_order" element={<InformationOrderList />} />
      <Route path="/payment_info" element={<CardPaymentInfo />} />
    </Routes>
    </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
