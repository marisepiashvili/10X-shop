import { Minus, Plus } from "lucide-react"

type QuantityStepperProps = {
  value: number
  max: number
  onChange: (value: number) => void
}

const MIN_QUANTITY = 1

export default function QuantityStepper({ value, max, onChange }: QuantityStepperProps) {
  const buttonStyles = "w-12 h-12 rounded-full bg-paper grid place-items-center text-xl transition enabled:hover:bg-yellow disabled:opacity-30 disabled:cursor-not-allowed"

  return (
    <div role="group" aria-label="Quantity" className="flex items-center h-15 px-1.5 rounded-full bg-white shadow-soft">
      <button
        type="button"
        className={buttonStyles}
        onClick={() => onChange(value - 1)}
        disabled={value <= MIN_QUANTITY}
        aria-label="Decrease quantity"
      >
        <Minus size={18} strokeWidth={2.4} />
      </button>
      <span aria-live="polite" className="min-w-11 text-center font-display text-xl">{value}</span>
      <button
        type="button"
        className={buttonStyles}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={18} strokeWidth={2.4} />
      </button>
    </div>
  )
}
