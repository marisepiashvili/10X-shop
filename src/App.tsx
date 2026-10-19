import Footer from "./components/layout/Footer"
import Header from "./components/layout/Header"
import ProductGrid from "./components/product/ProductGrid"

function App() {

  return (
    
     <div className="flex flex-col min-h-screen">
       <Header/>
       <main className="flex-1 bg-[#e2f5f1] bg-[radial-gradient(#12424A33_1.5px,transparent_1.5px)] bg-size-[22px_22px]">
        <ProductGrid/>
       </main>
       <Footer/>
     </div>
    
  )
}

export default App
