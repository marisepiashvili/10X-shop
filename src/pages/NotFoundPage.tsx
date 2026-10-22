import { Link } from "react-router"

export default function NotFoundPage() {
  return (
    <div className="max-w-266 mx-auto px-4 py-20 flex flex-col items-center gap-6 text-[#12424A] text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl">This page doesn't exist.</p>
      <Link to="/" className="border-2 border-[#12424A] rounded-full px-6 py-2 bg-[#B5E655] text-xl">
        Back to catalog
      </Link>
    </div>
  )
}
