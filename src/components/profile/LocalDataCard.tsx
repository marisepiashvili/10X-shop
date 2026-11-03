import { startTransition } from "react"
import { useNavigate } from "react-router"
import useAuth from "../../hooks/useAuth"
import useCart from "../../hooks/useCart"
import { clearOrders } from "../orders/orderStorage"
import { clearReviews } from "../product/reviewStorage"

export default function LocalDataCard({ onCleared }: { onCleared: () => void }) {
  const { logout } = useAuth()
  const { clearCart } = useCart()
  const navigate = useNavigate()

  function handleLogout() {
    // one transition for both, so a protected page never renders logged out and sends you to /login
    startTransition(() => {
      navigate("/")
      logout()
    })
  }

  function handleClear() {
    if (!window.confirm("Delete your cart, orders and reviews from this browser?")) return
    clearCart()
    clearOrders()
    clearReviews()
    onCleared()
  }

  return (
    <section className="p-7 flex flex-col gap-3.5 bg-card rounded-[30px] shadow-card -rotate-[0.6deg]">
      <h2 className="font-display text-2xl">Local data</h2>
      <p className="text-[15px] leading-normal">
        Clearing removes your cart, orders and reviews from this browser. You stay logged in.
      </p>
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={handleClear}
          className="h-12 px-7 rounded-full bg-danger text-white dark:text-coal text-[17px] font-extrabold transition hover:-translate-y-0.5"
        >
          Clear local data
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="h-12 px-7 rounded-full border-2 border-dashed border-ink text-[17px] font-extrabold transition hover:bg-paper"
        >
          Log out
        </button>
      </div>
    </section>
  )
}
