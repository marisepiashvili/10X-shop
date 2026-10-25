import { useState } from "react"
import type { Product, Review } from "./product"
import ReviewCard from "./ReviewCard"
import ReviewForm from "./ReviewForm"

type Tab = "description" | "reviews"
type ReviewWithId = Review & { id: string }

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<Tab>("description")
  const [reviews, setReviews] = useState<ReviewWithId[]>(
    product.reviews.map((review, index) => ({ ...review, id: `api-${index}` }))
  )

  function handleAddReview(rating: number, comment: string) {
    const newReview: ReviewWithId = {
      id: crypto.randomUUID(),
      rating,
      comment,
      date: new Date().toISOString(),
      reviewerName: "You",
      reviewerEmail: "",
    }
    setReviews([newReview, ...reviews])
  }

  const tabs: { id: Tab, label: string }[] = [
    { id: "description", label: "Description" },
    { id: "reviews", label: `Reviews (${reviews.length})` },
  ]

  return (
    <section className="flex flex-col gap-6">
      <div role="tablist" aria-label="Product information" className="flex flex-wrap gap-2.5">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`h-13 px-6.5 rounded-full text-[17px] font-extrabold shadow-soft transition ${isActive ? "bg-ink text-white" : "bg-white hover:-translate-y-0.5"}`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {activeTab === "description" ? (
          <div className="bg-white rounded-card shadow-card p-6 md:p-9 grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-[17px] leading-relaxed">{product.description}</p>
            <dl className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-3 self-start">
              {product.brand && (
                <>
                  <dt>Brand</dt>
                  <dd className="font-extrabold">{product.brand}</dd>
                </>
              )}
              <dt>Category</dt>
              <dd className="font-extrabold capitalize">{product.category}</dd>
              <dt>Stock</dt>
              <dd className="font-extrabold">{product.stock}</dd>
            </dl>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 items-start">
            <div className="flex flex-col gap-5">
              {reviews.length === 0 ? (
                <p className="font-note text-2xl">No reviews yet. Be the first!</p>
              ) : (
                reviews.map((review, index) => (
                  <ReviewCard key={review.id} review={review} index={index} />
                ))
              )}
            </div>
            <ReviewForm onSubmit={handleAddReview} />
          </div>
        )}
      </div>
    </section>
  )
}
