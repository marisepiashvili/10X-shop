import { Link, useParams } from "react-router"
import Receipt from "../components/cart/Receipt"
import { getOrderById } from "../components/orders/orderStorage"
import MessagePanel from "../components/ui/MessagePanel"

export default function ConfirmationPage() {
  const { orderId } = useParams()
  const order = orderId ? getOrderById(orderId) : null

  if (!order) {
    return (
      <div className="w-full px-4 py-20">
        <MessagePanel variant="empty" title="Order not found" note="check your orders" />
      </div>
    )
  }

  const { fullName, address, city } = order.shipping
  const date = new Date(order.createdAt).toLocaleDateString("en-US")

  return (
    <div className="flex-1 bg-blue text-white">
      <div className="max-w-330 mx-auto px-4 md:px-10 pt-18 pb-24 flex flex-wrap items-center justify-center gap-16">
        <div className="flex-[1_1_440px] max-w-140 flex flex-col gap-5.5">
          <span className="self-start font-note text-[34px] text-yellow -rotate-3">woohoo! ✶</span>
          <h1 className="font-display text-6xl md:text-[112px] leading-[0.92]">Thank you!</h1>
          <p className="text-[22px] leading-normal">
            Your order has been placed. We'll ship to {fullName}, {address}, {city}.
          </p>
          <p>A copy of the order is saved on this device.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/catalog"
              className="flex items-center h-15 px-7.5 rounded-full bg-orange border-4 border-white text-lg font-extrabold shadow-sticker transition hover:-translate-y-0.5"
            >
              Continue shopping
            </Link>
            <Link
              to="/orders"
              className="flex items-center h-15 px-6 rounded-full bg-white text-ink font-extrabold shadow-soft transition hover:-translate-y-0.5"
            >
              View my orders
            </Link>
          </div>
        </div>

        <div className="relative flex-[0_1_360px] min-w-0">
          <Receipt
            title="10X SHOP"
            subtitle={`ORDER #${order.id} · ${date}`}
            footer="THANK YOU · COME AGAIN"
            items={order.items}
            promoCode={order.promoCode}
            totals={order.totals}
            tilt="rotate-3"
          >
            <span aria-hidden="true" className="absolute -right-6 -bottom-14 w-31 h-31 rounded-full bg-mint text-ink border-[5px] border-white grid place-items-center text-center font-display text-[22px] leading-none -rotate-16 shadow-sticker">
              ORDER<br />PLACED
            </span>
          </Receipt>
        </div>
      </div>
    </div>
  )
}
