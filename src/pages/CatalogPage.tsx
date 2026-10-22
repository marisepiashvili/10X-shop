import { useState } from "react";
import CatalogToolbar from "../components/catalog/CatalogToolbar";
import Pagination from "../components/catalog/Pagination";
import ProductGrid from "../components/product/ProductGrid";
import { PAGE_SIZE } from "../components/product/productFetch";
import useDebounce from "../hooks/useDebounce";
import useProducts from "../hooks/useProducts";

export default function CatalogPage() {
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("all")
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
        content = <p className="text-center text-xl text-[#12424A]">Loading...</p>
    } else if (error) {
        content = <p className="text-center text-xl text-[#C4102C]">{error}</p>
    } else if (products.length === 0) {
        content = <p className="text-center text-xl text-[#12424A]">No products found</p>
    } else {
        content = (
            <>
                <ProductGrid products={products} />
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
        )
    }

  return (
    <div className="max-w-266 mx-auto px-4 py-8 flex flex-col gap-8">
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
