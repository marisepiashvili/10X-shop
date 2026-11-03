export default function ProductDetailsSkeleton() {
  return (
    <div role="status" className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
      <span className="sr-only">Loading product…</span>
      <div aria-hidden="true" className="p-3 bg-card rounded-[36px] shadow-card motion-safe:animate-pulse">
        <div className="aspect-square rounded-[26px] bg-muted" />
      </div>
      <div aria-hidden="true" className="flex flex-col gap-5 pt-2 motion-safe:animate-pulse">
        <div className="h-7 w-40 rounded-full bg-muted" />
        <div className="h-16 w-4/5 rounded-3xl bg-muted" />
        <div className="h-5 w-1/3 rounded-full bg-muted" />
        <div className="h-12 w-1/2 rounded-full bg-muted" />
        <div className="h-24 w-full rounded-3xl bg-muted" />
        <div className="h-15 w-full rounded-full bg-muted" />
      </div>
    </div>
  )
}
