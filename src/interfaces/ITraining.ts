import { IEmblem } from "./IEmblem"

export interface ITraining {
    trainingId: string,
    title: string,
    description: string,
    level: number,
    icon: string,
    modulesCount: number,
    createdDate: Date,
    lastUpdate: Date,
    status: ITrainingStatus,
    emblem: IEmblem
}

export interface ITrainingStatus {
    trainingStatusId: number,
    description: string
}

