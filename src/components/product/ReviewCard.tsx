import type { Review } from "../../types/product"
import StarRating from "./StarRating"
import { formatDate } from "../../utils/date"

const cardColors = ["bg-card", "bg-mint", "bg-sky"]
const cardTilts = ["-rotate-1", "rotate-[0.5deg]", "-rotate-[0.5deg]"]

type ReviewCardProps = {
  review: Review
  index: number
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const date = formatDate(review.date)
  const color = cardColors[index % cardColors.length]
  const tilt = cardTilts[index % cardTilts.length]

  return (
    <article className={`flex flex-col gap-2 rounded-3xl px-6.5 py-5.5 shadow-card ${color} ${tilt}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-extrabold">{review.reviewerName}</h3>
        <time dateTime={review.date} className="font-mono text-[13px]">{date}</time>
      </div>
      <StarRating rating={review.rating} />
      <p className="leading-relaxed">{review.comment}</p>
    </article>
  )
}
