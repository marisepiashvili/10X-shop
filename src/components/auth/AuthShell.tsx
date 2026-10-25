import { Link } from "react-router"

type AuthShellProps = {
  note: string
  title: string
  text: string
  ticketTitle: string
  children: React.ReactNode
}

export default function AuthShell({ note, title, text, ticketTitle, children }: AuthShellProps) {
  return (
    <div className="flex-1 bg-blue text-white overflow-hidden">
      <div className="max-w-330 mx-auto px-4 md:px-10 pt-18 pb-22 flex flex-wrap items-center justify-center gap-16">
        <div className="flex-[1_1_420px] max-w-135 flex flex-col gap-5">
          <span className="self-start font-note text-[32px] text-yellow -rotate-3">{note}</span>
          <h1 className="font-display text-6xl md:text-[104px] leading-[0.92]">{title}</h1>
          <p className="text-xl leading-normal max-w-[32ch]">{text}</p>
          <div aria-hidden="true" className="relative h-30 hidden sm:block">
            <span className="absolute left-0 top-4 w-24 h-24 rounded-full bg-orange border-4 border-white grid place-items-center font-display text-xl rotate-12 shadow-sticker">−10%</span>
            <span className="absolute left-30 top-6 px-5 py-2.5 rounded-full bg-mint text-ink border-4 border-white font-display text-xl whitespace-nowrap rotate-3 shadow-sticker">free ship ≥ $100</span>
          </div>
        </div>

        <div className="flex-[1_1_420px] max-w-115 flex flex-col gap-4.5 text-ink">
          <div className="relative rotate-[1.5deg] drop-shadow-[0_18px_26px_rgba(17,17,17,0.35)]">
            <div aria-hidden="true" className="zigzag-top" />
            <div className="bg-white px-6 sm:px-8 pt-6.5 pb-7.5 flex flex-col gap-4.5">
              <div className="text-center flex flex-col gap-1 font-mono">
                <span className="font-display text-[26px]">{ticketTitle}</span>
                <span className="text-xs">DEMO ACCOUNT · STORED IN THIS BROWSER</span>
              </div>
              <span className="block border-t-2 border-dashed border-ink my-1.5" />
              {children}
              <span aria-hidden="true" className="block barcode mt-2" />
            </div>
            <div aria-hidden="true" className="zigzag-bottom" />
            <span aria-hidden="true" className="absolute -left-4 -top-3 w-21.5 h-7 bg-yellow/85 -rotate-[24deg]" />
          </div>
          <Link to="/" className="self-center flex items-center gap-2 h-11 font-extrabold text-white hover:underline">
            <span aria-hidden="true">←</span> Back to catalog
          </Link>
        </div>
      </div>
    </div>
  )
}
