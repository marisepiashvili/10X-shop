import type { Review } from "./product"
import StarRating from "./StarRating"

export default function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.date).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })

  return (
    <article className="flex flex-col gap-2 border-2 border-[#12424A] rounded-2xl bg-white p-4 text-[#12424A]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold">{review.reviewerName}</h3>
        <time dateTime={review.date} className="text-xs text-[#3E6F73]">{date}</time>
      </div>
      <StarRating rating={review.rating} />
      <p className="text-sm">{review.comment}</p>
    </article>
  )
}
