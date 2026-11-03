import type { StoredReview } from "../../types/product"
import { isArrayOf, isRecord, isStoredReview, readStorage } from "../../utils/guards"
import { STORAGE_KEYS } from "../../utils/storageKeys"

// product id -> reviews written in this browser, newest first
type ReviewStore = Record<string, StoredReview[]>

function isReviewStore(value: unknown): value is ReviewStore {
  return isRecord(value) && Object.values(value).every((reviews) => isArrayOf(reviews, isStoredReview))
}

function readStore(): ReviewStore {
  return readStorage(STORAGE_KEYS.reviews, isReviewStore, {})
}

export function loadReviews(productId: number): StoredReview[] {
  return readStore()[productId] ?? []
}

export function saveReview(productId: number, review: StoredReview): StoredReview[] {
  const store = readStore()
  const reviews = [review, ...(store[productId] ?? [])]
  localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify({ ...store, [productId]: reviews }))
  return reviews
}

export function clearReviews() {
  localStorage.removeItem(STORAGE_KEYS.reviews)
}
