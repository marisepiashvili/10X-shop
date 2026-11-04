import { Trash } from "lucide-react"
import { Link } from "react-router"
import { formatPrice } from "../../utils/price"
import QuantityStepper from "../product/QuantityStepper"
import type { CartItem } from "../../types/cart"
import { Cart } from "../../models/Cart"

const imageBgColors = ["bg-pink", "bg-sky", "bg-yellow", "bg-mint"]
const rowTilts = ["-rotate-[0.6deg]", "rotate-[0.5deg]", "-rotate-[0.3deg]"]

type CartItemRowProps = {
  item: CartItem
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export default function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const unitPrice = Cart.unitPrice(item)
  const bgColor = imageBgColors[item.id % imageBgColors.length]
  const tilt = rowTilts[item.id % rowTilts.length]

  return (
    <li className={`flex flex-wrap items-center gap-3 md:gap-5 py-3 pl-3 pr-3 md:pr-5 bg-card rounded-card shadow-card ${tilt}`}>
      <Link to={`/products/${item.id}`} className={`shrink-0 w-20 h-20 md:w-26 md:h-26 rounded-2xl md:rounded-[20px] ${bgColor}`}>
        <img src={item.thumbnail} alt={item.title} width={104} height={104} loading="lazy" className="w-full h-full object-contain p-2" />
      </Link>

      <div className="flex-[1_1_160px] min-w-0 flex flex-col gap-1">
        <Link to={`/products/${item.id}`} className="inline-block py-2 -my-2 text-base md:text-xl leading-tight font-extrabold hover:text-accent">{item.title}</Link>
        <span className="text-sm font-semibold">{formatPrice(unitPrice)} each</span>
      </div>

      <QuantityStepper value={item.quantity} max={item.stock} onChange={onQuantityChange} />

      <span className="max-md:flex-1 md:w-29 text-right font-display text-xl md:text-[22px]">{formatPrice(unitPrice * item.quantity)}</span>

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${item.title} from cart`}
        className="shrink-0 w-12 h-12 rounded-full bg-pink grid place-items-center transition hover:-translate-y-0.5"
      >
        <Trash size={18} />
      </button>
    </li>
  )
}
