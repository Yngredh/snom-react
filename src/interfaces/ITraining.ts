import { IEmblem } from "./IEmblem"
import { IModule } from "./IModule"

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
    emblem: IEmblem,
    modules: IModule[]
}

export interface ITrainingStatus {
    trainingStatusId: number,
    description: string
}

