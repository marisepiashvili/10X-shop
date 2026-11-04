type DiscountBadgeProps = {
  discount: number
  size?: "sm" | "lg"
}

const sizeStyles = {
  sm: "-top-2.5 -right-1.5 px-2.5 py-1.5 text-sm sm:-top-3 sm:-right-2.5 sm:px-3.5 sm:py-2 sm:text-[17px] rounded-full rotate-10",
  lg: "-top-5 -right-4.5 w-26 h-26 rounded-full border-[5px] text-[28px] rotate-12",
}

export default function DiscountBadge({ discount, size = "sm" }: DiscountBadgeProps) {
  if (discount === 0) return null

  return (
    <span className={`absolute grid place-items-center bg-orange text-white border-4 border-sticker font-display leading-none shadow-soft ${sizeStyles[size]}`}>
      −{discount}%
    </span>
  )
}
