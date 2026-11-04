import { getDiscountedPrice } from "../utils/price"
import type { CartItem, CartState, CartTotals } from "../types/cart"

export interface ICart {
  readonly itemCount: number
  subtotal(): number
  discount(): number
  shipping(): number
  total(): number
}

// every cart calculation (PRD P4.3) in one place and without React, so it can be checked on its own;
// the reducer still owns the cart state, this class only reads it
export class Cart implements ICart {
  static readonly PROMO_CODE = "10X10"
  static readonly PROMO_PERCENT = 10
  static readonly FREE_SHIPPING_FROM = 100
  static readonly SHIPPING_COST = 10

  private readonly items: CartItem[]
  private readonly promoCode: string | null

  constructor(items: CartItem[], promoCode: string | null) {
    this.items = items
    this.promoCode = promoCode
  }

  // the price of one unit after the product's own discount
  static unitPrice(item: CartItem): number {
    return getDiscountedPrice(item.price, item.discountPercentage)
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0)
  }

  subtotal(): number {
    return this.items.reduce((sum, item) => sum + Cart.unitPrice(item) * item.quantity, 0)
  }

  discount(): number {
    return this.promoCode ? (this.subtotal() * Cart.PROMO_PERCENT) / 100 : 0
  }

  // free from FREE_SHIPPING_FROM after the promo discount; an empty cart ships nothing
  shipping(): number {
    const afterDiscount = this.subtotal() - this.discount()
    return this.itemCount === 0 || afterDiscount >= Cart.FREE_SHIPPING_FROM ? 0 : Cart.SHIPPING_COST
  }

  total(): number {
    return this.subtotal() - this.discount() + this.shipping()
  }

  totals(): CartTotals {
    return {
      itemCount: this.itemCount,
      subtotal: this.subtotal(),
      discount: this.discount(),
      shipping: this.shipping(),
      total: this.total(),
    }
  }

  // a copy of the contents, so an order keeps the cart as it was when it was placed
  toState(): CartState {
    return { items: [...this.items], promoCode: this.promoCode }
  }
}
