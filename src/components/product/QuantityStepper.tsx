type QuantityStepperProps = {
  value: number
  max: number
  onChange: (value: number) => void
}

const MIN_QUANTITY = 1

export default function QuantityStepper({ value, max, onChange }: QuantityStepperProps) {
  const buttonStyles = "w-8 h-8 rounded-full flex items-center justify-center text-xl transition enabled:hover:bg-[#B5E655] disabled:opacity-30 disabled:cursor-not-allowed"

  return (
    <div className="flex items-center gap-2 h-12 px-2 border-2 border-[#12424A] rounded-full bg-white text-[#12424A]">
      <button
        type="button"
        className={buttonStyles}
        onClick={() => onChange(value - 1)}
        disabled={value <= MIN_QUANTITY}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-8 text-center font-bold">{value}</span>
      <button
        type="button"
        className={buttonStyles}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
