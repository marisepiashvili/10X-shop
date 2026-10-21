import searchIcon from '..//../assets/icons/search.svg'

export default function SearchInput() {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor="search">Search</label>
      <div className='relative'>
        <img src={searchIcon} alt="search icon" className='absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none'/>
        <input type="serach" id="search" placeholder="Enter product name " className='bg-white w-full h-14 rounded-full border-2 ... pl-14 pr-6 placeholder:text-[#3E6F73]/70'/>
      </div>
    </div>
  )
}
