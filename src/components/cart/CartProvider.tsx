import { useEffect, useReducer } from "react"
import type { CartProduct } from "../../types/cart"
import { CartContext } from "./CartContext"
import { cartReducer, cartStorage, loadCart } from "./cartReducer"
import { Cart } from "../../models/Cart"

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart)

  useEffect(() => {
    cartStorage.set(state)
  }, [state])

  const value = {
    items: state.items,
    promoCode: state.promoCode,
    totals: new Cart(state.items, state.promoCode).totals(),
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
