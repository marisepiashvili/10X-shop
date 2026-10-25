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
    className={({ isActive }) => `flex items-center h-12 px-4 rounded-full border-[3px] font-extrabold transition ${isActive ? "bg-yellow border-white shadow-soft -rotate-2" : "border-transparent hover:bg-white hover:border-white hover:shadow-soft hover:rotate-2 hover:-translate-y-0.5"}`}>{children}</NavLink>
   </li>
  )
}
