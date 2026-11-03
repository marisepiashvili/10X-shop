import { NavLink } from "react-router";

type NavPillProps = {
    to: string
    children: React.ReactNode
    onClick?: () => void
}

export default function NavPill({to, children, onClick} : NavPillProps) {
  return (
   <li>
    <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => `flex items-center h-12 px-4 rounded-full border-[3px] font-extrabold transition ${isActive ? "bg-yellow border-sticker shadow-soft -rotate-2" : "border-transparent hover:bg-card hover:border-card hover:shadow-soft hover:rotate-2 hover:-translate-y-0.5"}`}>{children}</NavLink>
   </li>
  )
}
