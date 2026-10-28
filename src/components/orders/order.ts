import type { CartItem } from "../cart/cart"
import type { CartTotals } from "../cart/cartTotals"
import type { ShippingInfo } from "../checkout/checkoutSchema"

export type Order = {
  id: string
  createdAt: string
  items: CartItem[]
  promoCode: string | null
  totals: CartTotals
  shipping: ShippingInfo
}
