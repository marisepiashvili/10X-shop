import { useEffect, useRef } from "react"

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}

// native <dialog> gives focus trapping, Esc to close and a backdrop for free
export default function ConfirmDialog({ open, title, message, confirmLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-title"
      onCancel={(event) => {
        // Esc: let React state close the dialog
        event.preventDefault()
        onCancel()
      }}
      onClick={(event) => {
        // a click on the backdrop lands on the dialog element itself
        if (event.target === event.currentTarget) onCancel()
      }}
      className="m-auto w-[min(26rem,calc(100%-2rem))] p-0 bg-card text-ink rounded-card shadow-card backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-7 flex flex-col gap-4">
        <h2 id="confirm-title" className="font-display text-[26px] leading-tight">{title}</h2>
        <p className="text-[15px] leading-normal">{message}</p>
        <div className="flex flex-wrap justify-end gap-2.5 pt-2">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
            className="h-12 px-6 rounded-full border-2 border-dashed border-ink text-[15px] font-extrabold transition hover:bg-paper"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-12 px-6 rounded-full bg-danger text-white dark:text-coal text-[15px] font-extrabold transition hover:-translate-y-0.5"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}
