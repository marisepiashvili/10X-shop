import { Check } from "lucide-react"
import type { Order } from "./order"
import { ORDER_STEPS, STATUS_COLORS, getOrderStatus, type OrderStatus } from "./orderStatus"

const CURRENT_NOTES: Record<OrderStatus, string> = {
  Processing: "packing it up!",
  Shipped: "on its way!",
  Delivered: "enjoy! ✶",
}

export default function StatusTimeline({ order }: { order: Order }) {
  const currentIndex = ORDER_STEPS.indexOf(getOrderStatus(order))
  const placedAt = new Date(order.createdAt).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" })

  return (
    <section aria-label="Order status" className="bg-white rounded-card shadow-card px-5 md:px-8 py-7">
      <ol className="grid grid-cols-3 gap-4">
        {ORDER_STEPS.map((step, index) => {
          const isReached = index <= currentIndex
          const isCurrent = index === currentIndex

          let caption: React.ReactNode
          if (isCurrent) {
            caption = <span className="font-note text-2xl text-blue">{CURRENT_NOTES[step]}</span>
          } else if (index === 0) {
            caption = <span className="font-mono text-[13px]">{placedAt}</span>
          } else {
            caption = <span className="text-sm font-semibold">{isReached ? "Done" : "Expected shortly"}</span>
          }

          return (
            <li key={step} aria-current={isCurrent ? "step" : undefined} className="flex flex-col items-start gap-2.5">
              {isReached ? (
                <span className={`w-14 h-14 rounded-full border-4 border-white grid place-items-center shadow-soft ${STATUS_COLORS[step]} ${isCurrent ? "ring-[3px] ring-ink -rotate-8" : ""}`}>
                  <Check size={18} strokeWidth={2.8} />
                </span>
              ) : (
                <span className="w-14 h-14 rounded-full border-[3px] border-dashed border-ink" />
              )}
              <strong className="text-lg font-extrabold">{step}</strong>
              {caption}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
