import useAuth from "../../hooks/useAuth"
import useCart from "../../hooks/useCart"
import { clearOrders } from "../orders/orderStorage"

export default function LocalDataCard({ onCleared }: { onCleared: () => void }) {
  const { logout } = useAuth()
  const { clearCart } = useCart()

  function handleClear() {
    if (!window.confirm("Delete your cart and orders from this browser?")) return
    clearCart()
    clearOrders()
    onCleared()
  }

  return (
    <section className="p-7 flex flex-col gap-3.5 bg-white rounded-[30px] shadow-card -rotate-[0.6deg]">
      <h2 className="font-display text-2xl">Local data</h2>
      <p className="text-[15px] leading-normal">
        Clearing removes your cart and orders from this browser. You stay logged in.
      </p>
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={handleClear}
          className="h-12 px-7 rounded-full bg-danger text-white text-[17px] font-extrabold transition hover:-translate-y-0.5"
        >
          Clear local data
        </button>
        <button
          type="button"
          onClick={logout}
          className="h-12 px-7 rounded-full border-2 border-dashed border-ink text-[17px] font-extrabold transition hover:bg-paper"
        >
          Log out
        </button>
      </div>
    </section>
  )
}
