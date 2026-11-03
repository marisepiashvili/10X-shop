import { createContext } from "react"
import type { CartItem, CartProduct, CartTotals } from "../../types/cart"

export type CartContextValue = {
  items: CartItem[]
  promoCode: string | null
  totals: CartTotals
  // returns false when the cart would hold more than the stock
  addItem: (product: CartProduct, quantity: number) => boolean
  removeItem: (id: number) => void
  setQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  applyPromo: (code: string) => void
  removePromo: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
