type PageButtonProps = {
    children: React.ReactNode
    onClick: () => void
    color?: string
    isActive?: boolean
    disabled?: boolean
    ariaLabel?: string 
}


export default function PageButton({
    children,
    onClick,
    color = "bg-white",
    isActive = false,
    disabled = false,
    ariaLabel,
}:PageButtonProps) {
   const baseStyles = "w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#12424A] flex items-center justify-center font-bold transition focus:outline-none focus-visible:shadow-[3px_3px_0_#12424A]"
    const colorStyles = isActive ? "bg-[#12424A] text-white" : `${color} text-[#12424A]`
    const hoverStyles = "enabled:hover:-translate-x-0.5 enabled:hover:-translate-y-0.5 enabled:hover:shadow-[3px_3px_0_#12424A] enabled:active:translate-x-0 enabled:active:translate-y-0 enabled:active:shadow-none"
    const disabledStyles = "disabled:border-dashed disabled:border-[#9DBFC0] disabled:bg-white disabled:cursor-not-allowed"

  return (
      <button className={`${baseStyles} ${colorStyles} ${hoverStyles} ${disabledStyles}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={isActive ? "page" : undefined}>
        {children}
      </button>
    
  )
}
