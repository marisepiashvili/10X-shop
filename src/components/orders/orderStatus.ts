import type { Order } from "./order";

export type OrderStatus = "Processing" | "Shipped" | "Delivered"

export const ORDER_STEPS: OrderStatus[] = ["Processing", "Shipped", "Delivered"]

export const STATUS_COLORS: Record<OrderStatus, string> = {
    Processing: "bg-yellow",
    Shipped: "bg-blue text-white",
    Delivered: "bg-mint"
}

const MINUTE = 60 * 1000

export function getOrderStatus(order: Order) : OrderStatus {
    const age = Date.now() - new Date(order.createdAt).getTime()
    if(age < MINUTE) return "Processing"
    if(age < 3 * MINUTE) return "Shipped"
    return "Delivered"
}