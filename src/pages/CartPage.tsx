import { ShoppingBag } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import CartItemRow from "../components/cart/CartItemRow"
import CartReceipt from "../components/cart/CartReceipt"
import { PROMO_CODE } from "../components/cart/cartTotals"
import PromoCodeForm from "../components/cart/PromoCodeForm"
import useCart from "../hooks/useCart"

export default function CartPage() {
  const { items, promoCode, totals, setQuantity, removeItem, clearCart, applyPromo, removePromo } = useCart()
  const [promoInput, setPromoInput] = useState("")
  const [promoError, setPromoError] = useState("")

  const isEmpty = items.length === 0

  function handlePromoChange(value: string) {
    setPromoInput(value)
    setPromoError("")
  }

  function handleApplyPromo() {
    const code = promoInput.trim().toUpperCase()
    if (code !== PROMO_CODE) {
      setPromoError("Invalid promo code")
      return
    }
    applyPromo(code)
    setPromoInput("")
  }

  return (
    <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-10 pb-24 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        {!isEmpty && (
          <span className="self-start font-note text-3xl text-blue -rotate-3">
            {totals.itemCount} {totals.itemCount === 1 ? "item" : "items"} waiting for you ♥
          </span>
        )}
        <h1 className="font-display text-6xl md:text-[84px] leading-[0.95]">Your cart</h1>
      </div>

      {isEmpty ? (
        <div className="self-center w-full max-w-140 px-8 py-16 flex flex-col items-center gap-4.5 text-center bg-pink border-[6px] border-white rounded-[40px] shadow-[0_18px_34px_rgba(17,17,17,0.18)] rotate-[1.5deg]">
          <ShoppingBag size={56} strokeWidth={1.6} />
          <p className="font-display text-[40px] leading-none">Your cart is empty</p>
          <span className="font-note text-[28px]">let's fix that ↓</span>
          <Link to="/catalog" className="flex items-center h-14 px-7 rounded-full bg-ink text-white text-[17px] font-extrabold transition hover:bg-blue">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap items-start gap-12">
          <section aria-label="Cart items" className="flex-[999_1_560px] min-w-0 flex flex-col gap-4.5">
            <ul className="flex flex-col gap-4.5">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onQuantityChange={(quantity) => setQuantity(item.id, quantity)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </ul>
            <button
              type="button"
              onClick={clearCart}
              className="self-start h-11.5 px-5.5 rounded-full border-2 border-dashed border-ink text-[15px] font-extrabold transition hover:bg-white"
            >
              Clear cart
            </button>
            <PromoCodeForm
              value={promoInput}
              error={promoError}
              appliedCode={promoCode}
              onChange={handlePromoChange}
              onApply={handleApplyPromo}
              onRemove={removePromo}
            />
          </section>

          <CartReceipt items={items} promoCode={promoCode} totals={totals} />
        </div>
      )}
    </div>
  )
}
