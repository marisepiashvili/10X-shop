import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { Link, Navigate } from "react-router"
import Receipt from "../components/cart/Receipt"
import CheckoutForm from "../components/checkout/CheckoutForm"
import type { ShippingInfo } from "../components/checkout/checkoutSchema"
import { saveOrder } from "../components/orders/orderStorage"
import useCart from "../hooks/useCart"
import { formatPrice } from "../utils/price"

export default function CheckoutPage() {
  const { items, promoCode, totals, clearCart } = useCart()
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null)

  if (placedOrderId) {
    return <Navigate to={`/confirmation/${placedOrderId}`} replace />
  }
  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  function handlePlaceOrder(values: ShippingInfo) {
    const order = saveOrder({
      items,
      promoCode,
      totals,
      shipping: {
        fullName: values.fullName.trim(),
        email: values.email.trim().toLowerCase(),
        address: values.address.trim(),
        city: values.city.trim(),
      },
    })
    setPlacedOrderId(order.id)
    clearCart()
  }

  const today = new Date().toLocaleDateString("en-US")

  return (
    <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-6 pb-24 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Link to="/cart" className="self-start flex items-center gap-2 h-11 font-extrabold hover:text-blue">
          <ArrowLeft size={20} strokeWidth={2.4} /> Back to cart
        </Link>
        <span className="self-start font-note text-3xl text-blue -rotate-3">almost yours!</span>
        <h1 className="font-display text-6xl md:text-[84px] leading-[0.95]">Checkout</h1>
      </div>

      <div className="flex flex-wrap items-start gap-14">
        <CheckoutForm totalText={formatPrice(totals.total)} onSubmit={handlePlaceOrder} />

        <aside aria-label="Order summary" className="flex-[1_1_340px] max-w-100 pt-3.5">
          <Receipt
            title="YOUR ORDER"
            subtitle={`${totals.itemCount} ITEMS · ${today}`}
            footer="NO PAYMENT · DEMO STORE"
            items={items}
            promoCode={promoCode}
            totals={totals}
            tilt="-rotate-[1.5deg]"
          />
          {totals.discount > 0 && (
            <p className="mt-6.5 ml-6 font-note text-[28px] text-blue -rotate-3">
              you saved {formatPrice(totals.discount)} ✶
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}
