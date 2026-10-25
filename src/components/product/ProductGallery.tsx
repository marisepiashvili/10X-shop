import { useState } from "react"
import DiscountBadge from "./DiscountBadge"

const galleryColors = ["bg-pink", "bg-yellow", "bg-mint", "bg-sky"]
const thumbTilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"]

type ProductGalleryProps = {
  images: string[]
  title: string
  discount: number
}

export default function ProductGallery({ images, title, discount }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedColor = galleryColors[selectedIndex % galleryColors.length]

  return (
    <div className="flex flex-col gap-5.5">
      <div className="relative p-3 bg-white rounded-[36px] shadow-[0_20px_36px_rgba(17,17,17,0.2)] -rotate-[1.5deg]">
        <div className={`aspect-square rounded-[26px] overflow-hidden ${selectedColor}`}>
          <img src={images[selectedIndex]} alt={title} className="w-full h-full object-contain p-8" />
        </div>
        <DiscountBadge discount={discount} size="lg" />
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-4">
          {images.map((image, index) => {
            const isSelected = index === selectedIndex
            const color = galleryColors[index % galleryColors.length]
            const tilt = thumbTilts[index % thumbTilts.length]
            return (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={isSelected}
                className={`w-24 h-24 p-1.5 rounded-[22px] bg-white transition ${tilt} ${isSelected ? "ring-4 ring-blue" : "shadow-soft hover:-translate-y-0.5"}`}
              >
                <span className={`block w-full h-full rounded-2xl overflow-hidden ${color}`}>
                  <img src={image} alt="" loading="lazy" className="w-full h-full object-contain p-2" />
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
