import { Permission } from "./Permission"

export interface User {
    id: number
    type: string
    name: string
    email: string
    password: string
    nickname: string
    level: number
    isUserActive: boolean
    experience: number
    icon: string
    permission: Permission
}