import { Link } from "react-router"
import type { Category } from "../../types/product"

const pillColors = ["bg-pink", "bg-yellow", "bg-mint", "bg-orange", "bg-sky"]
const pillTilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"]

export default function CategoryPills({ categories }: { categories: Category[] }) {
  return (
    // on phones two-word names wrap inside the pill (w-min), so all 8 fit in 3 rows without scrolling
    <ul className="flex flex-wrap gap-x-2 gap-y-3 md:gap-4">
      {categories.map((category, index) => (
        <li key={category.slug}>
          <Link
            to={`/catalog?category=${category.slug}`}
            className={`flex items-center justify-center text-center w-min h-11 px-3 md:w-auto md:whitespace-nowrap md:h-18.5 md:px-7.5 rounded-full border-[3px] md:border-4 border-sticker shadow-[0_6px_12px_rgba(17,17,17,0.16)] md:shadow-[0_8px_18px_rgba(17,17,17,0.18)] font-display text-[13px] leading-tight md:text-2xl text-on-bright transition hover:rotate-0 hover:-translate-y-1 ${pillColors[index % pillColors.length]} ${pillTilts[index % pillTilts.length]}`}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
