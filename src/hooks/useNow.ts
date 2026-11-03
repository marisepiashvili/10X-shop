import { useEffect, useState } from "react"

// the current time, refreshed every `interval` ms so time-based UI updates without a reload
export default function useNow(interval: number) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), interval)
    return () => clearInterval(timer)
  }, [interval])

  return now
}
