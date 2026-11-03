import { Link } from "react-router"

type BaseProps = {
  children: React.ReactNode
  // layout and hover background, which depend on where the button sits
  className?: string
}

// with `to` it renders a link, otherwise a button; the union stops mixing the two
type DashedButtonProps =
  | (BaseProps & { to?: undefined; onClick: () => void; disabled?: boolean })
  | (BaseProps & { to: string; onClick?: () => void; disabled?: never })

const baseStyles =
  "group relative inline-flex items-center justify-center h-11 px-6 rounded-full text-[15px] font-extrabold cursor-pointer transition-colors duration-500 disabled:text-muted-ink disabled:cursor-not-allowed"

function DashedOutline() {
  return (
    <svg aria-hidden="true" className="absolute top-px left-px w-[calc(100%-2px)] h-[calc(100%-2px)] overflow-visible pointer-events-none">
      <rect
        width="100%"
        height="100%"
        rx="21"
        pathLength="100"
        className="fill-none stroke-ink stroke-2 group-disabled:stroke-muted [stroke-dasharray:2_2] group-hover:[stroke-dasharray:4_0] group-disabled:[stroke-dasharray:2_2] transition-[stroke-dasharray] duration-200"
      />
    </svg>
  )
}

// a pill with a dashed outline whose dashes grow into a solid line on hover
export default function DashedButton(props: DashedButtonProps) {
  const className = `${baseStyles} ${props.className ?? ""}`

  if (props.to !== undefined) {
    return (
      <Link to={props.to} onClick={props.onClick} className={className}>
        <DashedOutline />
        {props.children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={props.onClick} disabled={props.disabled} className={className}>
      <DashedOutline />
      {props.children}
    </button>
  )
}
