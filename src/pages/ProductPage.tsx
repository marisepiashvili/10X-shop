import { Link, useLocation, useNavigate, useParams } from "react-router"
import PageTitle from "../components/layout/PageTitle"
import chevronLeftIcon from "../assets/icons/chevron-left.svg"
import ProductDetails from "../components/product/ProductDetails"
import RelatedProducts from "../components/product/RelatedProducts"
import ProductDetailsSkeleton from "../components/product/ProductDetailsSkeleton"
import MessagePanel from "../components/ui/MessagePanel"
import useProduct from "../hooks/useProduct"
import NotFoundPage from "./NotFoundPage"

export default function ProductPage() {
  const { id } = useParams()
  const productId = Number(id)
  const isValidId = Number.isInteger(productId) && productId > 0
  const { state, retry } = useProduct(isValidId ? productId : null)
  const location = useLocation()
  const navigate = useNavigate()

  const isNotFound = state.status === "error" && state.httpStatus === 404
  if (!isValidId || isNotFound) return <NotFoundPage />

  function handleBack(event: React.MouseEvent<HTMLAnchorElement>) {
    // go back to the catalog with its filters; a direct visit has no history, so the link is used
    if (location.key === "default") return
    event.preventDefault()
    navigate(-1)
  }

  let content: React.ReactNode
  if (state.status === "success") {
    const product = state.data
    content = (
      <>
        <ProductDetails product={product} />
        <RelatedProducts category={product.category} currentId={product.id} />
      </>
    )
  } else if (state.status === "error") {
    content = <MessagePanel variant="error" title="Could not load product" note={state.message} action={{ label: "Retry", onClick: retry }} />
  } else {
    content = <ProductDetailsSkeleton />
  }

  return (
    <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-6 pb-26 flex flex-col gap-14">
      <PageTitle title={state.status === "success" ? state.data.title : "Product"} />
      <Link to="/catalog" onClick={handleBack} className="flex items-center gap-2 h-11 w-fit font-extrabold hover:text-accent">
        <img src={chevronLeftIcon} alt="" className="w-5 h-5 dark:invert" />
        Back to catalog
      </Link>
      {content}
    </div>
  )
}
