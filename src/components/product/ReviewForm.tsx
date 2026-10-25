import { useState } from "react"
import StarIcon from "./StarIcon"

const STARS = [1, 2, 3, 4, 5]
const MIN_COMMENT_LENGTH = 10

type ReviewFormProps = {
  onSubmit: (rating: number, comment: string) => void
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const isValid = rating > 0 && comment.trim().length >= MIN_COMMENT_LENGTH

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isValid) return
    onSubmit(rating, comment.trim())
    setRating(0)
    setComment("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 px-6.5 pt-7.5 pb-6.5 bg-white rounded-card shadow-card">
      <h3 className="font-display text-[26px] leading-tight">Write a review</h3>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-extrabold mb-2">Rating</legend>
        <div className="flex gap-1.5">
          {STARS.map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              aria-label={`Rate ${star} out of 5`}
              aria-pressed={star === rating}
              className={`w-12 h-12 rounded-full grid place-items-center transition hover:-translate-y-0.5 ${star <= rating ? "bg-yellow" : "bg-paper"}`}
            >
              <StarIcon filled={false} size={22} />
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="review-comment" className="text-sm font-extrabold">Comment</label>
        <textarea
          id="review-comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you like or dislike?"
          className="border-2 border-ink rounded-3xl bg-white p-4 resize-none placeholder:text-muted-ink"
        />
        <p className="text-xs text-muted-ink">At least {MIN_COMMENT_LENGTH} characters.</p>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="h-12 rounded-full bg-ink text-white text-[17px] font-extrabold transition enabled:hover:bg-blue disabled:bg-muted disabled:text-muted-ink disabled:cursor-not-allowed"
      >
        Submit review
      </button>
    </form>
  )
}
