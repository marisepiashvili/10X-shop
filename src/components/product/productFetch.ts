import { api } from "../../api/ApiClient";
import type { Category, Product, ProductQuery, ProductsResponse, SortOption } from "../../types/product"


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

function buildProductsPath(query: ProductQuery): string {
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
        params.set("limit", "0")
        params.set("skip", "0")

        return `/products/search?${params.toString()}`
    }
    if (query.category !== "all") {
        return `/products/category/${query.category}?${params.toString()}`
    }
    return `/products?${params.toString()}`
}

async function getProducts(query: ProductQuery, signal?: AbortSignal): Promise<ProductsResponse> {
    const data = await api.get<ProductsResponse>(buildProductsPath(query), signal)

    const search = query.search.trim().toLowerCase()
    if (!search) return data

    const matches = data.products.filter((product) => product.title.toLowerCase().includes(search))
    const skip = (query.page - 1) * PAGE_SIZE
    return {
        ...data,
        products: matches.slice(skip, skip + PAGE_SIZE),
        total: matches.length,
        skip,
        limit: PAGE_SIZE,
    }
}

export function getProductById(id: number, signal?: AbortSignal): Promise<Product> {
    return api.get<Product>(`/products/${id}`, signal)
}

export function getCategories(): Promise<Category[]> {
    return api.get<Category[]>("/products/categories")
}

export default getProducts
