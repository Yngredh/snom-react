import { IModuleClass } from "./IModuleClass";
import { IModuleTest } from "./IModuleTest";
import { IQuestion } from "./IQuestion";


export enum EOperation {
    None = 0,
    Creating = 1,
    Create = 2,
    Update = 3,
    Delete = 4,
}
export interface IQuestionOperations {
    question: Partial<IQuestion>,
    operation: EOperation
}

export interface IModuleOperations {
    module: Partial<IModuleClass> | Partial<IModuleTest>,
    operation: EOperation,
    questionList?: IQuestionOperations[];
}