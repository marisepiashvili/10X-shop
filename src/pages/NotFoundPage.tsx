import { Link } from "react-router"

const circleStyles = "w-24 h-24 md:w-42 md:h-42 rounded-full border-[5px] md:border-[7px] border-white shadow-card grid place-items-center font-display text-6xl md:text-[104px] leading-none"

export default function NotFoundPage() {
  return (
    <div className="w-full px-4 md:px-10 pt-20 pb-24 flex flex-col items-center gap-5.5 text-center">
      <div aria-hidden="true" className="relative flex items-center gap-3 md:gap-4.5 pb-3">
        <span className={`${circleStyles} bg-pink -rotate-10`}>4</span>
        <span className={`${circleStyles} bg-yellow rotate-5 translate-y-3.5`}>0</span>
        <span className={`${circleStyles} bg-mint -rotate-4`}>4</span>
        <span className="hidden lg:block absolute -right-52 -top-8 font-note text-[32px] text-blue rotate-8">oops, wrong aisle ↙</span>
      </div>
      <h1 className="font-display text-5xl md:text-7xl leading-[0.95]">Page not found</h1>
      <p className="text-xl font-semibold">The page you are looking for does not exist.</p>
      <Link
        to="/catalog"
        className="mt-2 flex items-center gap-2.5 h-15 px-7.5 rounded-full bg-orange text-white border-4 border-white text-lg font-extrabold shadow-sticker transition hover:-translate-y-0.5"
      >
        <span aria-hidden="true">←</span> Go to catalog
      </Link>
    </div>
  )
}
