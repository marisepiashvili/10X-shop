export interface StoredUser {
  name: string
  email: string
  password: string
  phone?: string
}

// the signed-in user as the app sees it: never carries the password
export type AuthUser = Omit<StoredUser, "password">
