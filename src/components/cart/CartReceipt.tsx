import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { formatPrice } from "../../utils/price"
import type { CartItem } from "./cart"
import { FREE_SHIPPING_FROM, PROMO_PERCENT, type CartTotals } from "./cartTotals"
import Receipt from "./Receipt"

type CartReceiptProps = {
  items: CartItem[]
  promoCode: string | null
  totals: CartTotals
}

export default function CartReceipt({ items, promoCode, totals }: CartReceiptProps) {
  const today = new Date().toLocaleDateString("en-US")

  return (
    <aside aria-label="Order summary" className="flex-[1_1_360px] max-w-105 flex flex-col gap-6.5 pt-2.5">
      <Receipt
        title="10X SHOP"
        subtitle={`ORDER SUMMARY · ${today}`}
        footer={`FREE SHIPPING FROM ${formatPrice(FREE_SHIPPING_FROM)}`}
        items={items}
        promoCode={promoCode}
        totals={totals}
      >
        {promoCode && (
          <span aria-hidden="true" className="hidden lg:grid absolute -left-21.5 top-59 w-24 h-24 rounded-full bg-orange text-white border-4 border-white place-items-center font-display text-xl leading-none -rotate-14 shadow-sticker">
            −{PROMO_PERCENT}%
          </span>
        )}
      </Receipt>

      <Link
        to="/checkout"
        className="flex items-center justify-center gap-2.5 h-15 px-7.5 rounded-full bg-orange text-white border-4 border-white text-lg font-extrabold shadow-sticker transition hover:-translate-y-0.5"
      >
        Proceed to checkout <ArrowRight size={20} strokeWidth={2.4} />
      </Link>
    </aside>
  )
}
