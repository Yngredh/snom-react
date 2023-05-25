import { useContext, useEffect, useState } from "react";
import { Question } from "../Question";
import { IQuestion } from "../../interfaces/IQuestion";
import { QuestionService } from "../../services/QuestionService";
import { UserContext } from "../../App";
import { AddNewQuestion, TestContainer } from "./styles";
import { ETypographType, Typograph } from "../Typograph";
import { randomUUID } from "crypto";

export enum EQuestionTestType {
    TrueOrFalse = 1,
    MultipleChoice = 2
}

export interface IMultipleQuestionTestProps {
    type: EQuestionTestType,
    moduleId: string,
    isOnEditPage: boolean
}

export const MultipleQuestionTest = (props: IMultipleQuestionTestProps) => {

    const userContext = useContext(UserContext);
    const [questionList, setQuestionList] = useState<IQuestion[]>([]);
    
    useEffect(() => {
        const getQuestions = async () => {
            const questionListResponse = await QuestionService.getQuestionsByModuleId(props.moduleId, userContext.token);
            setQuestionList(questionListResponse);
        }

        getQuestions();
    }, [props.moduleId, userContext.token])

    const handleAddNewQuestion = () => {
        setQuestionList([...questionList, 
            {
                questionId: `TEMPORARY-ID-${questionList.length}`,
                moduleTestId: props.moduleId,
                statement: "",
                alternativeOne: "",
                alternativeTwo: "",
                alternativeThree: "",
                alternativeFour: "",
                answers: ""
            }])
    }

    return(
        <TestContainer>
            {questionList.map((question) => {
                return (
                    <Question isOnEditPage={props.isOnEditPage} type={props.type} question={question}/>
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