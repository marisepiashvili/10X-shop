import type { Category, ProductQuery, ProductsResponse } from "./product";

export const PAGE_SIZE = 12
const BASE_URL = "https://dummyjson.com/products"

const sortParams: Record<string, { sortBy: string, order: "asc" | "desc" }> = {
    "price-asc": { sortBy: "price", order: "asc" },
    "price-desc": { sortBy: "price", order: "desc" },
    "rating-desc": { sortBy: "rating", order: "desc" },
    "discount-desc": { sortBy: "discountPercentage", order: "desc" },
    "title-asc": { sortBy: "title", order: "asc" },
}

function buildProductsUrl(query: ProductQuery) {
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
        params.set("q", search)
        return `${BASE_URL}/search?${params.toString()}`
    }
    if (query.category !== "all") {
        return `${BASE_URL}/category/${query.category}?${params.toString()}`
    }
    return `${BASE_URL}?${params.toString()}`
}

async function getProducts(query: ProductQuery, signal?: AbortSignal) {
    const response = await fetch(buildProductsUrl(query), { signal })
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`)
    }
    const data: ProductsResponse = await response.json()
    return data
}

export async function getCategories() {
    const response = await fetch(`${BASE_URL}/categories`)
    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`)
    }
    const data: Category[] = await response.json()
    return data
}

export default getProducts
