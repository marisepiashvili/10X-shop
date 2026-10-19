import starIcon from "../../assets/icons/star.svg"
import DiscountBadge from "./DiscountBadge"
import StockPill from "./StockPill"

export default function ProductCard() {
  return (
    <div className="border-2 border-[#12424A] rounded-2xl flex flex-col w-60 h-120">
        {/* image */}
      <div className="border-b-2 border-[#12424A] w-full h-1/2 relative">
        {/* <img src="" alt="" /> */}
        <div></div>
         <DiscountBadge/>
      </div>
      {/* details */}
      <div className="p-2 flex flex-col gap-2">
        <div className="text-[#3E6F73] text-sm">
            <span>Beauty . </span>
            <span>Essence</span>
        </div>
        <h3 className="text-[#12424A] text-2xl">Essence Mascara Lash Princess</h3>
        {/* price/rating */}
        <div className="text-[#12424A] flex justify-between">
            <div>
                <span className="text-xl">$9.27</span>
                <span className="text-[#3E6F73] text-sm line-through">$9.99</span>
            </div>
            <div className="text-sm flex gap-1">
                <img src={starIcon} alt="star icon" className="w-4 h-4" />
                <span>4.9</span>
            </div>
        </div>
        {/* stock pill */}
        <StockPill/>
        {/* if item is out of stoke the text must be "Out of stock", button must be disabled, bg-white and border dashed */}
        <button className="text-[#12424A] border-2 rounded-3xl border-[#12424A] bg-[#B5E655] p-2 w-full text-xl">Add to cart</button>
      </div>
    </div>
  )
}
