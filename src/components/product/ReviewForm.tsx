import { useState } from "react"

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
    <form onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-4 border-2 border-[#12424A] rounded-2xl p-4 text-[#12424A]">
        <legend className="px-3 py-1 rounded-md bg-[#12424A] text-white text-sm font-bold uppercase">
          Write a review
        </legend>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">Rating</span>
          <div className="flex gap-2">
            {STARS.map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} out of 5`}
                aria-pressed={star === rating}
                className={`w-9 h-9 rounded-full border-2 border-[#12424A] flex items-center justify-center transition hover:-translate-y-0.5 ${star <= rating ? "bg-[#B5E655]" : "bg-white"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="review-comment" className="text-sm font-bold">Comment</label>
          <textarea
            id="review-comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike?"
            className="border-2 border-[#12424A] rounded-2xl bg-white p-3 text-sm resize-none focus:outline-none focus-visible:shadow-[3px_3px_0_#12424A]"
          />
          <p className="text-xs text-[#3E6F73]">At least {MIN_COMMENT_LENGTH} characters.</p>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="h-11 rounded-full border-2 border-[#12424A] bg-[#B5E655] text-lg transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-[3px_3px_0_#12424A] disabled:bg-[#7FC7BD] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Submit review
        </button>
      </fieldset>
    </form>
  )
}
