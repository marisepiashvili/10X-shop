import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import CartProvider from './components/cart/CartProvider.tsx'
import AuthProvider from './components/auth/AuthProvider.tsx'
import ToastProvider from './components/ui/ToastProvider.tsx'
import ThemeProvider from './components/theme/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
    <ToastProvider>
    <AuthProvider>
       <CartProvider>
      <App /> 
    </CartProvider>
    </AuthProvider>
    </ToastProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
