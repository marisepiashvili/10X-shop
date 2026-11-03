import useTheme from "../../hooks/useTheme"

export default function ThemeCard() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <section className="p-7 flex flex-wrap items-center justify-between gap-4 bg-card rounded-[30px] shadow-card rotate-[0.4deg]">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl">Appearance</h2>
        <p className="text-[15px] leading-normal">{isDark ? "Dark mode is on." : "Light mode is on."}</p>
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        aria-pressed={isDark}
        className="h-12 px-7 rounded-full bg-coal text-white text-[17px] font-extrabold transition hover:bg-blue"
      >
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </button>
    </section>
  )
}
