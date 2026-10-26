import { Link, useParams } from "react-router"
import chevronLeftIcon from "../assets/icons/chevron-left.svg"
import ProductGallery from "../components/product/ProductGallery"
import ProductInfo from "../components/product/ProductInfo"
import ProductTabs from "../components/product/ProductTabs"
import RelatedProducts from "../components/product/RelatedProducts"
import LoadingState from "../components/ui/LoadingState"
import MessagePanel from "../components/ui/MessagePanel"
import useProduct from "../hooks/useProduct"

export default function ProductPage() {
  const { id } = useParams()
  const productId = Number(id)
  const isValidId = Number.isInteger(productId) && productId > 0
  const { product, loading, error } = useProduct(isValidId ? productId : null)

  let content: React.ReactNode
  if (!isValidId) {
    content = <MessagePanel variant="empty" title="Product not found" note="check the link" />
  } else if (loading) {
    content = <LoadingState />
  } else if (error || !product) {
    content = <MessagePanel variant="error" title="Could not load product" note={error ?? "Product not found"} />
  } else {
    content = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
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
    <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-6 pb-26 flex flex-col gap-14">
      <Link to="/catalog" className="flex items-center gap-2 h-11 w-fit font-extrabold hover:text-blue">
        <img src={chevronLeftIcon} alt="" className="w-5 h-5" />
        Back to catalog
      </Link>
      {content}
    </div>
  )
}
