import * as Styled from "./styles";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { Background, EBackground } from "../../components/Background";
import { Button, EButton } from "../../components/Button";
import { ETypographType, Typograph } from "../../components/Typograph";
import { EPopUpType, PopUp } from "../../components/PopUp";
import { IModuleOperations, EOperation } from "../../interfaces/IModuleOperations";
import { IModuleTest } from "../../interfaces/IModuleTest";
import { IModuleClass } from "../../interfaces/IModuleClass";
import { ModuleService } from "../../services/ModuleService";
import { SelectedModuleCard } from "../../components/SelectedModuleCard";
import { ModuleManagementList } from "../../components/ModuleManagementList";

export const ModuleManagement = () => {
    
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const { trainingId } = useParams();
    const [moduleList, setModuleList] = useState<IModuleOperations[]>([]);
    const [selectedModule, setSelectedModule] = useState<IModuleOperations>();
    const [showConfirmPopUp, setShowConfirmPopUp] = useState(false);

    const goToTrainingManagement = () => {
        navigate(`/trainingManagement/${trainingId}`);
    }

    const goToWorkshop = () => {
        navigate(`/workshop`);
    }

    const handleSaveChanges = async () => {
        const classModulesToCreate: Partial<IModuleClass>[] = [];
        const classModulesToUpdate: Partial<IModuleClass>[] = [];
        const classModulesToDelete: Partial<{moduleId: string, moduleType: string}>[] = [];
        const testModulesToCreate: Partial<IModuleTest>[] = [];
        const testModulesToUpdate: Partial<IModuleTest>[] = [];
        const testModulesToDelete: Partial<{moduleId: string, moduleType: string}>[] = [];
 
        moduleList.forEach((moduleOperation) => {

            if (moduleOperation.module.module?.moduleType.includes("CLASS")){
                if (moduleOperation.operation === EOperation.Create) 
                        classModulesToCreate.push(moduleOperation.module as IModuleClass)
                if (moduleOperation.operation === EOperation.Update) 
                        classModulesToUpdate.push(moduleOperation.module as IModuleClass)
                if (moduleOperation.operation === EOperation.Delete) 
                        classModulesToDelete.push({
                            moduleId: moduleOperation.module.module?.moduleId, 
                            moduleType: moduleOperation.module.module?.moduleType})
            } else {
                if (moduleOperation.operation === EOperation.Create) 
                        testModulesToCreate.push(moduleOperation.module as IModuleTest)
                if (moduleOperation.operation === EOperation.Update) 
                        testModulesToUpdate.push(moduleOperation.module as IModuleTest)
                if (moduleOperation.operation === EOperation.Delete) 
                        testModulesToDelete.push({
                            moduleId: moduleOperation.module.module?.moduleId, 
                            moduleType: moduleOperation.module.module?.moduleType})
            }
        })

        await ModuleService.createClassModule(userContext.token, classModulesToCreate);
        await ModuleService.updateClassModule(userContext.token, classModulesToUpdate);
        await ModuleService.deleteClassModule(userContext.token, classModulesToDelete);

        await ModuleService.createTestModule(userContext.token, testModulesToCreate);
        await ModuleService.updateTestModule(userContext.token, testModulesToUpdate);
        await ModuleService.deleteTestModule(userContext.token, testModulesToDelete);

    }
    
    const handleAddNewModule = (newModule: Partial<IModuleClass> | Partial<IModuleTest>) => {
        let newModuleOperation = {
            module: newModule,
            operation: EOperation.Create
        }
        setModuleList([...moduleList, newModuleOperation]);
        setSelectedModule(newModuleOperation);
    }

    const handleUpdateModule = (updatedModuleOperation: IModuleOperations) => {
        setModuleList(
            moduleList.map(moduleOperation => {
                if(moduleOperation.module.module?.moduleId === updatedModuleOperation.module.module?.moduleId) {
                    return updatedModuleOperation;
                }
                return moduleOperation;
            })
        );
        setSelectedModule(updatedModuleOperation);
    }

    const handleDeleteModule = (deletedModuleOperation: IModuleOperations) => {
        let newModuleList = [];

        if (deletedModuleOperation?.module?.module?.moduleId.includes("TEMPORARY-ID")) {
            newModuleList = moduleList.filter((m) => m.module.module?.moduleId !== deletedModuleOperation.module?.module?.moduleId);
            setModuleList(newModuleList);
        } else {
            newModuleList = moduleList.map((m) => {
                if (m.module.module?.moduleId === deletedModuleOperation?.module?.module?.moduleId) {
                    m.operation = EOperation.Delete
                }
                return m
            });
            setModuleList(newModuleList);
        }
        setSelectedModuleAfterDeleted(newModuleList);
    }

    const setSelectedModuleAfterDeleted = (modules :IModuleOperations[]) => {
        for(let index = modules.length - 1; index >= 0; index--) {
            let module = modules[index];
            
            if(module.operation !== EOperation.Delete) {
                console.log(module.module);
                setSelectedModule(module);
                break;
            }
        }
    }

    const generateModuleList = (classList : Partial<IModuleClass>[], testList : Partial<IModuleTest>[]) => {

        const temporaryModuleList: IModuleOperations[] = []
        
        classList.forEach((m) => {
            temporaryModuleList.push({
                module: m,
                operation: 0
            })
        });

        testList.forEach((m) => {
            temporaryModuleList.push({
                module: m,
                operation: 0
            })
        });

        setModuleList(temporaryModuleList);
    }

    useEffect(() => {
        const getTraining = async () => {
            if(trainingId) {
                const classModuleListResponse = await ModuleService.getClassModules(userContext.token, trainingId);
                const testModuleListResponse = await ModuleService.getTestModules(userContext.token, trainingId);

                generateModuleList(classModuleListResponse, testModuleListResponse);
            }
        }
        getTraining();
    }, [userContext.token, trainingId]);

    useEffect(()=> {
        console.log(moduleList)
    }, [moduleList]);

    return(
        <Background style={{display:"flex", flexDirection: "column", alignItems: "center"}}
                    type={EBackground.SimpleBackgroundFrame}>
            {showConfirmPopUp && <PopUp 
                type={EPopUpType.WarnSaveConfirmation}
                onConfirm={handleSaveChanges} onClose={() => setShowConfirmPopUp(false)}/>
            }
            <Styled.TopSideContainer>
                <Typograph type={ETypographType.PageTitle}>Gerenciar Módulos</Typograph>
                <Styled.ButtonContainer>
                    <Button
                        onClick={() => setShowConfirmPopUp(true)}
                        type={EButton.SecondaryButton}>SALVAR</Button>
                    <Button type={EButton.SecondaryButton} onClick={goToWorkshop}>VOLTAR</Button>
                    <Button type={EButton.MainButtonVariation}
                            icon={"/img/icons/arrowForward.svg"}
                            onClick={goToTrainingManagement}>GERENCIAR TREINAMENTO</Button>
                </Styled.ButtonContainer>
            </Styled.TopSideContainer>

            <Styled.Content>
                <SelectedModuleCard selectedModuleOperation={selectedModule!!} 
                    handleUpdatedModule={handleUpdateModule}
                    handleDeleteModule={handleDeleteModule} />

                <ModuleManagementList 
                    trainingId={trainingId!!}
                    moduleOperationList={moduleList}
                    addNewModuleToList={handleAddNewModule}
                    selectModule={setSelectedModule}
                />
            </Styled.Content>
        </Background>
    )
}