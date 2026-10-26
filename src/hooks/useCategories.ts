import { useEffect, useState } from "react"
import type { Category } from "../components/product/product"
import { getCategories } from "../components/product/productFetch"

export default function useCategories(){
    const[categories,setCategories] = useState<Category[]>([])

    useEffect(()=>{
        async function loadCategories() {
            try {
                setCategories(await getCategories())
            } catch {
                
            }
        }
        loadCategories()
    },[])
    return categories
}