import { Question } from "../Question";
import { AddNewQuestion, TestContainer } from "./styles";
import { ETypographType, Typograph } from "../Typograph";
import { IQuestion } from "../../interfaces/IQuestion";
import { EOperation, IQuestionOperations } from "../../interfaces/IModuleOperations";

export enum EQuestionTestType {
    TrueOrFalse = 1,
    MultipleChoice = 2
}

export interface IMultipleQuestionTestProps {
    type: EQuestionTestType,
    questionOperationList: IQuestionOperations[]
    moduleId: string,
    isOnEditPage: boolean,
    defineAnswers?: (newQuestion: Partial<IQuestion>) => void,
    addNewQuestionToTest?: (question: Partial<IQuestion>) => void,
    updateQuestion?: (question: Partial<IQuestion>) => void,
    deleteQuestion?: (questionId: string) => void,
}

export const MultipleQuestionTest = (props: IMultipleQuestionTestProps) => {

    const handleAddNewQuestion = () => {
        if(props.addNewQuestionToTest) {
            props.addNewQuestionToTest(
                {
                    questionId: `TEMPORARY-ID-${props.questionOperationList.length}`,
                    moduleTestId: props.moduleId,
                    statement: "",
                    alternativeOne: "",
                    alternativeTwo: "",
                    alternativeThree: "",
                    alternativeFour: "",
                    answers: ""
                }
            )
        }
    }

    return(
        <TestContainer>
            {props.questionOperationList
                .filter(questionOperation => questionOperation.operation !== EOperation.Delete)
                .map((questionOperation) => {
                return (
                    <Question isOnEditPage={props.isOnEditPage} type={props.type} 
                        question={questionOperation.question} 
                        defineAnswers= {props.defineAnswers}
                        updateQuestion={props.isOnEditPage ? props.updateQuestion : undefined}
                        deleteQuestion={props.isOnEditPage ? props.deleteQuestion : undefined}/>
                )
            })}
            {props.isOnEditPage &&
                <AddNewQuestion onClick={handleAddNewQuestion}>
                    <Typograph style={{fontSize: "42px"}} type={ETypographType.LightVioletText}>+</Typograph>
                    <Typograph style={{fontSize: "24px"}} type={ETypographType.ButtonTitle}>Adicionar uma nova questão</Typograph>
                </AddNewQuestion>
            }
        </TestContainer>
    )
}