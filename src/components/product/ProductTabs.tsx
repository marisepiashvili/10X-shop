import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import useAuth from "../../hooks/useAuth"
import useToast from "../../hooks/useToast"
import type { Product } from "./product"
import ReviewCard from "./ReviewCard"
import ReviewForm from "./ReviewForm"
import type { StoredReview } from "./reviewStorage"

type Tab = "description" | "reviews"
type ReviewDraft = { productId: number, rating: number, comment: string }

const DRAFT_KEY = "shop_review_draft"

function loadDraft(productId: number): ReviewDraft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    const draft = raw ? (JSON.parse(raw) as ReviewDraft) : null
    return draft?.productId === productId ? draft : null
  } catch {
    return null
  }
}

type ProductTabsProps = {
  product: Product
  reviews: StoredReview[]
  onAddReview: (review: StoredReview) => void
}

export default function ProductTabs({ product, reviews, onAddReview }: ProductTabsProps) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)
  const openReviews = hash === "#reviews"
  const [activeTab, setActiveTab] = useState<Tab>(openReviews ? "reviews" : "description")
  const [draft, setDraft] = useState(() => loadDraft(product.id))

  useEffect(() => {
    if (openReviews) sectionRef.current?.scrollIntoView({ block: "start" })
  }, [openReviews])

  function handleAddReview(rating: number, comment: string) {
    if (!user) {
      // keep what they wrote so the form is filled in again after login
      const newDraft: ReviewDraft = { productId: product.id, rating, comment }
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(newDraft))
      navigate("/login", { state: { from: `${pathname}#reviews` } })
      return
    }
    sessionStorage.removeItem(DRAFT_KEY)
    setDraft(null)
    onAddReview({
      id: crypto.randomUUID(),
      rating,
      comment,
      date: new Date().toISOString(),
      reviewerName: user.name,
      reviewerEmail: user.email,
    })
    showToast("Review added ✓")
  }

  const tabs: { id: Tab, label: string }[] = [
    { id: "description", label: "Description" },
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
        {activeTab === "description" ? (
          <div className="bg-card rounded-card shadow-card p-6 md:p-9 grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <ReviewForm onSubmit={handleAddReview} initialRating={draft?.rating} initialComment={draft?.comment} />
          </div>
        )}
      </div>
    </section>
  )
}
