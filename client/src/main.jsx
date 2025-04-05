import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import App from './App.jsx'
import Audit from './Audit.jsx';
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/audit'  element={<Audit />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
