import type { CartItem, CartTotals } from "./cart"

export interface ShippingInfo {
  fullName: string
  email: string
  address: string
  city: string
}

export type OrderStatus = "Processing" | "Shipped" | "Delivered"

// an order as it is saved in localStorage; models/Order.ts adds the behaviour
export interface OrderData {
  id: string
  createdAt: string
  items: CartItem[]
  promoCode: string | null
  totals: CartTotals
  shipping: ShippingInfo
}
