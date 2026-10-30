import useAuth from "../hooks/useAuth"

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) return null

  const firstName = user.name.trim().split(/\s+/)[0]

  return (
    <div className="w-full max-w-330 mx-auto px-4 md:px-10 pt-10 pb-24 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="self-start font-note text-3xl text-blue -rotate-3">good to see you</span>
        <h1 className="font-display text-6xl md:text-[84px] leading-[0.95] wrap-break-word">Hi, {firstName}.</h1>
      </div>

      <div className="flex flex-wrap items-start gap-10">
      </div>
    </div>
  )
}
