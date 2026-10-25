import { createContext } from "react"
import type { Product } from "../product/product"
import type { CartItem } from "./cart"
import type { getCartTotals } from "./cartTotals"

export type CartContextValue = {
  items: CartItem[]
  promoCode: string | null
  totals: ReturnType<typeof getCartTotals>
  addItem: (product: Product, quantity: number) => void
  removeItem: (id: number) => void
  setQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  applyPromo: (code: string) => void
  removePromo: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
