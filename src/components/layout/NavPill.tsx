import { NavLink } from "react-router";

type NavPillProps = {
    to: string
    children: React.ReactNode
}

export default function NavPill({to, children} : NavPillProps) {
  return (
   <li>
    <NavLink
    to={to}
    end
    className={({ isActive }) => `flex items-center h-12 px-4 rounded-full font-extrabold transition hover:text-blue ${isActive ? "bg-yellow border-[3px] border-white shadow-soft -rotate-2" : ""}`}>{children}</NavLink>
   </li>
  )
}
