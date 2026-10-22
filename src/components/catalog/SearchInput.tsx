import searchIcon from "../../assets/icons/search.svg"

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="search" className="text-sm font-bold text-[#12424A]">Search</label>
      <div className="relative">
        <img src={searchIcon} alt="" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
        <input
          type="search"
          id="search"
          placeholder="Try “phone”"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white w-full h-14 rounded-full border-2 border-[#12424A] pl-14 pr-6 text-lg text-[#12424A] placeholder:text-[#3E6F73]/70 focus:outline-none focus-visible:shadow-[3px_3px_0_#12424A]"
        />
      </div>
    </div>
  )
}
