type StarIconProps = {
  filled: boolean
  size?: number
}

export default function StarIcon({ filled, size = 18 }: StarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="1.6"
      strokeLinejoin="round"
      className={`stroke-ink ${filled ? "fill-yellow" : "fill-white"}`}
    >
      <path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.3l-5.6 2.9 1.1-6.3L2.9 9.5l6.3-.9z" />
    </svg>
  )
}
