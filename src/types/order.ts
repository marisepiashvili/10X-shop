import type { CartItem, CartTotals } from "./cart"

export interface ShippingInfo {
  fullName: string
  email: string
  address: string
  city: string
}

export type OrderStatus = "Processing" | "Shipped" | "Delivered"

export interface Order {
  id: string
  createdAt: string
  items: CartItem[]
  promoCode: string | null
  totals: CartTotals
  shipping: ShippingInfo
}
