import type { ProductQuery, SortOption } from "../types/product"

export const PAGE_SIZE = 12

// Record<SortOption, …> makes TypeScript check that every sort option has an entry
const sortParams: Record<SortOption, { sortBy: string, order: "asc" | "desc" } | null> = {
    "default": null,
    "price-asc": { sortBy: "price", order: "asc" },
    "price-desc": { sortBy: "price", order: "desc" },
    "rating-desc": { sortBy: "rating", order: "desc" },
    "discount-desc": { sortBy: "discountPercentage", order: "desc" },
    "title-asc": { sortBy: "title", order: "asc" },
}

// turns the catalog query into a DummyJSON path; pure, so the same query always gives the same URL
export function buildProductsUrl(query: ProductQuery): string {
    const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        skip: String((query.page - 1) * PAGE_SIZE),
    })

    const sort = sortParams[query.sort]
    if (sort) {
        params.set("sortBy", sort.sortBy)
        params.set("order", sort.order)
    }

    const search = query.search.trim()
    if (search) {
        // search loads every match, because getProducts filters by title and pages the result itself
        params.set("q", search)
        params.set("limit", "0")
        params.set("skip", "0")

        return `/products/search?${params.toString()}`
    }
    if (query.category !== "all") {
        return `/products/category/${query.category}?${params.toString()}`
    }
    return `/products?${params.toString()}`
}
