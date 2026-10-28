import { formatPrice } from "../../utils/price"
import type { CartItem } from "./cart"
import { FREE_SHIPPING_FROM, PROMO_PERCENT, getUnitPrice, type CartTotals } from "./cartTotals"

type ReceiptProps = {
  title: string
  subtitle: string
  footer: string
  items: CartItem[]
  promoCode: string | null
  totals: CartTotals
  tilt?: string
  children?: React.ReactNode
}

export default function Receipt({ title, subtitle, footer, items, promoCode, totals, tilt = "rotate-[1.5deg]", children }: ReceiptProps) {
  return (
    <div className={`relative drop-shadow-[0_16px_24px_rgba(17,17,17,0.22)] ${tilt}`}>
      <div className="bg-white px-7 pt-7.5 pb-5 flex flex-col gap-2.5 font-mono text-sm text-ink">
        <div className="text-center flex flex-col gap-1">
          <span className="font-display text-2xl">{title}</span>
          <span className="text-[11px]">{subtitle}</span>
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
        <span className="text-center text-[11px] tracking-[0.2em]">{footer}</span>
      </div>
      <div aria-hidden="true" className="zigzag-bottom" />

      <span aria-hidden="true" className="absolute -left-4 -top-3 w-21.5 h-7 bg-yellow/85 rotate-24" />
      <span aria-hidden="true" className="absolute -right-4 -top-2.5 w-21.5 h-7 bg-pink/85 rotate-22" />
      {children}
    </div>
  )
}
