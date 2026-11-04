export interface StoredUser {
  username: string
  name: string
  email: string
  password: string
  phone?: string
}

// the signed-in user as the app sees it: never carries the password
export type AuthUser = Omit<StoredUser, "password">

// what the profile form may change: everything except the login name
export type ProfileChanges = Omit<AuthUser, "username">
