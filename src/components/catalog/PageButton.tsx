type PageButtonProps = {
    children: React.ReactNode
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    ariaLabel?: string
}


export default function PageButton({
    children,
    onClick,
    isActive = false,
    disabled = false,
    ariaLabel,
}:PageButtonProps) {
    const baseStyles = "w-12 h-12 rounded-full flex items-center justify-center font-extrabold transition"
    const colorStyles = isActive
        ? "bg-blue text-white border-[3px] border-white font-display shadow-soft -rotate-3"
        : "bg-white shadow-soft enabled:hover:-translate-y-0.5"
    const disabledStyles = "disabled:bg-muted disabled:shadow-none disabled:cursor-not-allowed"

  return (
      <button className={`${baseStyles} ${colorStyles} ${disabledStyles}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={isActive ? "page" : undefined}>
        {children}
      </button>

  )
}
