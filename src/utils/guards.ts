import type { CartItem, CartState, CartTotals } from "../types/cart"
import type { Order, ShippingInfo } from "../types/order"
import type { SortOption, StoredReview } from "../types/product"
import type { AuthUser, StoredUser } from "../types/user"

// JSON from storage has no type, so these check its shape before the app trusts it

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function isString(value: unknown): value is string {
  return typeof value === "string"
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value)
}

export function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || isString(value)
}

export function isArrayOf<T>(value: unknown, isItem: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(isItem)
}

// reads and parses a storage key, returning the fallback when the value is missing, broken or the wrong shape
export function readStorage<T>(
  key: string,
  isValid: (value: unknown) => value is T,
  fallback: T,
  storage: Storage = localStorage
): T {
  try {
    const raw = storage.getItem(key)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    return isValid(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function isCartItem(value: unknown): value is CartItem {
  return isRecord(value) && isNumber(value.id) && isString(value.title) && isString(value.thumbnail)
    && isNumber(value.price) && isNumber(value.discountPercentage) && isNumber(value.stock) && isNumber(value.quantity)
}

export function isCartState(value: unknown): value is CartState {
  return isRecord(value) && isArrayOf(value.items, isCartItem)
    && (value.promoCode === null || isString(value.promoCode))
}

function isCartTotals(value: unknown): value is CartTotals {
  return isRecord(value) && isNumber(value.itemCount) && isNumber(value.subtotal)
    && isNumber(value.discount) && isNumber(value.shipping) && isNumber(value.total)
}

function isShippingInfo(value: unknown): value is ShippingInfo {
  return isRecord(value) && isString(value.fullName) && isString(value.email)
    && isString(value.address) && isString(value.city)
}

export function isOrder(value: unknown): value is Order {
  return isRecord(value) && isString(value.id) && isString(value.createdAt)
    && isArrayOf(value.items, isCartItem)
    && (value.promoCode === null || isString(value.promoCode))
    && isCartTotals(value.totals) && isShippingInfo(value.shipping)
}

export function isAuthUser(value: unknown): value is AuthUser {
  return isRecord(value) && isString(value.username) && isString(value.name) && isString(value.email)
    && isOptionalString(value.phone)
}

export function isStoredUser(value: unknown): value is StoredUser {
  return isRecord(value) && isString(value.password) && isAuthUser(value)
}

// a Record must list every SortOption, so adding a new option without updating this is a type error
const SORT_OPTIONS: Record<SortOption, true> = {
  "default": true,
  "price-asc": true,
  "price-desc": true,
  "rating-desc": true,
  "title-asc": true,
  "discount-desc": true,
}

// the URL is user input: ?sort=anything must not reach the API or the select unchecked
export function isSortOption(value: unknown): value is SortOption {
  return isString(value) && Object.hasOwn(SORT_OPTIONS, value)
}

export function isStoredReview(value: unknown): value is StoredReview {
  return isRecord(value) && isString(value.id) && isNumber(value.rating) && isString(value.comment)
    && isString(value.date) && isString(value.reviewerName) && isString(value.reviewerEmail)
}

// location.state can hold anything (old links, other pages), so check it before using it
export function getFromPath(state: unknown): string {
  return isRecord(state) && isString(state.from) ? state.from : "/"
}
