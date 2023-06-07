import * as Styled from "./styles";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { Background, EBackground } from "../../components/Background";
import { Button, EButton } from "../../components/Button";
import { ETypographType, Typograph } from "../../components/Typograph";
import { EPopUpType, PopUp } from "../../components/PopUp";
import { IModuleOperations, EOperation, IQuestionOperations} from "../../interfaces/IModuleOperations";
import { IModuleTest } from "../../interfaces/IModuleTest";
import { IModuleClass } from "../../interfaces/IModuleClass";
import { ModuleService } from "../../services/ModuleService";
import { SelectedModuleCard } from "../../components/SelectedModuleCard";
import { ModuleManagementList } from "../../components/ModuleManagementList";
import { QuestionService } from "../../services/QuestionService";
import { IQuestion } from "../../interfaces/IQuestion";
import { useSaveModuleOperations } from "../../hooks/useSaveModulesOperations";
import { useSaveQuestionOperations } from "../../hooks/useSaveQuestionOperations";

export const ModuleManagement = () => {
    
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const { trainingId } = useParams();
    const [moduleList, setModuleList] = useState<IModuleOperations[]>([]);
    const [selectedModule, setSelectedModule] = useState<IModuleOperations>();
    const [showConfirmPopUp, setShowConfirmPopUp] = useState(false);
    const [saveModuleOperations] = useSaveModuleOperations();
    const [saveQuestionsOperations] = useSaveQuestionOperations();

    const goToTrainingManagement = () => {
        navigate(`/trainingManagement/${trainingId}`);
    }

    const goToWorkshop = () => {
        navigate(`/workshop`);
    }

    const handleSaveChanges = async () => {
        let questionOperations :IQuestionOperations[] = [];
        moduleList.forEach(moduleOperation => {
            if(moduleOperation.questionList) questionOperations.push(...moduleOperation.questionList!!)
        });

        let finishedSaveModule = await saveModuleOperations(moduleList);
        let finishedSaveQuestion = await saveQuestionsOperations(questionOperations);

        if(finishedSaveModule && finishedSaveQuestion) navigate(0);
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
                    let newModuleOperation = m;
                    newModuleOperation.operation = EOperation.Delete;
                    return newModuleOperation;
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
                setSelectedModule(module);
                break;
            }
        }
    }

    const generateTestModuleOperation = (testModule: IModuleTest, questions: IQuestion[]) : IModuleOperations => {
        return {
            module: testModule,
            operation: EOperation.None,
            questionList : questions.map(question => {
                return { question: question, operation: EOperation.None}
            })
        }
    }

    useEffect(() => {
        const getTraining = async () => {
            if(trainingId) {
                const classModuleListResponse = await ModuleService.getClassModules(userContext.token, trainingId);
                const testModuleListResponse = await ModuleService.getTestModules(userContext.token, trainingId);

                let temporaryModuleList :IModuleOperations[] = [];

                classModuleListResponse.forEach(classModule => {
                    temporaryModuleList.push({ module: classModule, operation: EOperation.None, questionList: undefined})
                });

                for(let index = 0; index < testModuleListResponse.length; index++) {
                    let testModule = testModuleListResponse[index];
                    const questionListResponse = await QuestionService.getQuestionsByModuleId(testModule.module.moduleId, userContext.token);
                    temporaryModuleList.push(generateTestModuleOperation(testModule, questionListResponse))
                }
                
                let sorted = temporaryModuleList.sort((a,b) => a.module!!.module!!.position!! - b.module!!.module!!.position!!);
                setSelectedModule(sorted[0]);
                setModuleList(sorted);
            }
        }
        getTraining();
    }, [userContext.token, trainingId]);

    useEffect(()=>{
        console.log(moduleList);
    },[moduleList])

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
                <SelectedModuleCard 
                    selectedModuleOperation={selectedModule!!}
                    handleUpdatedModule={handleUpdateModule}
                    handleDeleteModule={handleDeleteModule}/>

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