import { useContext } from "react"
import { EOperation, IModuleOperations } from "../interfaces/IModuleOperations";
import { IModuleClass } from "../interfaces/IModuleClass";
import { ICreateModule } from "../interfaces/ICreateModule";
import { ModuleService } from "../services/ModuleService";
import { UserContext } from "../App";

export const useSaveModuleOperations = () => {
    const userContext = useContext(UserContext);
    let listToCreate: ICreateModule[] = [];
    let listToUpdate: ICreateModule[] =[];
    let listToDelete: { moduleId : string, moduleType : string }[] = [];

    const saveModuleOperations = async (moduleOperationList : IModuleOperations[]) => {
        moduleOperationList.forEach(item => {
            let createModuleObject :ICreateModule = {
                trainingId: item.module.module?.trainingId!!,
                moduleType: item.module.module?.moduleType!!,
                title: item.module.module?.title!!,
                position: item.module.module?.position!!
            }
            
            if(item.module.module?.moduleType.includes('CLASS')) {
                let classModule = item.module as IModuleClass;
                createModuleObject.content = classModule.content as string;
            }
    
            if(item.operation === EOperation.Create) listToCreate = [...listToCreate, createModuleObject];
            if(item.operation === EOperation.Update) {
                createModuleObject.moduleId = item.module.module?.moduleId;
                listToUpdate = [...listToUpdate, createModuleObject]
            };
            if(item.operation === EOperation.Delete) {
                createModuleObject.moduleId = item.module.module?.moduleId;
                listToDelete = [...listToDelete, {
                    moduleId: createModuleObject.moduleId!!,
                    moduleType: createModuleObject.moduleType
                }];   
            }
                     
        });
        console.log(listToDelete);
        await ModuleService.createModules(userContext.token, listToCreate);
        await ModuleService.updateModules(userContext.token, listToUpdate);
        await ModuleService.deleteModules(userContext.token, listToDelete);
        return true;
    } 

    return [saveModuleOperations];
}

