export default function LoadingState() {
  return (
    <div role="status" className="flex items-center justify-center gap-2.5 py-10 font-extrabold">
      <span aria-hidden="true" className="w-5.5 h-5.5 rounded-full border-4 border-yellow border-t-ink motion-safe:animate-spin" />
      Loading…
    </div>
  )
}
