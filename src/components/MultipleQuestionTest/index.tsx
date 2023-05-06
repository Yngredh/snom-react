import { useContext, useEffect, useState } from "react";
import { Question } from "../Question";
import { IQuestion } from "../../interfaces/IQuestion";
import { QuestionService } from "../../services/QuestionService";
import { UserContext } from "../../App";
import { TestContainer } from "./styles";

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
    
    return(
        <TestContainer>
            {questionList.map((question) => {
                return (
                    <Question isOnEditPage={props.isOnEditPage} type={props.type} question={question}/>
                )
            })}
        </TestContainer>
    )
}