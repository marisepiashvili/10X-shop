
type NavPillProps = {
    color: string;
    children: React.ReactNode
}

export default function NavPill({color, children} : NavPillProps) {
  return (
   <li  className={`border-2 border-[#12424A] rounded-3xl p-2 h-10 text-[#12424A] text-xl flex items-center justify-center ${color}`}>{children}</li>
  )
}
