import { useState } from "react"
import DiscountBadge from "./DiscountBadge"

const galleryColors = ["bg-[#7FC7BD]", "bg-[#B5E655]", "bg-[#4CB6C2]"]

type ProductGalleryProps = {
  images: string[]
  title: string
  discount: number
}

export default function ProductGallery({ images, title, discount }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedColor = galleryColors[selectedIndex % galleryColors.length]

  return (
    <div className="flex flex-col gap-4">
      <div className={`relative aspect-square border-2 border-[#12424A] rounded-3xl overflow-hidden ${selectedColor}`}>
        <img src={images[selectedIndex]} alt={title} className="w-full h-full object-contain p-8" />
        <DiscountBadge discount={discount} />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => {
            const isSelected = index === selectedIndex
            const color = galleryColors[index % galleryColors.length]
            return (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={isSelected}
                className={`w-20 h-20 border-2 border-[#12424A] rounded-2xl overflow-hidden ${color} ${isSelected ? "border-solid shadow-[3px_3px_0_#12424A]" : "border-dashed"}`}
              >
                <img src={image} alt="" loading="lazy" className="w-full h-full object-contain p-2" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
