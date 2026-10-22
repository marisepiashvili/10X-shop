import { Link, useParams } from "react-router"
import chevronLeftIcon from "../assets/icons/chevron-left.svg"
import ProductGallery from "../components/product/ProductGallery"
import ProductInfo from "../components/product/ProductInfo"
import ProductTabs from "../components/product/ProductTabs"
import RelatedProducts from "../components/product/RelatedProducts"
import useProduct from "../hooks/useProduct"

export default function ProductPage() {
  const { id } = useParams()
  const productId = Number(id)
  const isValidId = Number.isInteger(productId) && productId > 0
  const { product, loading, error } = useProduct(isValidId ? productId : null)

  let content: React.ReactNode
  if (!isValidId) {
    content = <p className="text-center text-xl text-[#12424A]">Product not found</p>
  } else if (loading) {
    content = <p className="text-center text-xl text-[#12424A]">Loading...</p>
  } else if (error || !product) {
    content = <p className="text-center text-xl text-[#C4102C]">{error ?? "Product not found"}</p>
  } else {
    content = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ProductGallery
            images={product.images}
            title={product.title}
            discount={Math.round(product.discountPercentage)}
          />
          <ProductInfo product={product} />
        </div>
        <ProductTabs product={product} />
        <RelatedProducts category={product.category} currentId={product.id} />
      </>
    )
  }

  return (
    <div className="max-w-266 mx-auto px-4 py-8 flex flex-col gap-8">
      <Link to="/" className="flex items-center gap-2 w-fit text-sm text-[#12424A] hover:underline">
        <img src={chevronLeftIcon} alt="" className="w-4 h-4" />
        Back to catalog
      </Link>
      {content}
    </div>
  )
}
