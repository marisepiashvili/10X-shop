import { useState } from "react"
import { STORAGE_KEYS } from "../../utils/storageKeys"
import { ThemeContext } from "./ThemeContext"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // index.html sets the class before the first paint, so it is the starting value
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"))

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    // a plain "dark"/"light" string, not StorageService's JSON: index.html reads it before React loads
    localStorage.setItem(STORAGE_KEYS.theme, next ? "dark" : "light")
  }

  return <ThemeContext value={{ isDark, toggleTheme }}>{children}</ThemeContext>
}
