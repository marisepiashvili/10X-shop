import { useEffect, useState } from "react";
import CatalogToolbar from "../components/catalog/CatalogToolbar";
import Pagination from "../components/catalog/Pagination";
import ProductGrid from "../components/product/ProductGrid";
import { PAGE_SIZE } from "../components/product/productFetch";
import ProductGridSkeleton from "../components/product/ProductGridSkeleton";
import MessagePanel from "../components/ui/MessagePanel";
import useDebounce from "../hooks/useDebounce";
import useProducts from "../hooks/useProducts";
import { useSearchParams } from "react-router";
import type { SortOption } from "../types/product";
import { isSortOption } from "../utils/guards";

// a null value removes the parameter, so default filters keep the URL clean
type ParamChanges = Record<string, string | null>

export default function CatalogPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get("q") ?? ""
    const category = searchParams.get("category") ?? "all"
    // an unknown ?sort= value (typed by hand, old link) falls back to the default order
    const sortParam = searchParams.get("sort")
    const sort: SortOption = isSortOption(sortParam) ? sortParam : "default"
    const page = Math.max(1, Math.floor(Number(searchParams.get("page"))) || 1)

    // the input updates on every key; the URL follows once typing pauses
    const [search, setSearch] = useState(q)
    const [prevQ, setPrevQ] = useState(q)
    if (q !== prevQ) {
        // q changed from outside the input (Back/Forward, category, reset)
        setPrevQ(q)
        setSearch(q)
    }
    const debouncedSearch = useDebounce(search, 400)

    const { state, retry } = useProducts({ search: q, category, sort, page })
    const total = state.status === "success" ? state.data.total : 0

    function updateParams(changes: ParamChanges) {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            for (const [key, value] of Object.entries(changes)) {
                if (value) next.set(key, value)
                else next.delete(key)
            }
            return next
        })
    }

    useEffect(() => {
        // skip while typing, and when the URL already has this search
        if (debouncedSearch !== search || debouncedSearch === q) return
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            if (debouncedSearch.trim()) next.set("q", debouncedSearch)
            else next.delete("q")
            next.delete("category")
            next.delete("page")
            return next
        })
    }, [debouncedSearch, search, q, setSearchParams])

    function handleCategoryChange(value: string) {
        updateParams({ category: value === "all" ? null : value, q: null, page: null })
    }

    function handleSortChange(value: string) {
        updateParams({ sort: isSortOption(value) && value !== "default" ? value : null, page: null })
    }

    function handleReset() {
        setSearchParams({})
    }

    function handlePageChange(newPage: number) {
        updateParams({ page: newPage === 1 ? null : String(newPage) })
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // switching on status: TypeScript allows state.data only in the success branch
    let content: React.ReactNode
    if (state.status === "error") {
        content = <MessagePanel variant="error" title="Could not load products" note={state.message} action={{ label: "Retry", onClick: retry }} />
    } else if (state.status !== "success") {
        content = <ProductGridSkeleton count={PAGE_SIZE} />
    } else if (state.data.products.length === 0) {
        content = <MessagePanel variant="empty" title="No products found." note="try another word" action={{ label: "Clear filters", onClick: handleReset }} />
    } else {
        const { products } = state.data
        const firstShown = (page - 1) * PAGE_SIZE + 1
        const lastShown = firstShown + products.length - 1
        content = (
            <>
                <h2 className="sr-only">Products</h2>
                <ProductGrid products={products} />
                <Pagination currentPage={page} totalPages={Math.ceil(total / PAGE_SIZE)} onPageChange={handlePageChange} />
                <p className="text-center text-[15px] font-semibold">
                    Showing {firstShown}–{lastShown} of {total}
                </p>
            </>
        )
    }

  return (
    <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-10 pb-26 flex flex-col gap-9">
      <section className="flex flex-wrap items-end justify-between gap-8">
        <div className="flex flex-col gap-2">
          {/* always rendered, only hidden while loading, so the heading does not jump on every page change */}
          <span aria-hidden={total === 0} className={`self-start font-note text-3xl text-accent -rotate-3 ${total === 0 ? "invisible" : ""}`}>
            {total} things to love ✶
          </span>
          <h1 className="font-display text-6xl md:text-[84px] leading-[0.95]">Catalog</h1>
        </div>

        <div className="flex items-stretch rotate-2 drop-shadow-[0_12px_20px_rgba(17,17,17,0.18)]">
          <div className="bg-receipt rounded-l-[18px] px-5.5 py-4 flex flex-col gap-1 font-mono text-[13px]">
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
        onSearchChange={setSearch}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onReset={handleReset}
      />
      {content}
    </div>
  )
}
