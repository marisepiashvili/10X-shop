import { Link, useParams } from "react-router"
import chevronLeftIcon from "../assets/icons/chevron-left.svg"
import ProductDetails from "../components/product/ProductDetails"
import RelatedProducts from "../components/product/RelatedProducts"
import ProductDetailsSkeleton from "../components/product/ProductDetailsSkeleton"
import MessagePanel from "../components/ui/MessagePanel"
import useProduct from "../hooks/useProduct"

export default function ProductPage() {
  const { id } = useParams()
  const productId = Number(id)
  const isValidId = Number.isInteger(productId) && productId > 0
  const { product, loading, error, notFound, retry } = useProduct(isValidId ? productId : null)

  let content: React.ReactNode
  if (!isValidId) {
    content = <MessagePanel variant="empty" title="Product not found" note="check the link" />
  } else if (loading) {
    content = <ProductDetailsSkeleton />
  } else if (notFound || (!error && !product)) {
    content = <MessagePanel variant="empty" title="Product not found" note="check the link" />
  } else if (error || !product) {
    content = <MessagePanel variant="error" title="Could not load product" note={error ?? "Something went wrong"} onRetry={retry} />
  } else {
    content = (
      <>
        <ProductDetails product={product} />
        <RelatedProducts category={product.category} currentId={product.id} />
      </>
    )
  }

  return (
    <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-6 pb-26 flex flex-col gap-14">
      <Link to="/catalog" className="flex items-center gap-2 h-11 w-fit font-extrabold hover:text-accent">
        <img src={chevronLeftIcon} alt="" className="w-5 h-5 dark:invert" />
        Back to catalog
      </Link>
      {content}
    </div>
  )
}
