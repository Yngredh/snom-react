import { ITraining } from "../interfaces/ITraining";
import { ITrainingProgress } from "../interfaces/ITrainingProgress";

export abstract class TrainingService {

    public static async getTrainingByTrainingId(userToken: string, trainingId: string) : Promise<ITraining[]> {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/training?` + new URLSearchParams({
            trainingId
        }),
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });

        return await response.json() as ITraining[];
    }

    public static async getTrainingByUserToken(userToken: string, trainingStatusId?: number) : Promise<ITraining[]> {
        const params = new URLSearchParams({});
        if(trainingStatusId) params.set("trainingStatusId", trainingStatusId.toString());
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/trainingprogress/training/user?` + params, 
        {
            headers : { 
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });
         
        return await response.json() as ITraining[];
    }

    public static async getTrainingProgressByUserToken(userToken: string, trainingId: string) : Promise<ITrainingProgress> {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/trainingprogress?` + new URLSearchParams({
            trainingId
        }), 
        {
            headers : { 
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });
         
        return await response.json() as ITrainingProgress;
    }

    public static async getTrainingByManagerUserToken(userToken: string) : Promise<ITraining[]> {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/user/manager/training?` + new URLSearchParams({
            userToken
        }), 
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });

        return await response.json() as ITraining[];
    }

}