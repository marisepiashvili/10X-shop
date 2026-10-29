import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"
import Receipt from "../components/cart/Receipt"
import { getOrderById } from "../components/orders/orderStorage"
import MessagePanel from "../components/ui/MessagePanel"
import StatusTimeline from "../components/orders/StatusTimeline"

export default function OrderDetailPage() {
  const { orderId } = useParams()
  const order = orderId ? getOrderById(orderId) : null

  if (!order) {
    return (
      <div className="w-full px-4 py-20 flex flex-col items-center gap-6">
        <MessagePanel variant="empty" title="Order not found" note="check your orders" />
        <Link to="/orders" className="font-extrabold underline hover:text-blue">All orders</Link>
      </div>
    )
  }

  const date = new Date(order.createdAt).toLocaleDateString("en-US")

  return (
    <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-6 pb-24 flex flex-col gap-10">
      <Link to="/orders" className="self-start flex items-center gap-2 h-11 font-extrabold hover:text-blue">
        <ArrowLeft size={20} strokeWidth={2.4} /> All orders
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2">
          <span className="self-start font-note text-3xl text-blue -rotate-3">placed on {date}</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95]">
            Order <span className="font-mono font-bold text-4xl md:text-[56px] tracking-tight">#{order.id}</span>
          </h1>
        </div>
      </div>
        <StatusTimeline order={order}/>
      <div className="flex flex-wrap items-start gap-12">
        <section aria-label="Items" className="flex-[999_1_560px] min-w-0 flex flex-col gap-7">
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
