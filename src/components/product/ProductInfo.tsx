import { useState } from "react"
import starIcon from "../../assets/icons/star.svg"
import { formatPrice, getDiscountedPrice } from "../../utils/price"
import type { Product } from "./product"
import QuantityStepper from "./QuantityStepper"
import StockPill from "./StockPill"

export default function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage)
  const isOutOfStock = product.stock === 0
  const reviewCount = product.reviews.length

  return (
    <div className="flex flex-col gap-5.5 pt-2">
      <div className="flex flex-wrap gap-2.5 text-sm font-extrabold">
        {product.brand && (
          <span className="px-4 py-1.5 rounded-full bg-white shadow-soft">{product.brand}</span>
        )}
        <span className="px-4 py-1.5 rounded-full bg-sky capitalize -rotate-2">{product.category}</span>
      </div>

      <h1 className="font-display text-5xl md:text-7xl leading-[0.95]">{product.title}</h1>

      <div className="flex items-center gap-2 font-semibold">
        <img src={starIcon} alt="" className="w-5 h-5" />
        <strong>{product.rating.toFixed(1)}</strong>
        <span aria-hidden="true">·</span>
        <span>{reviewCount} {reviewCount === 1 ? "review" : "reviews"}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3.5">
        <span className="font-display text-[52px] leading-none">{formatPrice(discountedPrice)}</span>
        <span className="text-[22px] font-semibold line-through">{formatPrice(product.price)}</span>
        <StockPill stock={product.stock} />
      </div>

      <p className="text-lg leading-relaxed max-w-[54ch]">{product.description}</p>

      <div className="flex flex-wrap items-center gap-3.5 pt-1.5">
        <QuantityStepper value={quantity} max={product.stock} onChange={setQuantity} />
        <button
          type="button"
          disabled={isOutOfStock}
          className="flex-1 basis-60 h-15 rounded-full bg-orange text-white border-4 border-white text-lg font-extrabold shadow-sticker transition enabled:hover:-translate-y-0.5 disabled:bg-muted disabled:text-muted-ink disabled:shadow-none disabled:cursor-not-allowed"
        >
          {isOutOfStock ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </div>
  )
}
