import type { Review } from "./product"

const REVIEWS_KEY = "shop_reviews"

export type StoredReview = Review & { id: string }

// product id -> reviews written in this browser, newest first
type ReviewStore = Record<string, StoredReview[]>

function readStore(): ReviewStore {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY)
    return raw ? (JSON.parse(raw) as ReviewStore) : {}
  } catch {
    return {}
  }
}

export function loadReviews(productId: number): StoredReview[] {
  return readStore()[productId] ?? []
}

export function saveReview(productId: number, review: StoredReview): StoredReview[] {
  const store = readStore()
  const reviews = [review, ...(store[productId] ?? [])]
  localStorage.setItem(REVIEWS_KEY, JSON.stringify({ ...store, [productId]: reviews }))
  return reviews
}

export function clearReviews() {
  localStorage.removeItem(REVIEWS_KEY)
}
