import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { theme } from "../../themes/theme"
import * as Styled from "./styles"
import { Background, EBackground } from "../../components/Background";
import { Button, EButton } from "../../components/Button";
import { Card } from "../../components/Card";
import { DivLine } from "../../components/DivLine";
import { ETypographType, Typograph } from "../../components/Typograph";
import { IModuleClass } from "../../interfaces/IModuleClass";
import { IModuleTest } from "../../interfaces/IModuleTest";
import { IQuestion } from "../../interfaces/IQuestion";
import { ITrainingProgress } from "../../interfaces/ITrainingProgress";
import { ModuleTextClass } from "../../components/ModuleTextClass";
import { ModuleService } from "../../services/ModuleService";
import { MultipleQuestionTest } from "../../components/MultipleQuestionTest";
import { QuestionService } from "../../services/QuestionService";
import { TrainingService } from "../../services/TrainingService";
import { VideoClass } from "../../components/VideoClass";
import { EOperation } from "../../interfaces/IModuleOperations";
import { IQuestionOperations } from "../../interfaces/IModuleOperations";
import { IModuleConclusion } from "../../interfaces/IModuleConclusion";

interface IExecutionModule {
    module: Partial<IModuleClass> | Partial<IModuleTest>, 
    questionList?: IQuestion[]
}

export const TrainingExecution = () => {

    const { trainingId , moduleId } = useParams();
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [trainingProgress, setTrainingProgress] = useState<ITrainingProgress>();
    const [moduleList, setModuleList] = useState<IExecutionModule[]>([]);
    const [selectedModule, setSelectedModule] = useState<IExecutionModule>();
    const coreSelectedModule = selectedModule?.module.module;

    const getQuestionOperation = () : IQuestionOperations[] => {
        return selectedModule!!.questionList!!.map(question => {
            return {
                question,
                operation: EOperation.None
            };
        })
    }
    const handleUserResponse = (newQuestion: Partial<IQuestion>) => {
        setSelectedModule({...selectedModule!!, questionList: selectedModule!!.questionList!!.map(question => {
            if(question.questionId === newQuestion.questionId) {
                return newQuestion as IQuestion;
            }   
            return question
        })});
    }

    const handleModuleConclusion = async () => {
        let moduleConclusion: IModuleConclusion = {
            moduleId: coreSelectedModule!!.moduleId,
            trainingId: coreSelectedModule!!.trainingId,
            moduleType: coreSelectedModule!!.moduleType.includes('TEST') ? 'TEST' : 'CLASS'
        }

        if(coreSelectedModule!!.moduleType.includes('TEST')) {
            moduleConclusion.responses = selectedModule!!.questionList!!.map(question => {
                return {
                    questionId: question.questionId,
                    response: question.answers
                }
            }) 
        }

        await ModuleService.concludeModule(userContext.token, moduleConclusion);
        navigate(0);
    }

    const handleShowContent = () => {
        let classModule = selectedModule?.module as Partial<IModuleClass>
        return classModule.content!!
    }

    useEffect(() => {
        const getTrainingData = async () => {
            if(trainingId) {
                const classModuleListResponse = await ModuleService.getClassModules(userContext.token, trainingId);
                const testModuleListResponse = await ModuleService.getTestModules(userContext.token, trainingId);
                const trainingProgressResponse = await TrainingService.getTrainingProgressByUserToken(userContext.token, trainingId);

                let temporaryModuleList: IExecutionModule[] = [];

                classModuleListResponse.forEach(classModule => temporaryModuleList.push({module: classModule}));

                for(let index = 0; index < testModuleListResponse.length; index++) {
                    let testModule = testModuleListResponse[index];
                    const questionListResponse = await QuestionService.getQuestionsByModuleId(testModule.module.moduleId, userContext.token);
                    temporaryModuleList.push({module: testModule, 
                        questionList: questionListResponse.map(questionResponse => {
                            return {...questionResponse , answers: 'F;F;F;F'}
                        })})
                }
                
                let sorted = temporaryModuleList.sort((a,b) => a.module!!.module!!.position!! - b.module!!.module!!.position!!);

                setModuleList(sorted);
                setTrainingProgress(trainingProgressResponse[0]);
            }
        }
        getTrainingData();
        
    },[trainingId, userContext.token]);

    useEffect(() => {
        moduleList.forEach(moduleExecution => {
            if(moduleExecution.module.module?.moduleId === moduleId) 
                setSelectedModule(moduleExecution);
        });
    }, [moduleList, moduleId]);
    
    return(
        <Background
            style={{display:"flex", alignItems: "center", justifyContent: "space-around"}}
            type={EBackground.SimpleBackgroundFrame}>
            <Card
                style={{display: "flex", flexDirection: "column", alignItems: "center"}}
                width="70%" height="96%" 
                borderColor={theme.pallete.blueViolet.dark}
                borderWidth={"2"}
                backgroundColor={theme.pallete.assistant.white}>
                <Card
                    style={{display: "flex", alignItems: "center", borderRadius: "5px", boxShadow:"0px"}}
                    width="100%" height="10%" 
                    borderColor={theme.pallete.blueViolet.dark}
                    borderWidth={"0"}
                    backgroundColor={theme.pallete.blueViolet.dark}>
                    <Styled.ShowModuleTitle>
                        <img style={{width: "4%"}} alt="" src="/img/icons/arrowBackward.svg"></img>
                        <Typograph type={ETypographType.ConstrastVioletText} 
                            style={{color: "white", paddingLeft: "2%"}}>{coreSelectedModule?.title}</Typograph>
                    </Styled.ShowModuleTitle>
                </Card>
                <Styled.ModuleContent>
                    {coreSelectedModule?.moduleType.includes("TEST") &&
                    <MultipleQuestionTest questionOperationList={getQuestionOperation()} 
                        isOnEditPage={false} moduleId={coreSelectedModule!!.moduleId}
                        defineAnswers={handleUserResponse} 
                        type={coreSelectedModule!!.moduleType === "TEST|Alternative" ? 2 : 1} /> }
                    {coreSelectedModule?.moduleType === "CLASS|Video" && <VideoClass /> }
                    {coreSelectedModule?.moduleType === "CLASS|Text" && 
                    <ModuleTextClass content={handleShowContent()} />}
                </Styled.ModuleContent>
            </Card>
            <Card
                style={{display: "flex", flexDirection: "column", alignItems: "center", boxShadow:"0px"}}
                width="25%" height="96%" 
                borderColor={theme.pallete.cyanGreen.dark}
                borderWidth={"1"}
                backgroundColor={theme.pallete.assistant.white}>
                    <Card
                        style={{display: "flex", alignItems: "center", borderRadius: "5px"}}
                        width="100%" height="10%" 
                        borderColor={theme.pallete.cyanGreen.dark}
                        borderWidth={"0"}
                        backgroundColor={theme.pallete.cyanGreen.dark}>
                            <Typograph style={{width: '100%',textAlign: 'center'}} type={ETypographType.ConstrastVioletText}>LISTA DE MÓDULOS</Typograph>
                    </Card>
                <Styled.ModuleList>
                    {moduleList?.map((module) => {
                        let isSelected = module.module.module!!.moduleId === moduleId;
                        let isEnabled = module.module.module!!.position <= trainingProgress!!.currentPosition;
                        const imageDeactivatedFilterId = !isEnabled ? "deactivated-icon-module" : '';
                        const titleDeactivadedColorId = !isEnabled? "deactivated-title-module" : '';
                        let type = "text";
                        if(module.module.module!!.moduleType === "TEST|Alternative" || "TEST|True or False") type = "test";
                        if(module.module.module!!.moduleType === "CLASS|Text") type = "text";
                        if(module.module.module!!.moduleType === "CLASS|Video") type = "video"
                        return(
                            <>
                            <Styled.Module 
                                style={{cursor: isEnabled ? 'pointer' : undefined}}
                                isSelected={isSelected}
                                isEnabled={isEnabled}
                                onClick={() => {
                                if(isEnabled && !isSelected) navigate(`/trainingExecution/${module.module.module!!.trainingId}/${module.module.module!!.moduleId}`);
                                }}
                            >
                                <img id={imageDeactivatedFilterId} alt="Ícone de modulo" style={{ width: "10%"}} src={`/img/modules/${type}.svg`}></img>
                                <Typograph id={titleDeactivadedColorId} style={{paddingLeft: "3%"}} type={ETypographType.AuxiliarText}> {module.module.module!!.title} </Typograph>    
                            </Styled.Module>
                            <DivLine size={"100%"} color={theme.pallete.assistant.blueIce}></DivLine>
                            </>
                        )
                    })}
                </Styled.ModuleList>

                <Button 
                    onClick={handleModuleConclusion}
                    style={{width:"40%", marginBottom: "3%"}} type={EButton.MainButtonVariation}>CONCLUIR MÓDULO</Button>
                
            </Card>
        </Background>
    )
}