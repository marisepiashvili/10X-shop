import { useEffect, useState } from "react"
import type { Product } from "./product"
import getProducts from "./productFetch";
import ProductCard from "./ProductCard";


export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null)


    useEffect(()=>{
        async function loadProducts(){
            try{
                const data = await getProducts()
                setProducts(data)
            }catch(err){
                setError(err instanceof Error ? err.message : "Something went wrong")
            }finally{
                setLoading(false)
            }
        }
        loadProducts()
    }, [])

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
  return (
    <div>
        <div className="grid grid-cols-4 gap-6 p-4 mx-auto w-fit">
          {products.map((product)=>(
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
    </div>
  )
}
