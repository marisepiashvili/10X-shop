import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router"
import useAuth from "../../hooks/useAuth"
import useToast from "../../hooks/useToast"
import type { Product, StoredReview } from "../../types/product"
import ReviewCard from "./ReviewCard"
import ReviewForm from "./ReviewForm"

type Tab = "details" | "reviews"

// PRD P3.4: a logged-in user signs with their name, anyone else posts as "Guest"
const GUEST_NAME = "Guest"

type ProductTabsProps = {
  product: Product
  reviews: StoredReview[]
  onAddReview: (review: StoredReview) => void
}

export default function ProductTabs({ product, reviews, onAddReview }: ProductTabsProps) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const { hash } = useLocation()
  const sectionRef = useRef<HTMLElement>(null)
  const openReviews = hash === "#reviews"
  const [activeTab, setActiveTab] = useState<Tab>(openReviews ? "reviews" : "details")

  useEffect(() => {
    if (openReviews) sectionRef.current?.scrollIntoView({ block: "start" })
  }, [openReviews])

  function handleAddReview(rating: number, comment: string) {
    onAddReview({
      id: crypto.randomUUID(),
      rating,
      comment,
      date: new Date().toISOString(),
      reviewerName: user?.name ?? GUEST_NAME,
      reviewerEmail: user?.email ?? "",
    })
    showToast("Review added ✓")
  }

  // the description itself is shown under the price (PRD P3.1), so this tab lists the specs instead of repeating it;
  // that is also why it is called Details, not Description
  const details: { label: string; value?: string }[] = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    { label: "SKU", value: product.sku },
    { label: "In stock", value: String(product.stock) },
    { label: "Warranty", value: product.warrantyInformation },
    { label: "Shipping", value: product.shippingInformation },
    { label: "Returns", value: product.returnPolicy },
  ]

  const tabs: { id: Tab, label: string }[] = [
    { id: "details", label: "Details" },
    { id: "reviews", label: `Reviews (${reviews.length})` },
  ]

  return (
    <section ref={sectionRef} className="flex flex-col gap-6 scroll-mt-24">
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
              className={`h-13 px-6.5 rounded-full text-[17px] font-extrabold shadow-soft transition ${isActive ? "bg-coal text-white" : "bg-card hover:-translate-y-0.5"}`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {activeTab === "details" ? (
          <dl className="bg-card rounded-card shadow-card px-6 py-3 md:px-9 md:py-5 grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
            {details.filter((detail) => detail.value).map((detail) => (
              <div key={detail.label} className="flex justify-between gap-6 py-3 border-b border-dashed border-muted">
                <dt>{detail.label}</dt>
                <dd className="font-extrabold text-right first-letter:uppercase">{detail.value}</dd>
              </div>
            ))}
          </dl>
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
            <ReviewForm onSubmit={handleAddReview} authorName={user?.name ?? GUEST_NAME} />
          </div>
        )}
      </div>
    </section>
  )
}
