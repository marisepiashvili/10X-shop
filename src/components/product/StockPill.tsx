

export default function StockPill({stock}: {stock:number}) {
const baseStyles = "border-2 rounded-2xl px-2 py-0.5 text-sm"
let text: string
let colorStyles: string

if(stock === 0){
  text = "Out of stock"
  colorStyles = "border-[#C4102C] text-[#C4102C] bg-[#FFE0E3]"
} else if(stock <=5){
  text = `Only ${stock} left!`
  colorStyles = "border-[#A04400] text-[#A04400] bg-[#FFE7C7]"
}else{
  text = "In stock"
  colorStyles = "border-[#0B7A3B] text-[#0B7A3B] bg-[#c3f4d8]"
}

  return (

    
    <div>
        {/* if the stock is between 1-5 the text mus be "Only N left!" border-[#A04400] bg-[#FFE7C7] / if its out of stoke "Out of stock" border-[#C4102C]/otherwise "In stock"*/}
        <span className={`${baseStyles} ${colorStyles}`}>{text}</span>
    </div>
)
}
