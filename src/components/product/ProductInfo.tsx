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
    <div className="flex flex-col gap-5 text-[#12424A]">
      <div className="flex flex-wrap gap-2 text-xs">
        {product.brand && (
          <span className="border-2 border-[#12424A] rounded-full px-3 py-0.5 bg-white">{product.brand}</span>
        )}
        <span className="border-2 border-[#12424A] rounded-full px-3 py-0.5 bg-[#4CB6C2] capitalize">{product.category}</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold leading-tight">{product.title}</h1>

      <div className="flex items-center gap-2 text-sm">
        <img src={starIcon} alt="" className="w-4 h-4" />
        <span className="font-bold">{product.rating.toFixed(1)}</span>
        <span className="text-[#3E6F73]">· {reviewCount} {reviewCount === 1 ? "review" : "reviews"}</span>
      </div>

      <div className="flex items-center justify-between border-y-2 border-[#12424A] py-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{formatPrice(discountedPrice)}</span>
          <span className="text-[#3E6F73] line-through">{formatPrice(product.price)}</span>
        </div>
        <StockPill stock={product.stock} />
      </div>

      <p className="text-[#3E6F73] leading-relaxed">{product.description}</p>

      <div className="flex gap-3">
        <QuantityStepper value={quantity} max={product.stock} onChange={setQuantity} />
        <button
          type="button"
          disabled={isOutOfStock}
          className="flex-1 h-12 rounded-full border-2 border-[#12424A] bg-[#12424A] text-white text-xl shadow-[4px_4px_0_#B5E655] transition enabled:hover:-translate-y-0.5 enabled:active:translate-y-0 enabled:active:shadow-none disabled:bg-white disabled:text-[#3E6F73] disabled:border-dashed disabled:shadow-none disabled:cursor-not-allowed"
        >
          {isOutOfStock ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </div>
  )
}
