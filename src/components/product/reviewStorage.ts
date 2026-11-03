import { isArrayOf, isNumber, isRecord, isString, readStorage } from "../../utils/guards"
import type { Review } from "./product"

const REVIEWS_KEY = "shop_reviews"

export type StoredReview = Review & { id: string }

// product id -> reviews written in this browser, newest first
type ReviewStore = Record<string, StoredReview[]>

function isStoredReview(value: unknown): value is StoredReview {
  return isRecord(value) && isString(value.id) && isNumber(value.rating) && isString(value.comment)
    && isString(value.date) && isString(value.reviewerName) && isString(value.reviewerEmail)
}

function isReviewStore(value: unknown): value is ReviewStore {
  return isRecord(value) && Object.values(value).every((reviews) => isArrayOf(reviews, isStoredReview))
}

function readStore(): ReviewStore {
  return readStorage(REVIEWS_KEY, isReviewStore, {})
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
