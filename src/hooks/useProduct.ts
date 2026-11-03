import { useEffect, useState } from "react"
import type { Product } from "../components/product/product"
import { isApiError } from "../api/ApiError"
import { getProductById } from "../components/product/productFetch"

export default function useProduct(id: number | null) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [notFound, setNotFound] = useState(false)
    // bumping this re-runs the request (Retry button)
    const [attempt, setAttempt] = useState(0)

    useEffect(() => {
        if (id === null) return
        const controller = new AbortController()

        async function loadProduct(productId: number) {
            setLoading(true)
            setError(null)
            setNotFound(false)
            try {
                const data = await getProductById(productId, controller.signal)
                setProduct(data)
            } catch (err) {
                if (controller.signal.aborted) return
                if (isApiError(err) && err.status === 404) setNotFound(true)
                else setError(err instanceof Error ? err.message : "Something went wrong")
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }
        loadProduct(id)

        return () => controller.abort()
    }, [id, attempt])

    function retry() {
        setAttempt((count) => count + 1)
    }

    return { product, loading, error, notFound, retry }
}
