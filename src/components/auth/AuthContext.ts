import { createContext } from "react"
import type { AuthUser, ProfileChanges } from "../../types/user"

export type AuthContextValue = {
  user: AuthUser | null
  login: (username: string, password: string) => void
  logout: () => void
  updateProfile: (changes: ProfileChanges) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
