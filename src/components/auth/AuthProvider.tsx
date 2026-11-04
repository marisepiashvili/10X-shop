import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { loadCurrentUser, loginUser, updateUser } from "./authStorage"
import { STORAGE_KEYS } from "../../utils/storageKeys"
import type { AuthUser, ProfileChanges } from "../../types/user"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadCurrentUser)

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.currentUser)
    }
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
