import { IModule } from "./IModule";
import { IModuleClass } from "./IModuleClass";
import { IModuleTest } from "./IModuleTest";


export enum EOperation {
    None = 0,
    Creating = 1,
    Create = 2,
    Update = 3,
    Delete = 4,
}

export interface IModuleOperations {
    module: Partial<IModuleClass> | Partial<IModuleTest>,
    operation: EOperation
}