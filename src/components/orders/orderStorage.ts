import type { Order } from "./order"

const ORDERS_KEY = "shop_orders"

export function readOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
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
