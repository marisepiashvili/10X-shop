import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import CartProvider from './components/cart/CartProvider.tsx'
import AuthProvider from './components/auth/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
       <CartProvider>
      <App /> 
    </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
