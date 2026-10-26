import { ArrowRight, Search } from "lucide-react"
import { Link } from "react-router"
import { formatPrice, getDiscountedPrice } from "../../utils/price"
import type { Product } from "../product/product"

const stickerStyles = [
  { box: "left-[4%] top-8 w-58 -rotate-8 rounded-[26px]", well: "aspect-square rounded-[18px] bg-pink" },
  { box: "right-[2%] top-0 w-50 rotate-7 rounded-t-full rounded-b-[26px]", well: "aspect-[3/4] rounded-t-full rounded-b-[18px] bg-yellow" },
  { box: "left-[34%] top-72 w-62 rotate-3 rounded-[26px]", well: "aspect-[16/10] rounded-[18px] bg-mint" },
]

type HeroSectionProps = {
  total: number
  products: Product[]
}

export default function HeroSection({ total, products }: HeroSectionProps) {
  const stickers = products.slice(0, stickerStyles.length)

  return (
    <section className="bg-blue text-white overflow-hidden">
      <div className="max-w-330 mx-auto px-4 md:px-10 pt-18 pb-24 flex flex-wrap items-center gap-10 md:min-h-150">
        <div className="flex-[1_1_520px] min-w-0 flex flex-col gap-6">
          <h1 className="font-display text-7xl md:text-[116px] leading-[0.92]">
            Shop<br />10X<br />faster.
          </h1>
          <p className="text-xl leading-normal max-w-[34ch]">
            {total > 0 && `${total} products. `}Real discounts. Stock you can see — no small print.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/catalog"
              className="flex items-center gap-2 h-15.5 px-7.5 rounded-full bg-orange border-4 border-white text-lg font-extrabold shadow-sticker transition hover:-translate-y-0.5"
            >
              Start shopping <ArrowRight size={20} strokeWidth={2.4} />
            </Link>
            <Link
              to="/catalog?search=phone"
              className="flex items-center gap-2 h-15.5 px-6.5 rounded-full bg-white text-ink text-lg font-extrabold transition hover:-translate-y-0.5"
            >
              <Search size={20} strokeWidth={2.4} /> Search “phone”
            </Link>
          </div>
        </div>

        <div aria-hidden="true" className="hidden md:block relative flex-[1_1_460px] min-w-0 h-120">
          {stickers.map((product, index) => {
            const style = stickerStyles[index]
            return (
              <div key={product.id} className={`absolute p-2.5 bg-white text-ink shadow-[0_16px_30px_rgba(17,17,17,0.35)] ${style.box}`}>
                <div className={`overflow-hidden ${style.well}`}>
                  <img src={product.thumbnail} alt="" className="w-full h-full object-contain p-3" />
                </div>
                <p className="px-1.5 pt-2.5 pb-1 font-extrabold truncate">
                  {product.title} · {formatPrice(getDiscountedPrice(product.price, product.discountPercentage))}
                </p>
              </div>
            )
          })}
          <span className="absolute right-[4%] top-75 w-32.5 h-32.5 rounded-full bg-orange border-[5px] border-white grid place-items-center text-center font-display text-2xl leading-none -rotate-12 shadow-sticker">
            <span>
              −10%
              <span className="block mt-1 font-sans text-sm font-extrabold">code 10X10</span>
            </span>
          </span>
          <span className="absolute left-0 top-108 font-note text-4xl text-yellow -rotate-6">today's steals ↗</span>
        </div>
      </div>
    </section>
  )
}
