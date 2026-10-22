import { useEffect, useState } from "react"
import type { Product, ProductQuery } from "../components/product/product"
import getProducts from "../components/product/productFetch"

export default function useProducts({ search, category, sort, page }: ProductQuery) {
    const [products, setProducts] = useState<Product[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        async function loadProducts() {
            setLoading(true)
            setError(null)
            try {
                const data = await getProducts({ search, category, sort, page }, controller.signal)
                setProducts(data.products)
                setTotal(data.total)
            } catch (err) {
                if (controller.signal.aborted) return
                setError(err instanceof Error ? err.message : "Something went wrong")
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }
        loadProducts()

        return () => controller.abort()
    }, [search, category, sort, page])

    return { products, total, loading, error }
}
