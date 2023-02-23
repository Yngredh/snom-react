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
    finishedTrainingCount: number
    emblemCount: number
    levelOneEmblemCount: number
    levelTwoEmblemCount: number
    levelThreeEmblemCount: number
    levelFourEmblemCount: number
    levelFiveEmblemCount: number
}