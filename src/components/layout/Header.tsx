import { Link, NavLink } from "react-router"
import moonIcon from "../../assets/icons/moon.svg"
import NavPill from "./NavPill"
import useCart from "../../hooks/useCart"
import useAuth from "../../hooks/useAuth"

export default function Header() {
  const { totals } = useCart()
  const {user, logout} = useAuth()
  return (
    <header className="md:sticky md:top-0 z-40 bg-paper/90 backdrop-blur-md">
      <div className="max-w-330 mx-auto px-4 md:px-10 py-4.5 flex flex-wrap items-center justify-between gap-5">
        <Link
          to="/"
          aria-label="10X Shop, home"
          className="font-display text-3xl px-4 pt-1 pb-1.5 rounded-[14px] bg-orange text-white border-4 border-white shadow-soft -rotate-3"
        >
          10X SHOP
        </Link>

        <div className="flex flex-wrap items-center gap-1.5">
          <nav aria-label="Main">
            <ul className="flex flex-wrap items-center gap-1.5">
              <NavPill to="/catalog">Catalog</NavPill>
              <NavPill to="/orders">Orders</NavPill>
              <NavPill to="/profile">Profile</NavPill>
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 h-12 pl-5 pr-3 rounded-full text-white font-extrabold transition hover:-translate-y-0.5 ${isActive ? "bg-blue" : "bg-ink"}`
                  }
                >
                  Cart
                  <span
                    key={totals.itemCount}
                    className="min-w-6.5 h-6.5 px-1.5 rounded-full bg-pink text-ink text-[13px] grid place-items-center motion-safe:animate-pop"
                  >
                    {totals.itemCount}
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            aria-label="Toggle dark mode"
            className="w-12 h-12 rounded-full grid place-items-center transition hover:bg-white"
          >
            <img src={moonIcon} alt="" className="w-5 h-5" />
          </button>
          {user ? (
            <button type="button" onClick={logout} className="flex items-center h-12 px-3 text-[15px] font-semibold underline hover:text-blue">
              Log out
            </button>
          ) : (
            <Link to="/login" className="flex items-center h-12 px-3 text-[15px] font-semibold underline hover:text-blue">
            Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
