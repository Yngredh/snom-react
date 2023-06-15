import { ITraining } from "../interfaces/ITraining";
import { ITrainingProgress } from "../interfaces/ITrainingProgress";
import { IUser } from "../interfaces/IUser";

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

    public static async getTrainingProgressByUserToken(userToken: string, trainingId?: string) : Promise<ITrainingProgress[]> {
        const params = new URLSearchParams({});
        if(trainingId) params.set("trainingId", trainingId);
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/trainingprogress?` + params, 
        {
            headers : { 
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });
         
        return await response.json() as ITrainingProgress[];
    }

    public static async getTrainingByManagerUserToken(userToken: string) : Promise<ITraining[]> {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/user/manager/training`, 
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });

        return await response.json() as ITraining[];
    }

    public static async updateTraining(userToken: string, training: ITraining) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/training?`, 
        {
            method : "PUT",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body : JSON.stringify(training)
        });

        return await response;
    }

    public static async createTraining(userToken: string, training: ITraining) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/training?`, 
        {
            method : "POST",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body : JSON.stringify(training)
        });
        const res = await response.json() as { trainingId: string };
        return res.trainingId;
    }

    public static async getManagerUsersByTrainingId(userToken: string, trainingId: string) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/user/manager?` + new URLSearchParams({
            trainingId
        }), 
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });

        return await response.json() as IUser[];
    }

    public static async getApprenticeUsersByTrainingId(userToken: string, trainingId: string) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/trainingprogress/assigned?` + new URLSearchParams({
            trainingId
        }), 
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });

        return await response.json() as IUser[];
    }

}