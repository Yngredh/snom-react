export interface IUser {
    userId: string
    name: string
    email: string
    password: string
    nickname?: string
    role?: string
    icon?: string
    isAdministrator: boolean
    hasPermission: boolean
}