import { useEffect, useState } from "react"
import type { AsyncState } from "../types/api"
import type { ProductQuery, ProductsResponse } from "../types/product"
import getProducts from "../components/product/productFetch"

export default function useProducts({ search, category, sort, page }: ProductQuery) {
    const [state, setState] = useState<AsyncState<ProductsResponse>>({ status: "loading" })
    // bumping this re-runs the request (Retry button)
    const [attempt, setAttempt] = useState(0)

    useEffect(() => {
        const controller = new AbortController()

        async function loadProducts() {
            setState({ status: "loading" })
            try {
                const data = await getProducts({ search, category, sort, page }, controller.signal)
                setState({ status: "success", data })
            } catch (err) {
                // a newer request replaced this one: its result must not overwrite the new state
                if (controller.signal.aborted) return
                setState({ status: "error", message: err instanceof Error ? err.message : "Something went wrong" })
            }
        }
        loadProducts()

        return () => controller.abort()
    }, [search, category, sort, page, attempt])

    function retry() {
        setAttempt((count) => count + 1)
    }

    return { state, retry }
}
