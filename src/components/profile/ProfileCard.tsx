import { Link } from "react-router"
import type { AuthUser } from "../auth/authStorage"

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
    <aside className="relative flex-[0_1_300px] min-w-0 px-7 pt-9 pb-7 flex flex-col items-center gap-4 text-center bg-pink border-[6px] border-white rounded-[36px] shadow-card -rotate-2">
      <span className="w-30 h-30 rounded-full bg-yellow border-[5px] border-white grid place-items-center font-display text-[40px] shadow-soft rotate-6">
        {getInitials(user.name)}
      </span>
      <div className="w-full flex flex-col gap-0.5">
        <strong className="font-display font-normal text-[26px] leading-tight wrap-break-word">{user.name}</strong>
        <span className="font-mono text-sm wrap-break-word">{user.email}</span>
      </div>
      <Link
        to="/orders"
        className="w-full flex items-center justify-between h-13 px-6 rounded-full bg-white font-extrabold shadow-soft transition hover:-translate-y-0.5"
      >
        <span>Orders</span>
        <span className="min-w-7.5 h-7.5 px-2 rounded-full bg-ink text-white grid place-items-center text-sm">{orderCount}</span>
      </Link>
      <span aria-hidden="true" className="absolute -right-6 -top-5 px-3.5 py-1.5 rounded-full bg-mint border-4 border-white font-display text-[15px] rotate-12">
        member
      </span>
    </aside>
  )
}
