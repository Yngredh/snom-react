import { IUser } from "./IUser";

export enum EOperation {
    None = 0,
    Creating = 1,
    Create = 2,
    Update = 3,
    Delete = 4,
    DeleteBeforeCreate = 5
}

export interface IUserOperations {
    user: Partial<IUser>,
    operation: EOperation
}