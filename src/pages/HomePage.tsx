import { Link } from "react-router"
import PageTitle from "../components/layout/PageTitle"
import CategoryPills from "../components/home/CategoryPills"
import HeroSection from "../components/home/HeroSection"
import PromoMarquee from "../components/home/PromoMarquee"
import ProductGrid from "../components/product/ProductGrid"
import ProductGridSkeleton from "../components/product/ProductGridSkeleton"
import MessagePanel from "../components/ui/MessagePanel"
import useCategories from "../hooks/useCategories"
import useProducts from "../hooks/useProducts"

const DEALS_COUNT = 4
const HERO_COUNT = 3
const FEATURED_CATEGORIES = 8

export default function HomePage() {
  const { state, retry } = useProducts({ search: "", category: "all", sort: "discount-desc", page: 1 })
  const categories = useCategories()

  const products = state.status === "success" ? state.data.products : []
  const total = state.status === "success" ? state.data.total : 0
  const deals = products.slice(0, DEALS_COUNT)
  const heroProducts = products.slice(DEALS_COUNT, DEALS_COUNT + HERO_COUNT)

  let dealsContent: React.ReactNode
  if (state.status === "success") {
    dealsContent = <ProductGrid products={deals} />
  } else if (state.status === "error") {
    dealsContent = <MessagePanel variant="error" title="Could not load deals" note={state.message} action={{ label: "Retry", onClick: retry }} />
  } else {
    dealsContent = <ProductGridSkeleton count={DEALS_COUNT} />
  }

  return (
    <>
      <PageTitle />
      <HeroSection total={total} products={heroProducts} loading={state.status === "loading"} />

      <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-14 md:pt-18 pb-24 flex flex-col gap-14 md:gap-20">
        {categories.length > 0 && (
          <section aria-labelledby="home-categories" className="flex flex-col gap-6">
            <h2 id="home-categories" className="font-display text-3xl md:text-5xl">Pick a vibe</h2>
            <CategoryPills categories={categories.slice(0, FEATURED_CATEGORIES)} />
          </section>
        )}

        <section aria-labelledby="home-deals" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="home-deals" className="font-display text-3xl md:text-5xl">Steals of the day</h2>
            <Link to="/catalog" className="inline-flex items-center min-h-11 text-[17px] font-extrabold hover:text-accent">See all products →</Link>
          </div>
          {dealsContent}
        </section>
      </div>

      <PromoMarquee />
    </>
  )
}
