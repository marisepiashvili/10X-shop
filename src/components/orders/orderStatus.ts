import type { OrderStatus } from "../../types/order"

export const ORDER_STEPS: OrderStatus[] = ["Processing", "Shipped", "Delivered"]

export const STATUS_COLORS: Record<OrderStatus, string> = {
    Processing: "bg-yellow",
    Shipped: "bg-blue text-white",
    Delivered: "bg-mint"
}
