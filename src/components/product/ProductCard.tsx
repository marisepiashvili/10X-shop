import starIcon from "../../assets/icons/star.svg"
import DiscountBadge from "./DiscountBadge"
import StockPill from "./StockPill"
import type {Product} from "./product"
import { Link } from "react-router"
import useCart from "../../hooks/useCart"


const imageBgColors = ["bg-pink", "bg-yellow", "bg-mint", "bg-sky"]
const cardTilts = ["-rotate-[1.5deg]", "rotate-1", "-rotate-[0.5deg]", "rotate-[1.5deg]", "rotate-[0.5deg]", "-rotate-1"]


export default function ProductCard({product}: {product: Product}) {
    const bgColor = imageBgColors[product.id % imageBgColors.length]
    const tilt = cardTilts[product.id % cardTilts.length]
    const discountedPrice = product.price - (product.price * product.discountPercentage/100)
    const discount = Math.round(product.discountPercentage)
    const isOutOfStock = product.stock === 0
    const isLowStock = product.stock > 0 && product.stock <= 5
    const { addItem } = useCart()

  return (
    <article className={`relative h-full flex flex-col p-3 bg-white rounded-card shadow-card transition ${tilt} motion-safe:hover:rotate-0`}>
        {/* image */}
     <Link to={`/products/${product.id}`} className={`block aspect-square rounded-[20px] ${bgColor}`}>
        <img className="w-full h-full object-contain p-4"
         src={product.thumbnail}
         alt={product.title}
         loading="lazy" />
      </Link>
      <DiscountBadge discount={discount}/>
      {isLowStock && (
        <span aria-hidden="true" className="absolute left-4.5 top-4.5 px-2.5 rounded-lg bg-yellow font-note text-[26px] -rotate-6">hurry!</span>
      )}
      {/* details */}
      <div className="px-1.5 pt-3.5 flex flex-col gap-1.5 flex-1">
        <span className="text-[13px] font-semibold capitalize">
            {product.category}{product.brand && ` · ${product.brand}`}
        </span>
        <h3 className="text-lg font-extrabold leading-tight line-clamp-2 min-h-[2lh]">
            <Link to={`/products/${product.id}`} className="hover:text-blue">{product.title}</Link>
        </h3>
        {/* price/rating */}
        <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl">${discountedPrice.toFixed(2)}</span>
                {discount > 0 && <span className="text-sm line-through">${product.price}</span>}
            </div>
            <div className="text-sm font-extrabold flex items-center gap-1">
                <img src={starIcon} alt="" className="w-4 h-4" />
                <span>{product.rating.toFixed(1)}</span>
            </div>
        </div>
        <StockPill stock={product.stock}/>
      </div>
      <div className="px-1.5 pt-3 pb-1">
        <button
        type="button"
        onClick={() => addItem(product, 1)}
        className="h-12 w-full rounded-full bg-ink text-white text-[17px] font-extrabold transition enabled:hover:bg-blue disabled:bg-muted disabled:text-muted-ink disabled:cursor-not-allowed"
        disabled={isOutOfStock}>{isOutOfStock ? "Out of stock" : "Add to cart"}</button>
      </div>
    </article>
  )
}
