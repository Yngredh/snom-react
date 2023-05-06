import { useState } from "react";
import { theme } from "../../themes/theme";
import { Input } from "../Input";
import { TrueOrFalseCheckbox } from "../TrueOrFalseCheckbox";
import { ETypographType, Typograph } from "../Typograph"
import { CustomRadioInput, DropDownContainer, OptionContainer, OptionDescriptionContainer, QuestionContainer, TitleContainer } from "./styles"
import { EQuestionTestType } from "../MultipleQuestionTest";
import { IQuestion } from "../../interfaces/IQuestion";

export interface IQuestionProps {
    question: IQuestion,
    type: EQuestionTestType,
    isOnEditPage: boolean
}

export const Question = (props: IQuestionProps) => {
    const [isOnEditMode, setIsOnEditMode] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    
    return(    
    <QuestionContainer>
        <TitleContainer isSelected={isSelected} onClick={() => { if(!isOnEditMode)  setIsSelected(!isSelected)}}>
            {isOnEditMode && isSelected ?
                <Input 
                    style={{marginLeft: '4%'}}
                    hint={""} 
                    defaultValue={props.question.statement}
                    isPassword={false} 
                    width={"80%"} 
                    borderColor={theme.pallete.blueViolet.dark} 
                    onChange={(e) => {}} />  :
                <Typograph style={{marginLeft: '4%'}} type={ETypographType.LightVioletText}> 
                    {props.question.statement}
                </Typograph>
            }
            {props.isOnEditPage ? <img style={{marginRight: '4%'}} 
                alt="Botão para editar"
                onClick={() => {setIsOnEditMode(!isSelected)}} 
                 src={`/img/icons/${isOnEditMode ? "done_icon_violet.svg" : "edit_pencil.svg"}`} /> : <></>}
        </TitleContainer>
        <DropDownContainer isSelected={isSelected}>
            {[  props.question.alternativeOne,
                props.question.alternativeTwo,
                props.question.alternativeThree,
                props.question.alternativeFour ].map((alternative) => {
                return (<OptionContainer>
                    {props.type === EQuestionTestType.MultipleChoice && <CustomRadioInput name="response" type='radio' />}
                    {props.type === EQuestionTestType.TrueOrFalse && <TrueOrFalseCheckbox />}
                    {isOnEditMode ? 
                        <Input 
                            style={{marginLeft: '1%'}}
                            hint={""} 
                            defaultValue={alternative}
                            isPassword={false} 
                            width={"70%"} 
                            borderColor={theme.pallete.blueViolet.dark} 
                            onChange={(e) => {}} /> :
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