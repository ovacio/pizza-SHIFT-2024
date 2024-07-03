import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage, Header } from '@/constants/imports'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<MainPage />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
