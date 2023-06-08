import * as Styled from "./styles"
import { IModuleOperations, EOperation, IQuestionOperations } from "../../interfaces/IModuleOperations";
import { Card } from "../Card"
import { DivLine } from "../DivLine"
import { Input } from "../Input"
import { MultipleQuestionTest } from "../MultipleQuestionTest"
import { ETypographType, Typograph } from "../Typograph"
import { Button, EButton } from "../Button"
import { theme } from "../../themes/theme"
import { BundleEditor } from "../BundleEditor";
import { IModuleClass } from "../../interfaces/IModuleClass";
import { IQuestion } from "../../interfaces/IQuestion";

export interface SelectedModuleCardProps {
    selectedModuleOperation: IModuleOperations,
    handleUpdatedModule: (updatedModule: IModuleOperations) => void;
    handleDeleteModule: (deletedModule: IModuleOperations) => void;
} 

export const SelectedModuleCard = (props :SelectedModuleCardProps) => {
    const coreModule = props.selectedModuleOperation?.module?.module;
    const questionOperationValidatedList = props.selectedModuleOperation?.questionList ? props.selectedModuleOperation.questionList : [];

    const handleAddNewQuestion = (question: Partial<IQuestion>) => {
        props.handleUpdatedModule({...props.selectedModuleOperation, 
            questionList: [...questionOperationValidatedList, {
                question,
                operation: EOperation.Create
            }
        ]});
    }

    const handleTitleUpdate = (e: HTMLInputElement) => {
        let newModule = props.selectedModuleOperation;
        if(newModule.operation !== EOperation.Create) newModule.operation = EOperation.Update;
        newModule.module.module!!.title = e.value;
        props.handleUpdatedModule(newModule);
    };

    const handleInputContent = (e: HTMLInputElement) => handleContentUpdate(e.value);

    const handleContentUpdate = (e: string) => {
        let newModule = props.selectedModuleOperation;
        let classNewModule: Partial<IModuleClass> = newModule.module;
        if(newModule.operation !== EOperation.Create) newModule.operation = EOperation.Update;

        classNewModule.content = e;
        newModule.module = classNewModule;
        props.handleUpdatedModule(newModule);
    };

    const handleContentDefaultValue = () => {
        let module = props.selectedModuleOperation;
        let classModule: Partial<IModuleClass> = module.module;
        return classModule.content as string;
    }

    const handleDeleteModule = () => {
        props.handleDeleteModule(props.selectedModuleOperation);    
    }

    const handleModuleType = () => {
        if(coreModule?.moduleType === "TEST|Alternative") return "test"
        if(coreModule?.moduleType === "TEST|True or False") return "true"
        if(coreModule?.moduleType === "CLASS|Text") return "text"
        return "video"
    }

    const handleUpdateQuestion = (question: Partial<IQuestion>) => {
        props.handleUpdatedModule({
            ...props.selectedModuleOperation, 
            questionList: questionOperationValidatedList.map(questionOperation => {
                if(questionOperation.question.questionId === question.questionId) {
                    let newQuestionOperation = questionOperation;
                    newQuestionOperation.question = question;

                    if(newQuestionOperation.operation !== EOperation.Create) 
                        newQuestionOperation.operation = EOperation.Update
                    
                    return newQuestionOperation;
                }
                return questionOperation
            })
        })
    }

    const handleDeleteQuestion = (questionId: string) => {
        let actualQuestionOperation = questionOperationValidatedList
            .filter(questionOperation => questionOperation.question.questionId === questionId)[0];
        let questionList : IQuestionOperations[] = actualQuestionOperation.operation === EOperation.Create ? 
            questionOperationValidatedList.filter(questionOperation => questionOperation.question.questionId !== questionId) :
            questionOperationValidatedList.map(questionOperation => {
                if(questionOperation.question.questionId === questionId) {
                    let newQuestionOperation = questionOperation;
                    newQuestionOperation.operation = EOperation.Delete
                    return newQuestionOperation;
                }
                return questionOperation
            });
        props.handleUpdatedModule({
            ...props.selectedModuleOperation, 
            questionList: questionList
        })
    }
    
    return(
        <Card
            style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "1%"}}
            width="79%" height="100%" 
            borderColor={theme.pallete.blueViolet.dark}
            borderWidth={"1"}
            backgroundColor={theme.pallete.cyanGreen.light}>
                <Styled.TopSideContainer>
                    <Styled.ModuleTitle>
                        <img style={{width: "8%", marginRight: "2%"}} src={`/img/modules/${handleModuleType()}.svg`}></img>
                        <Input hint="Título do Módulo" isPassword={false} defaultValue={coreModule?.title} 
                            onChange={handleTitleUpdate} width="60%" borderColor={theme.pallete.blueViolet.dark}/>
                    </Styled.ModuleTitle>
                    <Button type={EButton.DeleteButton} onClick={handleDeleteModule}>EXCLUIR</Button>
                </Styled.TopSideContainer>
                <DivLine size={"90%"} color={theme.pallete.blueViolet.dark}></DivLine>
                {props.selectedModuleOperation?.module?.module?.moduleType === "CLASS|Text" && <BundleEditor onChange={handleContentUpdate} initialValue={handleContentDefaultValue()} />}
                {props.selectedModuleOperation?.module?.module?.moduleType === "CLASS|Video" && 
                    <>
                        <Typograph style={{fontSize: "20px", textAlign: "center", marginTop: '3%'}} type={ETypographType.ButtonTitle}>Link do Vídeo</Typograph>
                        <Input hint="Insira a url do vídeo" isPassword={false} defaultValue={handleContentDefaultValue()} 
                            onChange={handleInputContent} width="60%" borderColor={theme.pallete.blueViolet.dark}
                            style={{marginTop: '1%'}}/>
                    </>}
                {coreModule?.moduleType.includes("TEST") &&
                    <MultipleQuestionTest questionOperationList={questionOperationValidatedList} 
                        isOnEditPage={true} moduleId={coreModule.moduleId} 
                        addNewQuestionToTest={handleAddNewQuestion}
                        updateQuestion={handleUpdateQuestion}
                        deleteQuestion={handleDeleteQuestion}
                        type={coreModule.moduleType === "TEST|Alternative" ? 2 : 1} />}
        </Card>
    )
}