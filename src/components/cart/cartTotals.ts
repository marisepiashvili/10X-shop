import { getDiscountedPrice } from "../../utils/price"
import type { CartItem, CartState, CartTotals } from "../../types/cart"

export const PROMO_CODE = "10X10"
export const PROMO_PERCENT = 10
export const FREE_SHIPPING_FROM = 100
const SHIPPING_COST = 10

export function getUnitPrice(item: CartItem) {
  return getDiscountedPrice(item.price, item.discountPercentage)
}

export function getCartTotals({ items, promoCode }: CartState): CartTotals {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + getUnitPrice(item) * item.quantity, 0)
  const discount = promoCode ? (subtotal * PROMO_PERCENT) / 100 : 0
  const afterDiscount = subtotal - discount
  const shipping = itemCount === 0 || afterDiscount >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST

  return { itemCount, subtotal, discount, shipping, total: afterDiscount + shipping }
}


