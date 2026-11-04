
import { lazy } from "react"
import { Route, Routes } from "react-router"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Layout from "./components/layout/Layout"
import CatalogPage from "./pages/CatalogPage"
import HomePage from "./pages/HomePage"

const ProductPage = lazy(() => import("./pages/ProductPage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"))
const CartPage = lazy(() => import("./pages/CartPage"))
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"))
const ConfirmationPage = lazy(() => import("./pages/ConfirmationPage"))
const OrdersPage = lazy(() => import("./pages/OrdersPage"))
const OrderDetailPage = lazy(() => import("./pages/OrderDetailPage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="products/:id" element={<ProductPage/>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="confirmation/:orderId" element={<ConfirmationPage />} />
        <Route element={<ProtectedRoute />}>
           <Route path="checkout" element={<CheckoutPage />} />
           <Route path="profile" element={<ProfilePage/>}/>
           <Route path="orders" element={<OrdersPage/>}/>
           <Route path="orders/:orderId" element={<OrderDetailPage/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

