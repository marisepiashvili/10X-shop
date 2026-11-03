import { isNumber, isRecord, isString } from "../../utils/guards"
import { isCartItem, type CartItem } from "../cart/cart"
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

function isTotals(value: unknown): value is CartTotals {
  return isRecord(value) && isNumber(value.itemCount) && isNumber(value.subtotal)
    && isNumber(value.discount) && isNumber(value.shipping) && isNumber(value.total)
}

function isShipping(value: unknown): value is ShippingInfo {
  return isRecord(value) && isString(value.fullName) && isString(value.email)
    && isString(value.address) && isString(value.city)
}

export function isOrder(value: unknown): value is Order {
  return isRecord(value) && isString(value.id) && isString(value.createdAt)
    && Array.isArray(value.items) && value.items.every(isCartItem)
    && (value.promoCode === null || isString(value.promoCode))
    && isTotals(value.totals) && isShipping(value.shipping)
}
