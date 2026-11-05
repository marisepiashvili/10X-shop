import { useState } from "react"
import StarIcon from "./StarIcon"

const STARS = [1, 2, 3, 4, 5]
const MIN_COMMENT_LENGTH = 10

type ReviewFormProps = {
  onSubmit: (rating: number, comment: string) => void
  authorName: string
}

export default function ReviewForm({ onSubmit, authorName }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  // errors appear after the first submit and then follow the input live
  const [showErrors, setShowErrors] = useState(false)

  const ratingError = rating === 0 ? "Please select a rating" : ""
  const commentError = comment.trim().length < MIN_COMMENT_LENGTH ? `Comment must be at least ${MIN_COMMENT_LENGTH} characters` : ""

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (ratingError || commentError) {
      setShowErrors(true)
      return
    }
    onSubmit(rating, comment.trim())
    setRating(0)
    setComment("")
    setShowErrors(false)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4.5 px-6.5 pt-7.5 pb-6.5 bg-card rounded-card shadow-card">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-[26px] leading-tight">Write a review</h3>
        <p className="text-sm text-muted-ink">Posting as <span className="font-extrabold text-ink">{authorName}</span></p>
      </div>

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
        {showErrors && ratingError && (
          <p id="review-rating-error" className="text-sm font-bold text-danger pl-2.5">{ratingError}</p>
        )}
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="review-comment" className="text-sm font-extrabold">Comment</label>
        <textarea
          id="review-comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you like or dislike?"
          aria-invalid={showErrors && Boolean(commentError)}
          aria-describedby={showErrors && commentError ? "review-comment-error" : undefined}
          className={`rounded-3xl bg-card p-4 resize-none placeholder:text-muted-ink ${showErrors && commentError ? "border-[3px] border-danger" : "border-2 border-ink"}`}
        />
        {showErrors && commentError ? (
          <p id="review-comment-error" className="text-sm font-bold text-danger pl-2.5">{commentError}</p>
        ) : (
          <p className="text-xs text-muted-ink">At least {MIN_COMMENT_LENGTH} characters.</p>
        )}
      </div>

      <button
        type="submit"
        className="h-12 rounded-full bg-coal text-white text-[17px] font-extrabold transition hover:bg-blue"
      >
        Submit review
      </button>
    </form>
  )
}
