
import { Route, Routes } from "react-router"
import Layout from "./components/layout/Layout"
import CatalogPage from "./pages/CatalogPage"
import NotFoundPage from "./pages/NotFoundPage"
// import ProductPage from "./pages/ProductPage"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CatalogPage />} />
        {/* <Route path="products/:id" element={<ProductPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

