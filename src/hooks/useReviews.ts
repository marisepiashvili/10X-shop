import { useMemo, useState } from "react"
import type { Product, StoredReview } from "../types/product"
import { loadReviews, saveReview } from "../components/product/reviewStorage"

export default function useReviews(product: Product) {
  const [localReviews, setLocalReviews] = useState(() => loadReviews(product.id))

  // reviews written here come first, then the ones from the API
  const reviews = useMemo(
    () => [...localReviews, ...product.reviews.map((review, index) => ({ ...review, id: `api-${index}` }))],
    [localReviews, product.reviews]
  )

  const averageRating = useMemo(
    () => (reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : product.rating),
    [reviews, product.rating]
  )

  function addReview(review: StoredReview) {
    setLocalReviews(saveReview(product.id, review))
  }

  return { reviews, averageRating, addReview }
}
