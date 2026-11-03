import type { Product } from "./product"

export type CartProduct = Pick<Product, "id" | "title" | "thumbnail" | "price" | "discountPercentage" | "stock">

export type CartItem = CartProduct & {
  quantity: number
}

export interface CartState {
  items: CartItem[]
  promoCode: string | null
}

export type CartAction =
  | { type: "add"; product: CartProduct; quantity: number }
  | { type: "remove"; id: number }
  | { type: "setQuantity"; id: number; quantity: number }
  | { type: "clear" }
  | { type: "applyPromo"; code: string }
  | { type: "removePromo" }

export interface CartTotals {
  itemCount: number
  subtotal: number
  discount: number
  shipping: number
  total: number
}
