
type NavPillProps = {
    color: string;
    children: React.ReactNode
}

export default function NavPill({color, children} : NavPillProps) {
  return (
   <li  className={`border-2 border-[#12424A] rounded-3xl p-2 h-10 text-[#12424A] text-xl flex items-center justify-center ${color} transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#12424A] active:translate-x-0 active:translate-y-0 active:shadow-none`}>{children}</li>
  )
}
