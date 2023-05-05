import { useState } from "react";
import { Question } from "../Question";


export enum EQuestionTestType {
    TrueOrFalse = 1,
    MultipleChoice = 2
}

export interface IMultipleQuestionTestProps {
    type: EQuestionTestType
}

export const MultipleQuestionTest = (props: IMultipleQuestionTestProps) => {

    const questionList = [
        {
            title: "Por quê é importante que os desenvolvedores sigam as mesmas regras de codificação?",
            options: ["Redução de erros e bugs", "Melhor comunicação e consistência", "Economia de Tempo"]
        },
        {
            title: "Por quê é importante?",
            options: ["Redução de erros e bugs", "Melhor comunicação e consistência", "Economia de Tempo"]
        }
    ]
    
    return(
        <>
            {questionList.map((question) => {
                return (
                    <Question type={props.type} question={question}/>
                )
            })}
        </>
    )
}