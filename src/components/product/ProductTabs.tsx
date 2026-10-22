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
    <section className="border-2 border-[#12424A] rounded-3xl overflow-hidden text-[#12424A]">
      <div role="tablist" className="flex gap-2 p-3 border-b-2 border-[#12424A]">
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
              className={`px-5 py-1.5 rounded-full border-2 border-[#12424A] text-lg transition ${isActive ? "bg-[#12424A] text-white" : "bg-white hover:-translate-y-0.5"}`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="p-6">
        {activeTab === "description" ? (
          <p className="leading-relaxed max-w-prose">{product.description}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 items-start">
            <div className="flex flex-col gap-4">
              {reviews.length === 0 ? (
                <p className="text-[#3E6F73]">No reviews yet. Be the first!</p>
              ) : (
                reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
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
