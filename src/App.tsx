
import { Route, Routes } from "react-router"
import Layout from "./components/layout/Layout"
import CatalogPage from "./pages/CatalogPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProductPage from "./pages/ProductPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CartPage from "./pages/CartPage"
import HomePage from "./pages/HomePage"
import CheckoutPage from "./pages/CheckoutPage"
import ConfirmationPage from "./pages/ConfirmationPage"
import OrdersPage from "./pages/OrdersPage"
import OrderDetailPage from "./pages/OrderDetailPage"



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="products/:id" element={<ProductPage/>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="confirmation/:orderId" element={<ConfirmationPage />} />
        <Route path="orders" element={<OrdersPage/>}/>
        <Route path="orders/:orderId" element={<OrderDetailPage/>}/>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

