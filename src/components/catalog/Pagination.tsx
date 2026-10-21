import PageButton from "./PageButton"
import chevronLeftIcon from "../../assets/icons/chevron-left.svg"
import chevronRightIcon from "../../assets/icons/chevron-right.svg"

const pages :(number | "...")[] = [1, 2, 3, "...", 17]
const currentPage = 1
const pageColors = ["bg-[#9DBFC0]", "bg-[#B5E655]", "bg-[#4CB6C2]"]



export default function Pagination() {
  return (
    <nav aria-label="Pagination" className="flex justify-center">
        <ul className="flex items-center gap-2 md:gap-3">
            <li>
                <PageButton disabled ariaLabel="Previous page" >
                    <img src={chevronLeftIcon} className="w-5 h-5 opacity-40"/>
                </PageButton>
            </li>
            {pages.map((item, index)=> item === "..." ? (
                <li key={`dots-${index}`}>
                    <span className="px-1 font-bold text-[#12424A]">...</span>
                </li>
            ) : (
                <li key={item}>
                    <PageButton 
                    isActive={item === currentPage}
                    color={pageColors[item % pageColors.length]}>{item}</PageButton>
                </li>
            ))}
             <li>
          <PageButton ariaLabel="Next page">
            <img src={chevronRightIcon} alt="" className="w-5 h-5" />
          </PageButton>
        </li>
        </ul>
    </nav>
  )
}
