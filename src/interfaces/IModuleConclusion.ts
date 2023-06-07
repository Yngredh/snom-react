export interface IModuleConclusion {
    moduleId: string,
    trainingId: string,
    moduleType: 'CLASS' | 'TEST',
    responses?: UserResponse[]
}

export interface UserResponse {
    questionId: string,
    response: string
}