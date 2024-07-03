import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from '@/components/index'
import { MainPageComponent } from '@/constants/Imports'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<MainPageComponent />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
