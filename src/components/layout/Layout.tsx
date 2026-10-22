import { Outlet } from "react-router"
import Footer from "./Footer"
import Header from "./Header"
import ScrollToTop from "./ScrollToTop"

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-1 bg-[#e2f5f1] bg-[radial-gradient(#12424A33_1.5px,transparent_1.5px)] bg-size-[22px_22px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
