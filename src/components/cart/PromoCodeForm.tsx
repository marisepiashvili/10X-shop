import { PROMO_PERCENT } from "./cartTotals"

type PromoCodeFormProps = {
  value: string
  error: string
  appliedCode: string | null
  onChange: (value: string) => void
  onApply: () => void
  onRemove: () => void
}

export default function PromoCodeForm({ value, error, appliedCode, onChange, onApply, onRemove }: PromoCodeFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onApply()
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-130 mt-4 p-5.5 flex flex-col gap-2 bg-yellow border-4 border-white rounded-card shadow-card -rotate-[0.8deg]"
    >
      <label htmlFor="promo-code" className="text-sm font-extrabold">Got a promo code?</label>
      <div className="flex gap-2">
        <input
          id="promo-code"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. 10X10"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "promo-error" : undefined}
          className={`flex-1 min-w-0 h-13.5 px-5.5 rounded-full bg-white font-mono uppercase ${error ? "border-[3px] border-danger" : "border-2 border-ink"}`}
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="h-13.5 px-7 rounded-full bg-ink text-white text-[17px] font-extrabold transition enabled:hover:bg-blue disabled:bg-muted disabled:text-muted-ink disabled:cursor-not-allowed"
        >
          Apply
        </button>
      </div>
      {error && <p id="promo-error" role="alert" className="text-sm font-bold text-danger pl-2.5">{error}</p>}
      {appliedCode && (
        <p className="text-sm font-bold">
          {appliedCode} applied — {PROMO_PERCENT}% off.{" "}
          <button type="button" onClick={onRemove} className="font-extrabold underline hover:text-blue">Remove</button>
        </p>
      )}
    </form>
  )
}
