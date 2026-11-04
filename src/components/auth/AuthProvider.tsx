import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { currentUserStorage, loadCurrentUser, loginUser, updateUser } from "./authStorage"
import type { AuthUser, ProfileChanges } from "../../types/user"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadCurrentUser)

  useEffect(() => {
    if (user) currentUserStorage.set(user)
    else currentUserStorage.remove()
  }, [user])

  const value = {
    user,
    login: (username: string, password: string) => setUser(loginUser(username, password)),
    logout: () => setUser(null),
    updateProfile: (changes: ProfileChanges) => {
      if (user) setUser(updateUser(user.username, changes))
    },
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
