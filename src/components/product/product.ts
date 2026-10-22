export interface Product {
    id: number
    title: string
    brand?: string
    category: string
    price: number
    rating: number
    discountPercentage: number
    stock: number
    thumbnail: string
}
export interface ProductsResponse {
    products: Product[]
    total: number
    skip: number
    limit: number
}

export interface ProductQuery {
    search: string
    category: string
    sort: string
    page: number
}

export interface Category {
    slug: string
    name: string
    url: string
}