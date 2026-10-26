import { useState } from "react";
import CatalogToolbar from "../components/catalog/CatalogToolbar";
import Pagination from "../components/catalog/Pagination";
import ProductGrid from "../components/product/ProductGrid";
import { PAGE_SIZE } from "../components/product/productFetch";
import LoadingState from "../components/ui/LoadingState";
import MessagePanel from "../components/ui/MessagePanel";
import useDebounce from "../hooks/useDebounce";
import useProducts from "../hooks/useProducts";
import { useSearchParams } from "react-router";


export default function CatalogPage() {
   const [searchParams] = useSearchParams()
   const [search, setSearch] = useState(searchParams.get("search") ?? "")
   const [category, setCategory] = useState(searchParams.get("category") ?? "all")

    const [sort, setSort] = useState("default")
    const [page, setPage] = useState(1)

    const debouncedSearch = useDebounce(search, 400)
    const { products, total, loading, error } = useProducts({ search: debouncedSearch, category, sort, page })
    const totalPages = Math.ceil(total / PAGE_SIZE)

    function handleSearchChange(value: string) {
        setSearch(value)
        setCategory("all")
        setPage(1)
    }

    function handleCategoryChange(value: string) {
        setCategory(value)
        setSearch("")
        setPage(1)
    }

    function handleSortChange(value: string) {
        setSort(value)
        setPage(1)
    }

    function handlePageChange(newPage: number) {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    let content: React.ReactNode
    if (loading) {
        content = <LoadingState />
    } else if (error) {
        content = <MessagePanel variant="error" title="Could not load products" note={error} />
    } else if (products.length === 0) {
        content = <MessagePanel variant="empty" title="No products found" note="try another word" />
    } else {
        content = (
            <>
                <ProductGrid products={products} />
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
        )
    }

  return (
    <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-10 pb-26 flex flex-col gap-9">
      <section className="flex flex-wrap items-end justify-between gap-8">
        <div className="flex flex-col gap-2">
          {total > 0 && (
            <span className="self-start font-note text-3xl text-blue -rotate-3">{total} things to love ✶</span>
          )}
          <h1 className="font-display text-6xl md:text-[84px] leading-[0.95]">Catalog</h1>
        </div>

        <div className="flex items-stretch rotate-2 drop-shadow-[0_12px_20px_rgba(17,17,17,0.18)]">
          <div className="bg-white rounded-l-[18px] px-5.5 py-4 flex flex-col gap-1 font-mono text-[13px]">
            <span className="font-bold tracking-[0.14em]">COUPON · ONE PER ORDER</span>
            <span className="font-sans text-[15px]">10% off your cart. Free shipping from $100.</span>
            <span className="self-start mt-1 px-2.5 py-0.5 border-2 border-dashed border-ink rounded-lg text-lg font-bold">10X10</span>
          </div>
          <div className="w-27 grid place-items-center bg-orange text-white border-l-[3px] border-dashed border-paper rounded-r-[18px] font-display text-[28px] leading-none">
            −10%
          </div>
        </div>
      </section>

      <CatalogToolbar
        search={search}
        category={category}
        sort={sort}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />
      {content}
    </div>
  )
}
