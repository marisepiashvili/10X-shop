export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

// a review written in this browser; the id keeps React keys stable
export type StoredReview = Review & { id: string }

export interface Product {
  id: number
  title: string
  brand?: string
  category: string
  price: number
  rating: number
  discountPercentage: number
  stock: number
  thumbnail: string
  description: string
  images: string[]
  reviews: Review[]
  // detail fields from /products/{id}; optional because the list endpoints may leave them out
  sku?: string
  warrantyInformation?: string
  shippingInformation?: string
  returnPolicy?: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// "default" keeps the API order; "discount-desc" is used by Home, not offered in the Catalog select
export type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc" | "title-asc" | "discount-desc"

export interface ProductQuery {
  search: string
  category: string
  sort: SortOption
  page: number
}

export interface Category {
  slug: string
  name: string
  url: string
}
