import { Link } from "react-router"
import type { Category } from "../product/product"

const pillColors = ["bg-pink", "bg-yellow", "bg-mint", "bg-orange", "bg-sky"]
const pillTilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"]

export default function CategoryPills({ categories }: { categories: Category[] }) {
  return (
    <ul className="flex flex-wrap gap-4">
      {categories.map((category, index) => (
        <li key={category.slug}>
          <Link
            to={`/catalog?category=${category.slug}`}
            className={`flex items-center h-18.5 px-7.5 rounded-full border-4 border-white shadow-[0_8px_18px_rgba(17,17,17,0.18)] font-display text-2xl transition hover:rotate-0 hover:-translate-y-1 ${pillColors[index % pillColors.length]} ${pillTilts[index % pillTilts.length]}`}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
