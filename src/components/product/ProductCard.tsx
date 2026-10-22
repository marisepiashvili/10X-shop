import starIcon from "../../assets/icons/star.svg"
import DiscountBadge from "./DiscountBadge"
import StockPill from "./StockPill"
import type {Product} from "./product"

const imageBgColors = [
  "bg-[#7FC7BD]",
  "bg-[#4CB6C2]",
  "bg-[#9DBFC0]",
]


export default function ProductCard({product}: {product: Product}) {
    const bgColor = imageBgColors[product.id % imageBgColors.length]
    const discountedPrice = product.price - (product.price * product.discountPercentage/100)
    const discount = Math.round(product.discountPercentage)
    const isOutOfStock = product.stock === 0

  return (
    <div className="border-2 border-[#12424A] rounded-2xl flex flex-col w-full h-120 overflow-hidden shadow-[6px_6px_0_#12424A] transition hover:-translate-y-1 hover:shadow-[8px_10px_0_#12424A]
">
        {/* image */}
      <div className={`border-b-2 border-[#12424A] w-full h-1/2 relative ${bgColor}`}>
        <img className="w-full h-full object-contain p-4"
         src={product.thumbnail} 
         alt={product.title} />
         <DiscountBadge discount={discount}/>
      </div>
      {/* details */}
      <div className="p-3 flex flex-col gap-2 bg-white h-full">
        <div className="text-[#3E6F73] text-sm capitalize">
            <span>{product.category} . </span>
            <span>{product.brand}</span>
        </div>
        <h3 className="text-[#12424A] text-2xl line-clamp-2 min-h-[2lh]
          ">{product.title}</h3>
        {/* price/rating */}
        <div className="text-[#12424A] flex justify-between items-center">
            <div>
                <span className="text-xl font-bold">${discountedPrice.toFixed(2)}</span>
                <span className="text-[#3E6F73] text-sm line-through ml-1">${product.price}</span>
            </div>
            <div className="text-sm flex gap-1">
                <img src={starIcon} alt="star icon" className="w-4 h-4" />
                <span>{product.rating.toFixed(1)}</span>
            </div>
        </div>
        {/* stock pill */}
        <StockPill stock={product.stock}/>
        {/* if item is out of stoke the text must be "Out of stock", button must be disabled, bg-white and border dashed */}
        <button 
        className="text-[#12424A] border-2 rounded-3xl border-[#12424A] bg-[#B5E655] p-2 w-full text-xl mt-auto disabled:bg-white disabled:border-dashed disabled:text-[#3E6F73] disabled:border-[#3E6F73] disabled:cursor-not-allowed transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#12424A] active:translate-x-0 active:translate-y-0 active:shadow-none"
        disabled={isOutOfStock}>{isOutOfStock ? "Out of stock" : "Add to cart"}</button>
      </div>
    </div>
  )
}
