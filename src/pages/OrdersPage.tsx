import { Link } from "react-router"
import { readOrders } from "../components/orders/orderStorage"
import OrderRow from "../components/orders/OrderRow"

export default function OrdersPage() {
  const orders = readOrders().toReversed()

  return (
    <div className="w-full max-w-280 mx-auto px-4 md:px-10 pt-10 pb-24 flex flex-col gap-9">
      <div className="flex flex-col gap-2">
        {orders.length > 0 && (
          <span className="self-start font-note text-3xl text-blue -rotate-3">{orders.length} so far — keep 'em coming</span>
        )}
        <h1 className="font-display text-6xl md:text-[84px] leading-[0.95]">Your orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="self-center w-full max-w-140 px-8 py-16 flex flex-col items-center gap-4.5 text-center bg-sky border-[6px] border-white rounded-[40px] shadow-[0_18px_34px_rgba(17,17,17,0.18)] rotate-[1.5deg]">
          <p className="font-display text-4xl leading-none">You have no orders yet</p>
          <span className="font-note text-[28px]">your first receipt is waiting</span>
          <Link to="/catalog" className="flex items-center h-14 px-7 rounded-full bg-ink text-white text-[17px] font-extrabold transition hover:bg-blue">
            Browse products
          </Link>
        </div>
      ) : (
      <><ul className="flex flex-col gap-5.5">
            {orders.map((order, index) => (
                <OrderRow key={order.id} order={order} index={index}/>
            ))}
      </ul>
                <p className="flex flex-wrap items-center gap-3 text-[15px] font-semibold">
            <span className="font-note text-[26px] text-blue">psst —</span>
            statuses update by themselves: Processing for the first minute, then Shipped, then Delivered after 3 minutes.
          </p>

      </>
      )}
    </div>
  )
}
