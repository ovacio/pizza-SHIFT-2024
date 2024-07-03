import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes } from 'react-router-dom'
import Header from './components/Header/header'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Header>
    </Header>
    </BrowserRouter>
  </React.StrictMode>,
)
