import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import PLP from './pages/PLP'
import PDP from './pages/PDP'
import Cart from './pages/Cart'
import Stores from './pages/Stores'

// Importa los estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PLP />} />
          <Route path="/product/:id" element={<PDP />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)