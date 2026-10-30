import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { CURRENT_USER_KEY, loadCurrentUser, loginUser, type AuthUser } from "./authStorage"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadCurrentUser)

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  }, [user])

  const value = {
    user,
    login: (email: string, password: string) => setUser(loginUser(email, password)),
    logout: () => setUser(null),
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
