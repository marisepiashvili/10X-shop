import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { formatPrice } from "../../utils/price"
import { formatDate } from "../../utils/date"
import type { CartItem, CartTotals } from "../../types/cart"
import { FREE_SHIPPING_FROM } from "./cartTotals"
import Receipt from "./Receipt"

type CartReceiptProps = {
  items: CartItem[]
  promoCode: string | null
  totals: CartTotals
}

export default function CartReceipt({ items, promoCode, totals }: CartReceiptProps) {
  const today = formatDate(new Date().toISOString())

  return (
    <aside aria-label="Order summary" className="flex-[1_1_360px] max-w-105 flex flex-col gap-6.5 pt-2.5">
      <Receipt
        title="10X SHOP"
        subtitle={`ORDER SUMMARY · ${today}`}
        footer={`FREE SHIPPING FROM ${formatPrice(FREE_SHIPPING_FROM)}`}
        items={items}
        promoCode={promoCode}
        totals={totals}
      />

      <Link
        to="/checkout"
        className="flex items-center justify-center gap-2.5 h-15 px-7.5 rounded-full bg-orange text-white border-4 border-sticker text-lg font-extrabold shadow-sticker transition hover:-translate-y-0.5"
      >
        Proceed to checkout <ArrowRight size={20} strokeWidth={2.4} />
      </Link>
    </aside>
  )
}
