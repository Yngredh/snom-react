import { IUser } from "./IUser";

export interface IUserContext {
    token: string,
    user: Partial<IUser> | undefined
}