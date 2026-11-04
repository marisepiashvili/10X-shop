import { useEffect, useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { getCategories } from "../product/productFetch"
import SearchInput from "./SearchInput"
import type { Option } from "./SelectField"
import SelectField from "./SelectField"
import DashedButton from "../ui/DashedButton"
import type { SortOption } from "../../types/product"

const allCategoriesOption: Option = { value: "all", label: "All categories" }

const sortOptions: { value: SortOption; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
    { value: "rating-desc", label: "Rating: high to low" },
    { value: "title-asc", label: "Name A→Z" },
]

type CatalogToolbarProps = {
    search: string
    category: string
    sort: SortOption
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
    // phones only: category, sort and reset stay folded behind the Filters button
    const [filtersOpen, setFiltersOpen] = useState(false)

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
    // the search box is always visible, so the badge counts only what is folded away
    const foldedFilterCount = Number(category !== "all") + Number(sort !== "default")


  return (
    <section className="bg-card rounded-card shadow-card p-3.5 md:p-4.5">
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[2fr_1fr_1fr] items-end gap-3 md:gap-4">
            <SearchInput value={search} onChange={onSearchChange} />
            <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
                aria-controls="catalog-filters"
                className="md:hidden inline-flex items-center gap-2 h-12 px-4 rounded-full border-2 border-ink bg-yellow font-extrabold text-[15px]"
            >
                <SlidersHorizontal size={18} aria-hidden="true" />
                Filters
                {foldedFilterCount > 0 && (
                    <span className="min-w-5.5 h-5.5 px-1.5 rounded-full bg-coal text-white grid place-items-center text-xs">
                        {foldedFilterCount}<span className="sr-only"> active</span>
                    </span>
                )}
            </button>
            {/* md:contents puts the two selects straight into the 3-column grid on wider screens */}
            <div id="catalog-filters" className={`${filtersOpen ? "grid" : "hidden"} col-span-2 gap-3 md:contents`}>
                <SelectField key={categoryOptions.length} id="category" label="Category" color="bg-yellow" options={categoryOptions} value={category} onChange={onCategoryChange} />
                <SelectField id="sort" label="Sort by" color="bg-sky" options={sortOptions} value={sort} onChange={onSortChange} />
            </div>
        </div>
        <div className={`${filtersOpen ? "flex" : "hidden"} md:flex justify-end mt-3 md:mt-4`}>
           <DashedButton onClick={onReset} disabled={!hasActiveFilters} className="enabled:hover:bg-paper">
                Reset filters
            </DashedButton>
        </div>
    </section>
  )
}
