import type { Product } from "../product/product";

export type CartItem = Pick<Product, "id" | "title" | "thumbnail" | "price" | "discountPercentage" | "stock"> & {
    quantity: number
}

export type CartState = {
    items: CartItem[]
    promoCode: string | null
}

export type CartAction = 
| {type: "add"; product: Product; quantity: number}
| {type: "remove"; id: number}
| {type: "setQuantity"; id: number; quantity: number}
| {type: "clear"}
| {type: "applyPromo"; code: string}
| {type: "removePromo"}