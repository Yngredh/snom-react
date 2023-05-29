import { ICreateModule } from "../interfaces/ICreateModule";
import { IModule } from "../interfaces/IModule";
import { IModuleClass } from "../interfaces/IModuleClass";
import { IModuleTest } from "../interfaces/IModuleTest";

export abstract class ModuleService {

    public static async getModulesByTrainingId(userToken: string, trainingId: string) : Promise<IModule[]> {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module?` 
                + new URLSearchParams({ trainingId: trainingId }),
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });

        return await response.json() as IModule[]; 
    }

    public static async getClassModules(userToken: string, trainingId:string) : Promise<IModuleClass[]> {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module/class?` 
                + new URLSearchParams({ trainingId }),
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });

        return await response.json() as IModuleClass[]; 
    }

    public static async getTestModules(userToken: string, trainingId:string) : Promise<IModuleTest[]> {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module/test?` 
                + new URLSearchParams({ trainingId }),
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });

        return await response.json() as IModuleTest[]; 
    }

    public static async createModules(userToken: string, modulesList: ICreateModule[]) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module`, 
        {
            method : "POST",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body : JSON.stringify(modulesList)
        });
        return await response;
    }

    public static async updateModules(userToken: string, moduleList: ICreateModule[]) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module`, 
        {
            method : "PUT",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body : JSON.stringify(moduleList)
        });

        return response;
    }

    public static async deleteModules(userToken: string, 
            modulesIdList: {moduleId : string, moduleType : string}[]) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module`, 
        {
            method : "DELETE",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body : JSON.stringify(modulesIdList)
        });

        console.log(response);
        return response;
    }
}