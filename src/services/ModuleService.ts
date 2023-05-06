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

    public static async getClassModules(userToken: string, moduleId: string) : Promise<IModuleClass[]> {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module/class?` 
                + new URLSearchParams({ moduleId }),
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });

        return await response.json() as IModuleClass[]; 
    }

    public static async createClassModule(userToken: string, classModules: Partial<IModuleClass>[]) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module/class?`, 
        {
            method : "POST",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body : JSON.stringify(classModules)
        });
        const res = await response.json() as { moduleId: string };
        return res.moduleId;
    }

    public static async updateClassModule(userToken: string, classModules: Partial<IModuleClass>[]) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module/class?`, 
        {
            method : "PUT",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body : JSON.stringify(classModules)
        });

        return response;
    }

    public static async deleteClassModule(userToken: string, 
            classModules: Partial<{moduleId: string, moduleType: string}>[]) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module/class?`, 
        {
            method : "DELETE",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body : JSON.stringify(classModules)
        });

        console.log(response);
        return response.status;
    }


    public static async getTestModules(userToken: string, moduleId: string) : Promise<IModuleTest[]> {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module/test?` 
                + new URLSearchParams({ moduleId }),
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });

        return await response.json() as IModuleTest[]; 
    }

    public static async createTestModule(userToken: string, testModules: Partial<IModuleTest>[]) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module/test?`, 
        {
            method : "POST",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body : JSON.stringify(testModules)
        });
        const res = await response.json() as { moduleId: string };
        return res.moduleId;
    }

    public static async updateTestModule(userToken: string, testModules: Partial<IModuleTest>[]) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module/test?`, 
        {
            method : "PUT",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body : JSON.stringify(testModules)
        });

        return response;
    }

    public static async deleteTestModule(userToken: string, 
            classModules: Partial<{moduleId: string, moduleType: string}>[]) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/module/test?`, 
        {
            method : "DELETE",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body : JSON.stringify(classModules)
        });

        console.log(response);
        return response.status;
    }
}