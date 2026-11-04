import type { StoredReview } from "../../types/product"
import { isArrayOf, isRecord, isStoredReview } from "../../utils/guards"
import { StorageService } from "../../models/StorageService"
import { STORAGE_KEYS } from "../../utils/storageKeys"

// product id -> reviews written in this browser, newest first
type ReviewStore = Record<string, StoredReview[]>

function isReviewStore(value: unknown): value is ReviewStore {
  return isRecord(value) && Object.values(value).every((reviews) => isArrayOf(reviews, isStoredReview))
}

const reviewsStorage = new StorageService<ReviewStore>(STORAGE_KEYS.reviews, isReviewStore)

function readStore(): ReviewStore {
  return reviewsStorage.get() ?? {}
}

export function loadReviews(productId: number): StoredReview[] {
  return readStore()[productId] ?? []
}

export function saveReview(productId: number, review: StoredReview): StoredReview[] {
  const store = readStore()
  const reviews = [review, ...(store[productId] ?? [])]
  reviewsStorage.set({ ...store, [productId]: reviews })
  return reviews
}

export function clearReviews() {
  reviewsStorage.remove()
}
