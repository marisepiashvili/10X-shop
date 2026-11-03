import useReviews from "../../hooks/useReviews"
import type { Product } from "./product"
import ProductGallery from "./ProductGallery"
import ProductInfo from "./ProductInfo"
import ProductTabs from "./ProductTabs"

// owns the reviews so the rating summary and the Reviews tab stay in sync
export default function ProductDetails({ product }: { product: Product }) {
  const { reviews, averageRating, addReview } = useReviews(product)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <ProductGallery
          images={product.images}
          title={product.title}
          discount={Math.round(product.discountPercentage)}
        />
        <ProductInfo product={product} rating={averageRating} reviewCount={reviews.length} />
      </div>
      <ProductTabs product={product} reviews={reviews} onAddReview={addReview} />
    </>
  )
}
