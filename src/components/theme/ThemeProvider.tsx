import { useState } from "react"
import { ThemeContext } from "./ThemeContext"

const THEME_KEY = "shop_theme"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // index.html sets the class before the first paint, so it is the starting value
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"))

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem(THEME_KEY, next ? "dark" : "light")
  }

  return <ThemeContext value={{ isDark, toggleTheme }}>{children}</ThemeContext>
}
