export default function StockPill({stock}: {stock:number}) {
  let text: string
  let colorStyles: string

  if (stock === 0) {
    text = "Out of stock"
    colorStyles = "bg-muted text-muted-ink"
  } else if (stock <= 5) {
    text = `Only ${stock} left!`
    colorStyles = "bg-yellow"
  } else {
    text = "In stock"
    colorStyles = "bg-mint"
  }

  return (
    <span className={`self-start px-3 py-1 rounded-full text-[13px] font-extrabold ${colorStyles}`}>{text}</span>
  )
}
