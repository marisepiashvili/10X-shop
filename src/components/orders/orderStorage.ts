import { isArrayOf, readStorage } from "../../utils/guards"
import { isOrder, type Order } from "./order"

const ORDERS_KEY = "shop_orders"

function isOrderList(value: unknown): value is Order[] {
  return isArrayOf(value, isOrder)
}

export function readOrders(): Order[] {
  return readStorage(ORDERS_KEY, isOrderList, [])
}

export function saveOrder(order: Omit<Order, "id" | "createdAt">): Order {
  const orders = readOrders()
  const newOrder: Order = {
    ...order,
    id: `10X-${String(orders.length + 1).padStart(5, "0")}`,
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(ORDERS_KEY, JSON.stringify([...orders, newOrder]))
  return newOrder
}

export function getOrderById(id: string) {
  return readOrders().find((order) => order.id === id) ?? null
}

export function clearOrders() {
  localStorage.removeItem(ORDERS_KEY)
}
