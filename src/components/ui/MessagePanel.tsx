type MessagePanelProps = {
  variant: "error" | "empty"
  title: string
  note?: string
  action?: { label: string; onClick: () => void }
}

export default function MessagePanel({ variant, title, note, action }: MessagePanelProps) {
  const isError = variant === "error"

  return (
    <div
      role={isError ? "alert" : undefined}
      className={`w-full max-w-md mx-auto px-6 py-9 flex flex-col items-center gap-3 text-center border-[5px] border-sticker rounded-[30px] shadow-card ${isError ? "bg-pink -rotate-1" : "bg-sky rotate-1"}`}
    >
      <p className="font-display text-[26px] leading-tight">{title}</p>
      {note && <p className={isError ? "font-semibold" : "font-note text-2xl"}>{note}</p>}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-1 h-12 px-7 rounded-full bg-coal text-white text-[17px] font-extrabold transition hover:bg-blue"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
