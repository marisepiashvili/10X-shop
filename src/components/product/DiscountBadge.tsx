

export default function DiscountBadge({discount}: {discount:number}) {
  if (discount === 0) return null

  return (
  
    <div className="border-2 border-[#12424A] rounded-full w-12 h-12 bg-[#B5E655] flex items-center justify-center absolute top-2 right-2 rotate-15">
        <span className="text-[#12424A]">-{discount}%</span>
    </div>

  )
}
