import { isArrayOf, isOrderData } from "../../utils/guards"
import { STORAGE_KEYS } from "../../utils/storageKeys"
import { StorageService } from "../../models/StorageService"
import { Order } from "../../models/Order"
import type { Cart } from "../../models/Cart"
import type { OrderData, ShippingInfo } from "../../types/order"

function isOrderDataList(value: unknown): value is OrderData[] {
  return isArrayOf(value, isOrderData)
}

const ordersStorage = new StorageService<OrderData[]>(STORAGE_KEYS.orders, isOrderDataList)

export function readOrders(): Order[] {
  return (ordersStorage.get() ?? []).map((data) => new Order(data))
}

export function placeOrder(cart: Cart, shipping: ShippingInfo): Order {
  const orders = readOrders()
  const order = Order.create(cart, shipping, `10X-${String(orders.length + 1).padStart(5, "0")}`)
  // each Order turns itself into plain data through toJSON()
  ordersStorage.set([...orders, order])
  return order
}

export function getOrderById(id: string) {
  return readOrders().find((order) => order.id === id) ?? null
}

export function clearOrders() {
  ordersStorage.remove()
}
