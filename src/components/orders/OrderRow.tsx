import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { formatPrice } from "../../utils/price";
import type { Order } from "./order";
import { getOrderStatus } from "./orderStatus"
import StatusPill from "./StatusPill"


const stubColors = ["bg-pink", "bg-sky", "bg-mint", "bg-yellow"]
const rowTilts = ["-rotate-[0.5deg]", "rotate-[0.4deg]", "-rotate-[0.3deg]"]

type OrderRowProps = {
    order: Order
    index: number
}



export default function OrderRow({order, index} : OrderRowProps) {
    const date = new Date(order.createdAt).toLocaleDateString("en-Us")
    const count = order.totals.itemCount
  return (
        <li className={`drop-shadow-[0_10px_18px_rgba(17,17,17,0.16)] ${rowTilts[index % rowTilts.length]}`}>
      <Link to={`/orders/${order.id}`} className="group flex min-h-28 transition hover:-translate-y-0.5">
        <div className={`w-28 sm:w-38 shrink-0 flex flex-col items-center justify-center gap-0.5 rounded-l-[22px] border-r-[3px] border-dashed border-paper font-mono ${stubColors[index % stubColors.length]}`}>
          <span className="text-[11px] font-semibold tracking-[0.14em]">ORDER</span>
          <span className="text-sm sm:text-[17px] font-bold">#{order.id}</span>
        </div>
        <div className="flex-1 min-w-0 flex flex-wrap items-center gap-x-6 gap-y-3 px-5 sm:px-6.5 py-4.5 bg-white rounded-r-[22px]">
          <div className="flex-[1_1_160px] flex flex-col gap-1">
            <span className="text-[19px] font-extrabold">{date}</span>
            <span className="text-[15px] font-semibold">{count} {count === 1 ? "item" : "items"}</span>
          </div>
          <StatusPill status={getOrderStatus(order)} />
          <span className="sm:min-w-32 sm:text-right font-display text-[26px]">{formatPrice(order.totals.total)}</span>
          <span className="hidden sm:grid w-11 h-11 rounded-full bg-ink text-white place-items-center transition group-hover:bg-blue">
            <ChevronRight size={20} strokeWidth={2.4} />
          </span>
        </div>
      </Link>
    </li>
  )
}
