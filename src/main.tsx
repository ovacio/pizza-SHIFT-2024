import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage, Header, AuthProvider, Login, UserProfile } from '@/constants/imports'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Header />
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<Login onClose={() => {}} />} />
      <Route path='/profile' element={<UserProfile />} />
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
