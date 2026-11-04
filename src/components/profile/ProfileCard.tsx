import { Link } from "react-router"
import type { AuthUser } from "../../types/user"

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

type ProfileCardProps = {
  user: AuthUser
  orderCount: number
}

export default function ProfileCard({ user, orderCount }: ProfileCardProps) {
  return (
    <aside className="relative flex-[0_1_300px] min-w-0 px-5 md:px-7 pt-6 md:pt-9 pb-5 md:pb-7 flex flex-col items-center gap-3 md:gap-4 text-center bg-pink border-[6px] border-sticker rounded-[36px] shadow-card -rotate-2">
      <span className="w-20 h-20 md:w-30 md:h-30 rounded-full bg-yellow border-4 md:border-[5px] border-sticker grid place-items-center font-display text-[28px] md:text-[40px] shadow-soft rotate-6">
        {getInitials(user.name)}
      </span>
      <div className="w-full flex flex-col gap-0.5">
        <strong className="font-display font-normal text-[22px] md:text-[26px] leading-tight wrap-break-word">{user.name}</strong>
        <span className="font-mono text-sm wrap-break-word">{user.email}</span>
      </div>
      <Link
        to="/orders"
        className="w-full flex items-center justify-between h-12 md:h-13 px-6 rounded-full bg-card font-extrabold shadow-soft transition hover:-translate-y-0.5"
      >
        <span>Orders</span>
        <span className="min-w-7.5 h-7.5 px-2 rounded-full bg-coal text-white grid place-items-center text-sm">{orderCount}</span>
      </Link>
      <span aria-hidden="true" className="absolute -right-6 -top-5 px-3.5 py-1.5 rounded-full bg-mint border-4 border-sticker font-display text-[15px] rotate-12">
        member
      </span>
    </aside>
  )
}
