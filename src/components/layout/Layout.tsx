import { Outlet, useLocation  } from "react-router"
import Footer from "./Footer"
import Header from "./Header"
import ScrollToTop from "./ScrollToTop"
import ErrorBoundary from "../ui/ErrorBoundary"


export default function Layout() {
   const { pathname } = useLocation()
  return (
    <div className="flex flex-col min-h-screen overflow-x-clip">
      <ScrollToTop />
      <Header />
      <main className="flex-1 flex flex-col">
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
