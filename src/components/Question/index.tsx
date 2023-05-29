import { useState } from "react";
import { theme } from "../../themes/theme";
import { Input } from "../Input";
import { TrueOrFalseCheckbox } from "../TrueOrFalseCheckbox";
import { ETypographType, Typograph } from "../Typograph"
import { CustomRadioInput, DropDownContainer, OptionContainer, OptionDescriptionContainer, QuestionContainer, TitleContainer } from "./styles"
import { EQuestionTestType } from "../MultipleQuestionTest";
import { IQuestion } from "../../interfaces/IQuestion";

export interface IQuestionProps {
    question: Partial<IQuestion>,
    type: EQuestionTestType,
    isOnEditPage: boolean,
    updateQuestion?: (question: Partial<IQuestion>) => void
    deleteQuestion?: (questionId: string) => void
}

export const Question = (props: IQuestionProps) => {
    const [isOnEditMode, setIsOnEditMode] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const alternativeList = [  
        props.question.alternativeOne,
        props.question.alternativeTwo,
        props.question.alternativeThree,
        props.question.alternativeFour ];

    const getAnswerPerAlternative = (index: number) => props.question.answers?.split(';')[index]==='V';

    const handleAlternativeUpdate = (newValue: string, index: number) => {
        if(props.updateQuestion) {
            let newQuestion = props.question;
            if(index === 0) newQuestion.alternativeOne = newValue;
            if(index === 1) newQuestion.alternativeTwo = newValue;
            if(index === 2) newQuestion.alternativeThree = newValue;
            if(index === 3) newQuestion.alternativeFour = newValue;
            props.updateQuestion(newQuestion);
        }
    }    

    const handleResponseCheckboxUpdate = (newValue: string, index: number) => {
        if(props.updateQuestion) {
            let newQuestion  = props.question;
            let newQuestionAnswers = newQuestion.answers ? newQuestion.answers.split(';') : ['F','F','F','F'];
            newQuestionAnswers[index] = newValue;
            newQuestion.answers = newQuestionAnswers.join(';');
            props.updateQuestion(newQuestion);
        }
    }

    const handleResponseRadioUpdate = (index: number) => {
        if(props.updateQuestion) {
            let newQuestion  = props.question;
            let newQuestionAnswers = newQuestion.answers ? newQuestion.answers.split(';') : ['F','F','F','F'];
            newQuestionAnswers = newQuestionAnswers.map((value, answersIndex) => {
                if(answersIndex === index) return 'V'
                return 'F'
            });
            newQuestion.answers = newQuestionAnswers.join(';');
            props.updateQuestion(newQuestion);
        }
    }

    const handleStatementContainerClick = () => {
        if(props.isOnEditPage && isOnEditMode) return; 
        if(props.isOnEditPage) setIsOnEditMode(!isOnEditMode);
        else setIsSelected(!isSelected);
    }
    
    const handleStatementInput = (e : HTMLInputElement) => {
        if(props.updateQuestion){
            let newQuestion = props.question;
            newQuestion.statement = e.value;
            props.updateQuestion(newQuestion);
        }
    }

    return(    
    <QuestionContainer>
        <TitleContainer isSelected={isSelected || isOnEditMode} onClick={handleStatementContainerClick}>
            {isOnEditMode ?
                <Input 
                    style={{marginLeft: '4%'}}
                    hint={""} 
                    defaultValue={props.question.statement}
                    isPassword={false} 
                    width={"80%"} 
                    borderColor={theme.pallete.blueViolet.dark} 
                    onChange={handleStatementInput} />  :
                <Typograph style={{marginLeft: '4%'}} type={ETypographType.LightVioletText}> 
                    {props.question.statement}
                </Typograph>
            }
            {props.isOnEditPage && isOnEditMode ? <img style={{marginRight: '4%'}} 
                alt="Botão para editar"
                onClick={() => {setIsOnEditMode(!isOnEditMode)}} 
                src={`/img/icons/${isOnEditMode ? "done_icon_violet.svg" : "edit_pencil.svg"}`} /> : <></>}

            {props.isOnEditPage && !isOnEditMode && !isSelected ? <img style={{marginRight: '4%'}} 
                alt="Botão para deletar"
                onClick={(event) => {
                    if(props.deleteQuestion){
                        props.deleteQuestion(props.question.questionId!!);
                        event.stopPropagation();
                    }}} 
                src={`/img/icons/${"deleteIcon.svg"}`} /> : <></>}
        </TitleContainer>
        <DropDownContainer isSelected={isSelected || isOnEditMode}>
            {alternativeList.map((alternative, index) => {
                return (<OptionContainer>
                    {props.type === EQuestionTestType.MultipleChoice && 
                        <CustomRadioInput 
                            name={`response-${props.question.questionId}`} type='radio'
                            checked={getAnswerPerAlternative(index)}
                            onChange={e => {
                                handleResponseRadioUpdate(index);
                            }}
                            />} 
                    {props.type === EQuestionTestType.TrueOrFalse && 
                        <TrueOrFalseCheckbox 
                            isTrue={getAnswerPerAlternative(index)} 
                            setNewResponse={() => {
                                let newValue = !getAnswerPerAlternative(index) ? 'V' : 'F';
                                console.log(newValue);
                                handleResponseCheckboxUpdate(newValue, index);
                            }} />}
                    {isOnEditMode ? 
                        <Input 
                            style={{marginLeft: '1%'}}
                            hint={""} 
                            defaultValue={alternative}
                            isPassword={false} 
                            width={"70%"} 
                            borderColor={theme.pallete.blueViolet.dark} 
                            onChange={(e: HTMLInputElement) => handleAlternativeUpdate(e.value, index)} /> :
                        <OptionDescriptionContainer>
                            <Typograph type={ETypographType.LightText}>{alternative}</Typograph>
                        </OptionDescriptionContainer>
                    } 
                </OptionContainer>)
            })}

        </DropDownContainer>
    </QuestionContainer>
    )
}