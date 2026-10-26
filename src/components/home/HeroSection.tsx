import { ArrowRight, Search } from "lucide-react"
import { Link } from "react-router"
import { formatPrice, getDiscountedPrice } from "../../utils/price"
import type { Product } from "../product/product"

// left card, raised middle card (arch), right card
const fanStyles = [
  { card: "w-32 sm:w-48 lg:w-56 -mr-8 sm:-mr-10 -rotate-6 translate-y-5", well: "aspect-square rounded-[18px] bg-pink" },
  { card: "w-36 sm:w-52 lg:w-60 z-10", well: "aspect-[4/5] rounded-t-full rounded-b-lg bg-yellow" },
  { card: "w-32 sm:w-48 lg:w-56 -ml-8 sm:-ml-10 rotate-5 translate-y-5", well: "aspect-square rounded-[18px] bg-mint" },
]

const LOW_STOCK = 10

type HeroSectionProps = {
  total: number
  products: Product[]
}

export default function HeroSection({ total, products }: HeroSectionProps) {
  const fanProducts = products.slice(0, fanStyles.length)
  const inStock = fanProducts.filter((product) => product.stock > 0)
  const lowestStock = Math.min(...inStock.map((product) => product.stock))
  const note = lowestStock <= LOW_STOCK ? `only ${lowestStock} left!` : "today's steals"

  return (
    <section className="relative isolate">
      {/* blue band stops halfway down the cards so they overlap the page below */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 bottom-24 sm:bottom-32 lg:bottom-36 -z-10 bg-blue" />

      <div className="max-w-330 mx-auto px-4 md:px-10 pt-16 md:pt-18 flex flex-col items-center gap-6 text-center text-white">
        <h1 className="font-display text-6xl md:text-8xl lg:text-[116px] leading-[0.92]">Shop 10X faster.</h1>
        <p className="text-xl leading-normal max-w-[34ch]">
          {total > 0 && `${total} products. `}Real discounts. Stock you can see — no small print.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/catalog"
            className="flex items-center gap-2 h-15.5 px-7.5 rounded-full bg-orange border-4 border-white text-lg font-extrabold shadow-sticker transition hover:-translate-y-0.5"
          >
            Start shopping <ArrowRight size={20} strokeWidth={2.4} />
          </Link>
          <Link
            to="/catalog"
            className="flex items-center gap-2 h-15.5 px-6.5 rounded-full bg-white text-ink text-lg font-extrabold transition hover:-translate-y-0.5"
          >
            <Search size={20} strokeWidth={2.4} /> Search product
          </Link>
        </div>
      </div>

      {fanProducts.length > 0 && (
        <div className="relative mt-14 pb-6 flex justify-center items-start">
          <span
            aria-hidden="true"
            className="hidden xl:grid absolute left-[calc(50%-420px)] top-2 z-20 w-32.5 h-32.5 rounded-full bg-orange text-white border-[5px] border-white place-items-center text-center font-display text-2xl leading-none -rotate-12 shadow-sticker"
          >
            <span>
              −10%
              <span className="block mt-1 font-sans text-sm font-extrabold">code 10X10</span>
            </span>
          </span>

          {fanProducts.map((product, index) => {
            const style = fanStyles[index]
            const price = formatPrice(getDiscountedPrice(product.price, product.discountPercentage))
            return (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                aria-label={`${product.title}, ${price}`}
                className={`relative shrink-0 p-2 sm:p-2.5 bg-white rounded-[22px] text-ink shadow-[0_16px_30px_rgba(17,17,17,0.25)] transition duration-300 motion-safe:hover:rotate-0 motion-safe:hover:-translate-y-2 ${style.card}`}
              >
                <span className={`block overflow-hidden ${style.well}`}>
                  <img src={product.thumbnail} alt="" className="w-full h-full object-contain p-3" />
                </span>
                <span className="block px-1 pt-2.5 pb-1.5 text-center">
                  <span className="block text-xs sm:text-sm font-extrabold truncate">{product.title}</span>
                  <span className="block text-base sm:text-lg font-extrabold">{price}</span>
                </span>
              </Link>
            )
          })}

          <span aria-hidden="true" className="hidden xl:block absolute left-[calc(50%+330px)] top-16 font-note text-4xl text-yellow -rotate-6 whitespace-nowrap">
            ↙ {note}
          </span>
        </div>
      )}
    </section>
  )
}
