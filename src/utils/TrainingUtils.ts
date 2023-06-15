import { ITrainingStatus } from "../interfaces/ITraining";
import { trainingIconLists } from "./iconLists";

export abstract class TrainingUtils {
    public static TrainingStatusList = TrainingUtils.getTrainingStatusList();
    
    public static getTrainingStatusById (statusId: number) {
        return this.TrainingStatusList.filter(x => x.trainingStatusId === statusId)[0];
    }

    public static getRandowNewTrainingIcone() {
        let min = 0;
        let max = trainingIconLists.length - 1;
        let index = Math.floor(Math.random() * (max - min + 1)) + min;

        return trainingIconLists[index];
    }

    private static getTrainingStatusList() {
        let list: ITrainingStatus[] = [];
        list.push({trainingStatusId: 1, description: 'Disponível'});
        list.push({trainingStatusId: 2, description: 'Manutenção'});
        list.push({trainingStatusId: 3, description: 'Inativo'});
        return list
    }
}