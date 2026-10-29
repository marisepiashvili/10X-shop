import { STATUS_COLORS, type OrderStatus } from "./orderStatus";



export default function StatusPill({status} : {status: OrderStatus}) {
  return (
   <span className={`px-4 py-1.5 rounded-full text-sm font-extrabold -rotate-3 ${STATUS_COLORS[status]}`}>
    {status}
   </span>
  )
}
