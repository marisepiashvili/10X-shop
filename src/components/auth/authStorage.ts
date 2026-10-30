const USER_KEY = "shop_users"
export const CURRENT_USER_KEY = "shop_user"

export type StoredUser = {
    name: string
    email: string
    password: string
    phone?: string

}

export type AuthUser = Omit<StoredUser, "password">

function readUsers(): StoredUser[]{
    try{
        const raw = localStorage.getItem(USER_KEY)
        return raw ? (JSON.parse(raw) as StoredUser[]) : []
    }catch{ 
        return []
    }
}

export function registerUser(user: StoredUser): AuthUser{
    const users = readUsers()
    if(users.some((u)=>u.email === user.email)){
        throw new Error("An account with this email already exists")
    }
    localStorage.setItem(USER_KEY, JSON.stringify([...users, user]))
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
    try {
       const raw = localStorage.getItem(CURRENT_USER_KEY) 
       return raw ? (JSON.parse(raw) as AuthUser) : null
    } catch{
        return null
    }
}

export function updateUser(currentEmail: string, changes: AuthUser): AuthUser {
    const users = readUsers()
    if(changes.email !== currentEmail && users.some((u)=>u.email === changes.email)){
        throw new Error("An account with this email already exists")
    }
    const updated = users.map((u)=> u.email === currentEmail ? {...u, ...changes} : u)
    localStorage.setItem(USER_KEY, JSON.stringify(updated))
    return changes
}
