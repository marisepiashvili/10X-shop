import type { AuthUser, StoredUser } from "../../types/user"
import { isArrayOf, isAuthUser, isStoredUser, readStorage } from "../../utils/guards"
import { STORAGE_KEYS } from "../../utils/storageKeys"

function isNullableAuthUser(value: unknown): value is AuthUser | null {
    return value === null || isAuthUser(value)
}

function isStoredUserList(value: unknown): value is StoredUser[] {
    return isArrayOf(value, isStoredUser)
}

function readUsers(): StoredUser[]{
    return readStorage(STORAGE_KEYS.users, isStoredUserList, [])
}

export function registerUser(user: StoredUser): AuthUser{
    const users = readUsers()
    if(users.some((u)=>u.email === user.email)){
        throw new Error("An account with this email already exists")
    }
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify([...users, user]))
    return {name: user.name, email: user.email}
}

export function loginUser(email: string, password: string): AuthUser {
    const user = readUsers().find((u)=> u.email === email && u.password === password)
    if(!user){
        throw new Error("Wrong email or password")
    }
    return{name: user.name, email: user.email, phone: user.phone}
}

export function loadCurrentUser(): AuthUser | null {
    return readStorage(STORAGE_KEYS.currentUser, isNullableAuthUser, null)
}

export function updateUser(currentEmail: string, changes: AuthUser): AuthUser {
    const users = readUsers()
    if(changes.email !== currentEmail && users.some((u)=>u.email === changes.email)){
        throw new Error("An account with this email already exists")
    }
    const updated = users.map((u)=> u.email === currentEmail ? {...u, ...changes} : u)
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(updated))
    return changes
}
