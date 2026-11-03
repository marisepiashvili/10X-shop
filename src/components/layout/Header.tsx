import { Menu, X } from "lucide-react"
import { startTransition, useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router"
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
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(pathname)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // close the mobile menu whenever the page changes
  if (pathname !== menuPath) {
    setMenuPath(pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleLogout() {
    closeMenu()
    // one transition for both, so a protected page never renders logged out and sends you to /login
    startTransition(() => {
      navigate("/")
      logout()
    })
  }

  const cartLink = (
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        `flex items-center gap-2.5 h-12 pl-5 ${totals.itemCount > 0 ? "pr-3" : "pr-5"} rounded-full text-white font-extrabold transition hover:-translate-y-0.5 ${isActive ? "bg-blue" : "bg-coal"}`
      }
    >
      Cart
      {totals.itemCount > 0 && (
        <span
          key={totals.itemCount}
          className="min-w-6.5 h-6.5 px-1.5 rounded-full bg-pink text-ink text-[13px] grid place-items-center motion-safe:animate-pop"
        >
          {totals.itemCount}
        </span>
      )}
    </NavLink>
  )

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className="w-12 h-12 rounded-full grid place-items-center transition hover:bg-card"
    >
      <img src={isDark ? sunIcon : moonIcon} alt="" className="w-5 h-5 dark:invert" />
    </button>
  )

  const authControl = user ? (
    <button type="button" onClick={handleLogout} className="flex items-center h-12 px-3 text-[15px] font-semibold underline hover:text-accent">
      Log out
    </button>
  ) : (
    <Link to="/login" onClick={closeMenu} className="flex items-center h-12 px-3 text-[15px] font-semibold underline hover:text-accent">
      Log in
    </Link>
  )

  return (
    <header className="md:sticky md:top-0 z-40 bg-paper/90 backdrop-blur-md">
      <div className="max-w-330 mx-auto px-4 md:px-10 py-4.5 flex items-center justify-between gap-3 md:gap-5">
        <Link
          to="/"
          aria-label="10X Shop, home"
          className="shrink-0 whitespace-nowrap font-display text-xl sm:text-2xl md:text-3xl px-3 sm:px-4 pt-1 pb-1.5 rounded-[14px] bg-orange text-white border-4 border-sticker shadow-soft -rotate-3"
        >
          10X SHOP
        </Link>

        {/* desktop */}
        <div className="hidden md:flex flex-wrap items-center gap-1.5">
          <nav aria-label="Main">
            <ul className="flex flex-wrap items-center gap-1.5">
              <NavPill to="/catalog">Catalog</NavPill>
              <NavPill to="/orders">Orders</NavPill>
              <NavPill to="/profile">Profile</NavPill>
              <li>{cartLink}</li>
            </ul>
          </nav>
          {themeButton}
          {authControl}
        </div>

        {/* mobile: the cart stays in reach, everything else goes into the menu */}
        <div className="flex md:hidden items-center gap-2">
          {cartLink}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="w-12 h-12 rounded-full grid place-items-center bg-card shadow-soft transition hover:-translate-y-0.5"
          >
            {menuOpen ? <X size={22} strokeWidth={2.6} /> : <Menu size={22} strokeWidth={2.6} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden max-w-330 mx-auto px-4 pb-5 flex flex-col gap-3">
          <nav aria-label="Main">
            <ul className="flex flex-col gap-1.5">
              <NavPill to="/catalog" onClick={closeMenu}>Catalog</NavPill>
              <NavPill to="/orders" onClick={closeMenu}>Orders</NavPill>
              <NavPill to="/profile" onClick={closeMenu}>Profile</NavPill>
            </ul>
          </nav>
          <div className="flex items-center justify-between border-t-2 border-dashed border-ink pt-3">
            {themeButton}
            {authControl}
          </div>
        </div>
      )}
    </header>
  )
}
