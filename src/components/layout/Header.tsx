import { Link, NavLink } from "react-router"
import moonIcon from "../../assets/icons/moon.svg"
import sunIcon from "../../assets/icons/sun.svg"
import NavPill from "./NavPill"
import useCart from "../../hooks/useCart"
import useAuth from "../../hooks/useAuth"
import useTheme from "../../hooks/useTheme"

export default function Header() {
  const { totals } = useCart()
  const {user, logout} = useAuth()
  const { isDark, toggleTheme } = useTheme()
  return (
    <header className="md:sticky md:top-0 z-40 bg-paper/90 backdrop-blur-md">
      <div className="max-w-330 mx-auto px-4 md:px-10 py-4.5 flex flex-wrap items-center justify-between gap-5">
        <Link
          to="/"
          aria-label="10X Shop, home"
          className="font-display text-3xl px-4 pt-1 pb-1.5 rounded-[14px] bg-orange text-white border-4 border-sticker shadow-soft -rotate-3"
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
                    `flex items-center gap-2.5 h-12 pl-5 pr-3 rounded-full text-white font-extrabold transition hover:-translate-y-0.5 ${isActive ? "bg-blue" : "bg-coal"}`
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
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            aria-pressed={isDark}
            className="w-12 h-12 rounded-full grid place-items-center transition hover:bg-card"
          >
            <img src={isDark ? sunIcon : moonIcon} alt="" className="w-5 h-5 dark:invert" />
          </button>
          {user ? (
            <button type="button" onClick={logout} className="flex items-center h-12 px-3 text-[15px] font-semibold underline hover:text-accent">
              Log out
            </button>
          ) : (
            <Link to="/login" className="flex items-center h-12 px-3 text-[15px] font-semibold underline hover:text-accent">
            Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
