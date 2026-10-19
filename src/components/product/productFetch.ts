import type { ProductsResponse } from "./product";

async function getProducts(){
    const response = await fetch ("https://dummyjson.com/products?limit=12");
    if(!response.ok){
        throw new Error(`Failed to fetch products: ${response.status}`)
    }
    const data:ProductsResponse = await response.json()
    return data.products
}
export default getProducts