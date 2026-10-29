import { createContext } from "react"
import type { CartItem, CartProduct} from "./cart"
import type { getCartTotals } from "./cartTotals"

export type CartContextValue = {
  items: CartItem[]
  promoCode: string | null
  totals: ReturnType<typeof getCartTotals>
  addItem: (product: CartProduct, quantity: number) => void
  removeItem: (id: number) => void
  setQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  applyPromo: (code: string) => void
  removePromo: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
