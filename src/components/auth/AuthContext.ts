import { createContext } from "react"
import type { AuthUser } from "../../types/user"

export type AuthContextValue = {
  user: AuthUser | null
  login: (email: string, password: string) => void
  logout: () => void
  updateProfile: (changes: AuthUser) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
