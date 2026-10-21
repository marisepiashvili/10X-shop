import SearchInput from "./SearchInput"
import type { Option } from "./SelectField"
import SelectField from "./SelectField"

const categoryOptions: Option[] = [
    {value: "all", label:"All categories"},
    {value: "beauty", label: "Beauty"},
    {value: "furniture", label: "Furniture"}
]

const sortOptions : Option[] = [
    {value: "default", label: "Default"},
    {value: "price-asc", label: "Price: low to high"},
    {value: "price-desc", label:"Price: high to low"},
    {value: "discount-desc", label:"Discount: high to low"}
]



export default function CatalogToolbar() {
  return (
    <section className="border-2 border-[#12424A] rounded-3xl p-6 bg-[#e2f5f1]">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6">
        <SearchInput/>
            <SelectField id="category" label="Category" options={categoryOptions}/>
            <SelectField id="sort" label="Sort by" options={sortOptions}/>
        </div>
    </section>
  )
}


