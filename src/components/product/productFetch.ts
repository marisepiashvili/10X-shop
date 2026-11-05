import { api } from "../../api/ApiClient";
import type { Category, Product, ProductQuery, ProductsResponse } from "../../types/product"
import { buildProductsUrl, PAGE_SIZE } from "../../utils/url"


async function getProducts(query: ProductQuery, signal?: AbortSignal): Promise<ProductsResponse> {
    const data = await api.get<ProductsResponse>(buildProductsUrl(query), signal)

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
