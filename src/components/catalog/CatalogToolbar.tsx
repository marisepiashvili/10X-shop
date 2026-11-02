import { useEffect, useState } from "react"
import { getCategories } from "../product/productFetch"
import SearchInput from "./SearchInput"
import type { Option } from "./SelectField"
import SelectField from "./SelectField"

const allCategoriesOption: Option = { value: "all", label: "All categories" }

const sortOptions: Option[] = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
    { value: "rating-desc", label: "Top rated" },
    { value: "discount-desc", label: "Discount: high to low" },
]

type CatalogToolbarProps = {
    search: string
    category: string
    sort: string
    onSearchChange: (value: string) => void
    onCategoryChange: (value: string) => void
    onSortChange: (value: string) => void
    onReset: () => void

}

export default function CatalogToolbar({
    search,
    category,
    sort,
    onSearchChange,
    onCategoryChange,
    onSortChange,
    onReset,

}: CatalogToolbarProps) {
    const [categoryOptions, setCategoryOptions] = useState<Option[]>([allCategoriesOption])

    useEffect(() => {
        async function loadCategories() {
            try {
                const categories = await getCategories()
                const options = categories.map((item) => ({ value: item.slug, label: item.name }))
                setCategoryOptions([allCategoriesOption, ...options])
            } catch {
                // categories failed to load: the select keeps only "All categories"
            }
        }
        loadCategories()
    }, [])

    const hasActiveFilters = search !== "" || category !== "all" || sort !== "default"


  return (
    <section className="bg-white rounded-card shadow-card p-4.5">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4">
            <SearchInput value={search} onChange={onSearchChange} />
            <SelectField id="category" label="Category" color="bg-yellow" options={categoryOptions} value={category} onChange={onCategoryChange} />
            <SelectField id="sort" label="Sort by" color="bg-sky" options={sortOptions} value={sort} onChange={onSortChange} />
        </div>
        <div className="flex justify-end mt-4">
           <button
                type="button"
                onClick={onReset}
                disabled={!hasActiveFilters}
                className="group relative h-11 px-6 rounded-full text-[15px] font-extrabold cursor-pointer transition-colors duration-500 enabled:hover:bg-paper disabled:text-muted-ink disabled:cursor-not-allowed"
            >
                <svg aria-hidden="true" className="absolute top-px left-px w-[calc(100%-2px)] h-[calc(100%-2px)] overflow-visible pointer-events-none">
                    <rect
                        width="100%"
                        height="100%"
                        rx="21"
                        pathLength="100"
                        className="fill-none stroke-ink stroke-2 group-disabled:stroke-muted [stroke-dasharray:2_2] group-enabled:group-hover:[stroke-dasharray:4_0] transition-[stroke-dasharray] duration-200"
                    />
                </svg>
                Reset filters
            </button>

        </div>
    </section>
  )
}
