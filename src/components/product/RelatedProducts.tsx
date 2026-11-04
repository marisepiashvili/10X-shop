import useProducts from "../../hooks/useProducts"
import ProductGrid from "./ProductGrid"

type RelatedProductsProps = {
  category: string
  currentId: number
}

const RELATED_COUNT = 4

export default function RelatedProducts({ category, currentId }: RelatedProductsProps) {
  const { state } = useProducts({ search: "", category, sort: "default", page: 1 })
  // related products are extra: while loading or on error the block is simply left out
  if (state.status !== "success") return null

  const related = state.data.products.filter((product) => product.id !== currentId).slice(0, RELATED_COUNT)
  if (related.length === 0) return null

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-display text-4xl md:text-[44px] leading-none">Related products</h2>
      <ProductGrid products={related} />
    </section>
  )
}
