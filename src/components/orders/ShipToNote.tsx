import type { ShippingInfo } from "../checkout/checkoutSchema"

export default function ShipToNote({ shipping }: { shipping: ShippingInfo }) {
  return (
    <div className="relative self-start w-full max-w-90 px-6.5 py-6 bg-yellow/40 rounded-md shadow-card -rotate-2">
      <span aria-hidden="true" className="absolute left-1/2 -top-3 -ml-11 w-22 h-6.5 bg-sky/85 rotate-3" />
      <h2 className="font-note text-[28px]">ship to:</h2>
      <address className="not-italic text-[17px] leading-relaxed font-semibold">
        {shipping.fullName}<br />
        {shipping.address}<br />
        {shipping.city}<br />
        {shipping.email}
      </address>
    </div>
  )
}
