import { ArrowLeft } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router"
import Receipt from "../components/cart/Receipt"
import { getOrderById } from "../components/orders/orderStorage"
import StatusTimeline from "../components/orders/StatusTimeline"
import OrderItemsTable from "../components/orders/OrderItemsTable"
import ShipToNote from "../components/orders/ShipToNote"
import useCart from "../hooks/useCart"
import useNow from "../hooks/useNow"
import useToast from "../hooks/useToast"
import NotFoundPage from "./NotFoundPage"

const STATUS_REFRESH = 30_000


export default function OrderDetailPage() {
  const { orderId } = useParams()
  const order = orderId ? getOrderById(orderId) : null
  const now = useNow(STATUS_REFRESH)
  const { addItem } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  if (!order) return <NotFoundPage />


  const date = new Date(order.createdAt).toLocaleDateString("en-US")
  const items = order.items

  function handleReorder() {
    // addItem refuses lines that would go over the stock
    const addedCount = items.filter((item) => addItem(item, item.quantity)).length
    if (addedCount === 0) {
      showToast("These items are out of stock", "error")
      return
    }
    showToast("Items added to cart ✓")
    navigate("/cart")
  }

  return (
    <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-6 pb-24 flex flex-col gap-10">
      <Link to="/orders" className="self-start flex items-center gap-2 h-11 font-extrabold hover:text-accent">
        <ArrowLeft size={20} strokeWidth={2.4} /> All orders
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2">
          <span className="self-start font-note text-3xl text-accent -rotate-3">placed on {date}</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95]">
            Order <span className="font-mono font-bold text-4xl md:text-[56px] tracking-tight">#{order.id}</span>
          </h1>
        </div>
        <button
          type="button"
          onClick={handleReorder}
          className="h-12 px-7 rounded-full bg-coal text-white text-[17px] font-extrabold transition hover:bg-blue"
        >
          Reorder
        </button>
      </div>
      <StatusTimeline order={order} now={now} />
      <div className="flex flex-wrap items-start gap-12">
        <section aria-label="Items" className="flex-[999_1_560px] min-w-0 flex flex-col gap-7">
            <OrderItemsTable items={order.items} />
            <ShipToNote shipping={order.shipping} />

        </section>

        <aside aria-label="Totals" className="flex-[1_1_320px] max-w-95">
          <Receipt
            title="10X SHOP"
            subtitle={`ORDER #${order.id} · ${date}`}
            footer="THANK YOU · COME AGAIN"
            items={order.items}
            promoCode={order.promoCode}
            totals={order.totals}
          />
        </aside>
      </div>
    </div>
  )
}
