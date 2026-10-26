const MESSAGES = [
  "Free shipping from $100",
  "Code 10X10 −10%",
  "Stock you can see",
  "New steals every day",
]

// each copy holds the messages twice so it is wider than any screen
const LOOP = [...MESSAGES, ...MESSAGES]

export default function PromoMarquee() {
  return (
    <div className="relative z-10 -mt-6 w-[104%] -ml-[2%] -rotate-1 overflow-hidden bg-ink text-paper border-y-4 border-white shadow-sticker">
      <div className="flex w-max py-4 motion-safe:animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {LOOP.map((message, index) => (
              <li key={index} className="flex items-center gap-6 px-6 font-display text-xl md:text-2xl uppercase whitespace-nowrap">
                {message}
                <span aria-hidden="true" className="text-yellow">✶</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
