import { ITraining } from "./ITraining"

export interface ITrainingProgress {
    userId: string,
    trainingId: string,
    isFinished: boolean,
    isResetNeeded: boolean,
    isEmblemConquered: boolean,
    currentPosition: number,
    firstAverage: number,
    finaltAverage: number,
    endDate: string,
    training: ITraining
}