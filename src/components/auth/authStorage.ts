import type { AuthUser, ProfileChanges, StoredUser } from "../../types/user"
import { isArrayOf, isAuthUser, isStoredUser } from "../../utils/guards"
import { StorageService } from "../../models/StorageService"
import { STORAGE_KEYS } from "../../utils/storageKeys"

// an account problem tied to one form field, so the form can show it next to that field
export class AccountError extends Error {
    readonly field: "username" | "email"

    constructor(field: "username" | "email", message: string) {
        super(message)
        this.name = "AccountError"
        this.field = field
    }
}

function isStoredUserList(value: unknown): value is StoredUser[] {
    return isArrayOf(value, isStoredUser)
}

const usersStorage = new StorageService<StoredUser[]>(STORAGE_KEYS.users, isStoredUserList)
export const currentUserStorage = new StorageService<AuthUser>(STORAGE_KEYS.currentUser, isAuthUser)

function readUsers(): StoredUser[]{
    return usersStorage.get() ?? []
}

function saveUsers(users: StoredUser[]) {
    usersStorage.set(users)
}

function toAuthUser({ username, name, email, phone }: StoredUser): AuthUser {
    return { username, name, email, phone }
}

export function registerUser(user: StoredUser): AuthUser{
    const users = readUsers()
    if(users.some((u)=>u.username === user.username)){
        throw new AccountError("username", "This username is already taken")
    }
    if(users.some((u)=>u.email === user.email)){
        throw new AccountError("email", "An account with this email already exists")
    }
    saveUsers([...users, user])
    return toAuthUser(user)
}

export function loginUser(username: string, password: string): AuthUser {
    const user = readUsers().find((u)=> u.username === username && u.password === password)
    if(!user){
        throw new Error("Wrong username or password")
    }
    return toAuthUser(user)
}

export function loadCurrentUser(): AuthUser | null {
    return currentUserStorage.get()
}

export function updateUser(username: string, changes: ProfileChanges): AuthUser {
    const users = readUsers()
    if(users.some((u)=>u.username !== username && u.email === changes.email)){
        throw new AccountError("email", "An account with this email already exists")
    }
    saveUsers(users.map((u)=> u.username === username ? {...u, ...changes} : u))
    return { username, ...changes }
}

// local demo reset: the username and email together stand in for a recovery email
export function resetPassword(username: string, email: string, newPassword: string) {
    const users = readUsers()
    if(!users.some((u)=>u.username === username && u.email === email)){
        throw new AccountError("username", "No account matches this username and email")
    }
    saveUsers(users.map((u)=> u.username === username ? {...u, password: newPassword} : u))
}
