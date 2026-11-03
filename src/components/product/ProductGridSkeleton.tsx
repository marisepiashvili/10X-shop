export default function ProductGridSkeleton({ count }: { count: number }) {
  return (
    <div role="status" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-8 pt-2">
      <span className="sr-only">Loading products…</span>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} aria-hidden="true" className="flex flex-col gap-3 p-3 bg-card rounded-card shadow-card motion-safe:animate-pulse">
          <div className="aspect-square rounded-[20px] bg-muted" />
          <div className="flex flex-col gap-2.5 px-1.5 pt-1">
            <div className="h-3 w-1/3 rounded-full bg-muted" />
            <div className="h-5 w-4/5 rounded-full bg-muted" />
            <div className="h-7 w-1/2 rounded-full bg-muted" />
          </div>
          <div className="h-12 mx-1.5 mb-1 rounded-full bg-muted" />
        </div>
      ))}
    </div>
  )
}
