import { Suspense } from "react"
import { Outlet, useLocation } from "react-router"
import Footer from "./Footer"
import Header from "./Header"
import ScrollToTop from "./ScrollToTop"
import ErrorBoundary from "../ui/ErrorBoundary"
import LoadingState from "../ui/LoadingState"


export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="flex flex-col min-h-screen overflow-x-clip">
      <ScrollToTop />
      <Header />
      <main className="flex-1 flex flex-col min-h-screen">
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<LoadingState />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
