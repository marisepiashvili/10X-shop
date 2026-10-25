import PageButton from "./PageButton"
import chevronLeftIcon from "../../assets/icons/chevron-left.svg"
import chevronRightIcon from "../../assets/icons/chevron-right.svg"

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

function getPageNumbers(currentPage: number, totalPages: number) {
    const pages: (number | "...")[] = []

    for (let page = 1; page <= totalPages; page++) {
        const isEdge = page === 1 || page === totalPages
        const isNearCurrent = Math.abs(page - currentPage) <= 1

        if (isEdge || isNearCurrent) {
            pages.push(page)
        } else if (pages[pages.length - 1] !== "...") {
            pages.push("...")
        }
    }
    return pages
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null

    const pages = getPageNumbers(currentPage, totalPages)
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === totalPages

  return (
    <nav aria-label="Pagination" className="flex justify-center">
        <ul className="flex items-center gap-2 md:gap-3">
            <li>
                <PageButton disabled={isFirstPage} ariaLabel="Previous page" onClick={() => onPageChange(currentPage - 1)}>
                    <img src={chevronLeftIcon} alt="" className={`w-5 h-5 ${isFirstPage ? "opacity-40" : ""}`}/>
                </PageButton>
            </li>
            {pages.map((item, index)=> item === "..." ? (
                <li key={`dots-${index}`}>
                    <span className="px-1 font-extrabold">…</span>
                </li>
            ) : (
                <li key={item}>
                    <PageButton
                    isActive={item === currentPage}
                    onClick={() => onPageChange(item)}>{item}</PageButton>
                </li>
            ))}
            <li>
                <PageButton disabled={isLastPage} ariaLabel="Next page" onClick={() => onPageChange(currentPage + 1)}>
                    <img src={chevronRightIcon} alt="" className={`w-5 h-5 ${isLastPage ? "opacity-40" : ""}`} />
                </PageButton>
            </li>
        </ul>
    </nav>
  )
}
