type DashedButtonProps = {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  // layout and hover background, which depend on where the button sits
  className?: string
}

// a pill with a dashed outline whose dashes grow into a solid line on hover
export default function DashedButton({ children, onClick, disabled = false, className = "" }: DashedButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative h-11 px-6 rounded-full text-[15px] font-extrabold cursor-pointer transition-colors duration-500 disabled:text-muted-ink disabled:cursor-not-allowed ${className}`}
    >
      <svg aria-hidden="true" className="absolute top-px left-px w-[calc(100%-2px)] h-[calc(100%-2px)] overflow-visible pointer-events-none">
        <rect
          width="100%"
          height="100%"
          rx="21"
          pathLength="100"
          className="fill-none stroke-ink stroke-2 group-disabled:stroke-muted [stroke-dasharray:2_2] group-enabled:group-hover:[stroke-dasharray:4_0] transition-[stroke-dasharray] duration-200"
        />
      </svg>
      {children}
    </button>
  )
}
