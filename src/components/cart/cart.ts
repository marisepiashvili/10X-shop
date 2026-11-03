import { isNumber, isRecord, isString } from "../../utils/guards";
import type { Product } from "../product/product";

export type CartProduct = Pick<Product, "id" | "title" | "thumbnail" | "price" | "discountPercentage" | "stock">

export type CartItem = CartProduct & {
    quantity: number
}

export type CartState = {
    items: CartItem[]
    promoCode: string | null
}

export type CartAction = 
| {type: "add"; product: CartProduct; quantity: number}
| {type: "remove"; id: number}
| {type: "setQuantity"; id: number; quantity: number}
| {type: "clear"}
| {type: "applyPromo"; code: string}
| {type: "removePromo"}
export function isCartItem(value: unknown): value is CartItem {
    return isRecord(value) && isNumber(value.id) && isString(value.title) && isString(value.thumbnail)
        && isNumber(value.price) && isNumber(value.discountPercentage) && isNumber(value.stock) && isNumber(value.quantity)
}

export function isCartState(value: unknown): value is CartState {
    return isRecord(value) && Array.isArray(value.items) && value.items.every(isCartItem)
        && (value.promoCode === null || isString(value.promoCode))
}
