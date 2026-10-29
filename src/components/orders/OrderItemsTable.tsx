import { Link } from "react-router"
import { formatPrice } from "../../utils/price"
import type { CartItem } from "../cart/cart"
import { getUnitPrice } from "../cart/cartTotals"

const imageBgColors = ["bg-pink", "bg-sky", "bg-yellow", "bg-mint"]

export default function OrderItemsTable({ items }: { items: CartItem[] }) {
  return (
    <div className="bg-white rounded-card shadow-card p-3 pr-6 overflow-x-auto">
      <table className="w-full min-w-120 border-collapse">
        <thead>
          <tr className="text-left text-[13px] font-extrabold">
            <th scope="col" className="p-3">Product</th>
            <th scope="col" className="p-3 text-right">Qty</th>
            <th scope="col" className="p-3 text-right">Unit price</th>
            <th scope="col" className="p-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const unitPrice = getUnitPrice(item)
            return (
              <tr key={item.id}>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-4">
                    <div className={`w-20 h-20 shrink-0 rounded-[18px] ${imageBgColors[item.id % imageBgColors.length]}`}>
                      <img src={item.thumbnail} alt="" width={80} height={80} loading="lazy" className="w-full h-full object-contain p-2" />
                    </div>
                    <Link to={`/products/${item.id}`} className="text-lg font-extrabold hover:text-blue">{item.title}</Link>
                  </div>
                </td>
                <td className="px-3 py-2 text-right font-extrabold">{item.quantity}</td>
                <td className="px-3 py-2 text-right font-semibold">{formatPrice(unitPrice)}</td>
                <td className="px-3 py-2 text-right font-display text-xl">{formatPrice(unitPrice * item.quantity)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
