import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.scss'
import CartProvider from "./store/CartProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>
)
