import searchIcon from "../../assets/icons/search.svg"

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="search" className="text-sm font-extrabold pl-3.5">Search</label>
      <div className="relative">
        <img src={searchIcon} alt="" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
        <input
          type="search"
          id="search"
          placeholder="Search product"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white w-full h-13.5 rounded-full border-2 border-ink pl-13 pr-5.5 text-base placeholder:text-muted-ink"
        />
      </div>
    </div>
  )
}
