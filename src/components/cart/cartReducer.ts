import type { CartAction, CartState } from "./cart"

export const CART_KEY = "shop_cart"

export const initialCartState: CartState = { items: [], promoCode: null }

function clamp(quantity: number, stock: number) {
  return Math.min(Math.max(quantity, 1), stock)
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const { product, quantity } = action
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: clamp(item.quantity + quantity, item.stock) } : item,
          ),
        }
      }
      const newItem = {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        quantity: clamp(quantity, product.stock),
      }
      return { ...state, items: [...state.items, newItem] }
    }
    case "remove":
      return { ...state, items: state.items.filter((item) => item.id !== action.id) }
    case "setQuantity":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: clamp(action.quantity, item.stock) } : item,
        ),
      }
    case "clear":
      return initialCartState
    case "applyPromo":
      return { ...state, promoCode: action.code }
    case "removePromo":
      return { ...state, promoCode: null }
  }
}

export function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? (JSON.parse(raw) as CartState) : initialCartState
  } catch {
    return initialCartState
  }
}
