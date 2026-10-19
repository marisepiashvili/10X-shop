

export default function StockPill() {
  return (
    <div>
        {/* if the stock is between 1-5 the text mus be "Only N left!" border-[#A04400] bg-[#FFE7C7] / if its out of stoke "Out of stock" border-[#C4102C]/otherwise "In stock"*/}
        <span className="border-2 border-[#0B7A3B] rounded-2xl text-[#0B7A3B] bg-[#c3f4d8] p-1 text-sm">In stock</span>
    </div>
)
}
