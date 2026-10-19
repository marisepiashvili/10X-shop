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
    const bgColor = imageBgColors[Math.floor(Math.random() * imageBgColors.length)]

  return (
    <div className="border-2 border-[#12424A] rounded-2xl flex flex-col w-60 h-120 overflow-hidden shadow-[6px_6px_0_#12424A] transition hover:-translate-y-1 hover:shadow-[8px_10px_0_#12424A]
">
        {/* image */}
      <div className={`border-b-2 border-[#12424A] w-full h-1/2 relative ${bgColor}`}>
        <img className="w-full h-full object-contain p-4"
         src={product.thumbnail} 
         alt={product.title} />
         <DiscountBadge/>
      </div>
      {/* details */}
      <div className="p-3 flex flex-col gap-2 bg-white h-full">
        <div className="text-[#3E6F73] text-sm">
            <span>Beauty . </span>
            <span>Essence</span>
        </div>
        <h3 className="text-[#12424A] text-2xl line-clamp-2">Essence Mascara Lash Princess</h3>
        {/* price/rating */}
        <div className="text-[#12424A] flex justify-between">
            <div>
                <span className="text-xl font-bold">$9.27</span>
                <span className="text-[#3E6F73] text-sm line-through ml-1">$9.99</span>
            </div>
            <div className="text-sm flex gap-1">
                <img src={starIcon} alt="star icon" className="w-4 h-4" />
                <span>4.9</span>
            </div>
        </div>
        {/* stock pill */}
        <StockPill/>
        {/* if item is out of stoke the text must be "Out of stock", button must be disabled, bg-white and border dashed */}
        <button className="text-[#12424A] border-2 rounded-3xl border-[#12424A] bg-[#B5E655] p-2 w-full text-xl mt-auto">Add to cart</button>
      </div>
    </div>
  )
}
