import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { formatPrice } from "../../utils/price"
import type { CartItem } from "./cart"
import type { CartContextValue } from "./CartContext"
import { FREE_SHIPPING_FROM, PROMO_PERCENT, getUnitPrice } from "./cartTotals"

type CartReceiptProps = {
  items: CartItem[]
  promoCode: string | null
  totals: CartContextValue["totals"]
}

export default function CartReceipt({ items, promoCode, totals }: CartReceiptProps) {
  const today = new Date().toLocaleDateString("en-US")

  return (
    <aside aria-label="Order summary" className="flex-[1_1_360px] max-w-105 flex flex-col gap-6.5 pt-2.5">
      <div className="relative rotate-[1.5deg] drop-shadow-[0_16px_24px_rgba(17,17,17,0.22)]">
        <div className="bg-white px-7 pt-7.5 pb-5 flex flex-col gap-2.5 font-mono text-sm">
          <div className="text-center flex flex-col gap-1">
            <span className="font-display text-2xl">10X SHOP</span>
            <span className="text-[11px]">ORDER SUMMARY · {today}</span>
          </div>

          <span className="block border-t-2 border-dashed border-ink my-1.5" />

          <ul className="flex flex-col gap-2.5">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span className="truncate uppercase">{item.title} ×{item.quantity}</span>
                <span>{(getUnitPrice(item) * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <span className="block border-t-2 border-dashed border-ink my-1.5" />

          <dl className="flex flex-col gap-2.5">
            <div className="flex justify-between">
              <dt>SUBTOTAL</dt>
              <dd>{totals.subtotal.toFixed(2)}</dd>
            </div>
            {promoCode && (
              <div className="flex justify-between font-bold text-blue">
                <dt>CODE {promoCode} −{PROMO_PERCENT}%</dt>
                <dd>−{totals.discount.toFixed(2)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt>SHIPPING (≥${FREE_SHIPPING_FROM})</dt>
              <dd>{totals.shipping === 0 ? "FREE" : totals.shipping.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between pt-1 text-[22px] font-bold">
              <dt>TOTAL</dt>
              <dd>{formatPrice(totals.total)}</dd>
            </div>
          </dl>

          <span aria-hidden="true" className="block barcode mt-2" />
          <span className="text-center text-[11px] tracking-[0.2em]">FREE SHIPPING FROM {formatPrice(FREE_SHIPPING_FROM)}</span>
        </div>
        <div aria-hidden="true" className="zigzag-bottom" />

        <span aria-hidden="true" className="absolute -left-4 -top-3 w-21.5 h-7 bg-yellow/85 -rotate-[24deg]" />
        <span aria-hidden="true" className="absolute -right-4 -top-2.5 w-21.5 h-7 bg-pink/85 rotate-[22deg]" />
        {promoCode && (
          <span aria-hidden="true" className="hidden lg:grid absolute -left-21.5 top-59 w-24 h-24 rounded-full bg-orange text-white border-4 border-white place-items-center font-display text-xl leading-none -rotate-14 shadow-sticker">
            −{PROMO_PERCENT}%
          </span>
        )}
      </div>

      <Link
        to="/checkout"
        className="flex items-center justify-center gap-2.5 h-15 px-7.5 rounded-full bg-orange text-white border-4 border-white text-lg font-extrabold shadow-sticker transition hover:-translate-y-0.5"
      >
        Proceed to checkout <ArrowRight size={20} strokeWidth={2.4} />
      </Link>
    </aside>
  )
}
