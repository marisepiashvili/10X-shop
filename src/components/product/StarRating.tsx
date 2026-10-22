type StarRatingProps = {
    rating: number
}

const STARS = [1, 2, 3, 4, 5]


export default function StarRating({rating}: StarRatingProps) {
    const rounded = Math.round(rating)
  return (
      <div className="flex gap-0.5 text-sm" role="img" aria-label={`${rounded} out of 5 stars`}>
      {STARS.map((star) => (
        <span key={star} className={star <= rounded ? "text-[#12424A]" : "text-[#9DBFC0]"}>
          {star <= rounded ? "★" : "☆"}
        </span>
      ))}
    </div>

  )
}
