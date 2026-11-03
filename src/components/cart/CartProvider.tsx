import { useEffect, useReducer } from "react"
import type { CartProduct } from "./cart"
import { CartContext } from "./CartContext"
import { CART_KEY, cartReducer, loadCart } from "./cartReducer"
import { getCartTotals } from "./cartTotals"

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(state))
  }, [state])

  const value = {
    items: state.items,
    promoCode: state.promoCode,
    totals: getCartTotals(state),
    addItem: (product: CartProduct, quantity: number) => {
      const inCart = state.items.find((item) => item.id === product.id)?.quantity ?? 0
      if (inCart + quantity > product.stock) return false
      dispatch({ type: "add", product, quantity })
      return true
    },
    removeItem: (id: number) => dispatch({ type: "remove", id }),
    setQuantity: (id: number, quantity: number) => dispatch({ type: "setQuantity", id, quantity }),
    clearCart: () => dispatch({ type: "clear" }),
    applyPromo: (code: string) => dispatch({ type: "applyPromo", code }),
    removePromo: () => dispatch({ type: "removePromo" }),
  }

  return <CartContext value={value}>{children}</CartContext>
}
