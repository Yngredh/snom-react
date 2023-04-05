import { useState } from "react";
import { theme } from "../../themes/theme";
import { Input } from "../Input";
import { TrueOrFalseCheckbox } from "../TrueOrFalseCheckbox";
import { ETypographType, Typograph } from "../Typograph"
import { CustomRadioInput, DropDownContainer, OptionContainer, OptionDescriptionContainer, Question, TitleContainer } from "./styles"

export enum EQuestionTestType {
    TrueOrFalse = 1,
    MultipleChoice = 2
}

export interface IMultipleQuestionTestProps {
    type: EQuestionTestType
}

export const MultipleQuestionTest = (props: IMultipleQuestionTestProps) => {
    const [isOnEditPage, setIsOnEditPage] = useState(true);
    const [isOnEditMode, setIsOnEditMode] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    
    return(
        <>
            <Question>
                <TitleContainer isSelected={isSelected} onClick={() => { if(!isOnEditMode)  setIsSelected(!isSelected)}}>
                    {isOnEditMode && isSelected ?
                        <Input 
                            style={{marginLeft: '4%'}}
                            hint={""} 
                            defaultValue={"1. O pai de Pedro têm 5 filhos: o Peter, a Patricia, a Paola e o Paulo. Qual o nome do 5º filho?"}
                            isPassword={false} 
                            width={"80%"} 
                            borderColor={theme.pallete.blueViolet.dark} 
                            onChange={(e) => {}} />  :
                        <Typograph style={{marginLeft: '4%'}} type={ETypographType.LightVioletText}> 
                            1. O pai de Pedro têm 5 filhos: o Peter, a Patricia, a Paola e o Paulo. Qual o nome do 5º filho?
                        </Typograph>
                    }
                    {isOnEditPage ? <img style={{marginRight: '4%'}} 
                        alt="Botão para editar"
                        onClick={() => {setIsOnEditMode(!isSelected)}} 
                         src={`/img/icons/${isOnEditMode ? "done_icon_violet.svg" : "edit_pencil.svg"}`} /> : <></>}
                </TitleContainer>
                <DropDownContainer isSelected={isSelected}>
                    <OptionContainer>
                        {props.type === EQuestionTestType.MultipleChoice && <CustomRadioInput name="response" type='radio' />}
                        {props.type === EQuestionTestType.TrueOrFalse && <TrueOrFalseCheckbox />}
                        {isOnEditMode ? 
                            <Input 
                                style={{marginLeft: '1%'}}
                                hint={""} 
                                defaultValue={"Pedro"}
                                isPassword={false} 
                                width={"70%"} 
                                borderColor={theme.pallete.blueViolet.dark} 
                                onChange={(e) => {}} /> :
                            <OptionDescriptionContainer>
                                <Typograph type={ETypographType.LightText}>Pedro</Typograph>
                            </OptionDescriptionContainer>
                        } 

                    </OptionContainer>
                </DropDownContainer>
            </Question>
            
        </>
    )
}