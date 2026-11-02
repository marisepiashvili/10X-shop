import { useState } from "react"

const THEME_KEY = "shop_theme"

export default function useTheme() {
    const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"))

    function toggleTheme() {
        const next = !isDark
        setIsDark(next)
        document.documentElement.classList.toggle("dark", next)
        localStorage.setItem(THEME_KEY, next ? "dark" : "light")
    }

    return { isDark, toggleTheme }
}
