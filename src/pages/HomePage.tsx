import { Link } from "react-router"
import CategoryPills from "../components/home/CategoryPills"
import HeroSection from "../components/home/HeroSection"
import ProductGrid from "../components/product/ProductGrid"
import LoadingState from "../components/ui/LoadingState"
import MessagePanel from "../components/ui/MessagePanel"
import useCategories from "../hooks/useCategories"
import useProducts from "../hooks/useProducts"

const DEALS_COUNT = 4
const HERO_COUNT = 3
const FEATURED_CATEGORIES = 8

export default function HomePage() {
  const { products, total, loading, error } = useProducts({ search: "", category: "all", sort: "discount-desc", page: 1 })
  const categories = useCategories()

  const deals = products.slice(0, DEALS_COUNT)
  const heroProducts = products.slice(DEALS_COUNT, DEALS_COUNT + HERO_COUNT)

  let dealsContent: React.ReactNode
  if (loading) {
    dealsContent = <LoadingState />
  } else if (error) {
    dealsContent = <MessagePanel variant="error" title="Could not load deals" note={error} />
  } else {
    dealsContent = <ProductGrid products={deals} />
  }

  return (
    <>
      <HeroSection total={total} products={heroProducts} />

      <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-18 pb-24 flex flex-col gap-20">
        {categories.length > 0 && (
          <section aria-labelledby="home-categories" className="flex flex-col gap-6">
            <h2 id="home-categories" className="font-display text-4xl md:text-5xl">Pick a vibe</h2>
            <CategoryPills categories={categories.slice(0, FEATURED_CATEGORIES)} />
          </section>
        )}

        <section aria-labelledby="home-deals" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="home-deals" className="font-display text-4xl md:text-5xl">Steals of the day</h2>
            <Link to="/catalog" className="text-[17px] font-extrabold hover:text-blue">See all products →</Link>
          </div>
          {dealsContent}
        </section>
      </div>
    </>
  )
}
