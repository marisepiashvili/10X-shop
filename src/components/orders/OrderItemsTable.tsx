import { Link } from "react-router"
import { formatPrice } from "../../utils/price"
import type { CartItem } from "../../types/cart"
import { Cart } from "../../models/Cart"

const imageBgColors = ["bg-pink", "bg-sky", "bg-yellow", "bg-mint"]

export default function OrderItemsTable({ items }: { items: CartItem[] }) {
  return (
    <div className="bg-card rounded-card shadow-card p-1.5 sm:p-3 sm:pr-6 overflow-x-auto">
      <table className="w-full sm:min-w-120 border-collapse">
        <thead>
          <tr className="text-left text-[13px] font-extrabold">
            <th scope="col" className="p-2 sm:p-3">Product</th>
            <th scope="col" className="p-2 sm:p-3 text-right">Qty</th>
            <th scope="col" className="max-sm:hidden p-3 text-right">Unit price</th>
            <th scope="col" className="p-2 sm:p-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const unitPrice = Cart.unitPrice(item)
            return (
              <tr key={item.id}>
                <td className="px-2 sm:px-3 py-2">
                  <div className="flex items-center gap-2.5 sm:gap-4">
                    <div className={`w-12 h-12 sm:w-20 sm:h-20 shrink-0 rounded-xl sm:rounded-[18px] ${imageBgColors[item.id % imageBgColors.length]}`}>
                      <img src={item.thumbnail} alt="" width={80} height={80} loading="lazy" className="w-full h-full object-contain p-1 sm:p-2" />
                    </div>
                    <Link to={`/products/${item.id}`} className="text-sm sm:text-lg leading-tight font-extrabold hover:text-accent">{item.title}</Link>
                  </div>
                </td>
                <td className="px-2 sm:px-3 py-2 text-right font-extrabold">{item.quantity}</td>
                <td className="max-sm:hidden px-3 py-2 text-right font-semibold">{formatPrice(unitPrice)}</td>
                <td className="px-2 sm:px-3 py-2 text-right font-display text-base sm:text-xl whitespace-nowrap">{formatPrice(unitPrice * item.quantity)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
