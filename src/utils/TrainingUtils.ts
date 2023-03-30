import { ITrainingStatus } from "../interfaces/ITraining";

export abstract class TrainingUtils {
    public static TrainingStatusList = TrainingUtils.getTrainingStatusList();
    
    public static getTrainingStatusById (statusId: number) {
        return this.TrainingStatusList.filter(x => x.trainingStatusId === statusId)[0];
    }

    private static getTrainingStatusList() {
        let list: ITrainingStatus[] = [];
        list.push({trainingStatusId: 1, description: 'Disponível'});
        list.push({trainingStatusId: 2, description: 'Manutenção'});
        list.push({trainingStatusId: 3, description: 'Inativo'});
        return list
    }
}