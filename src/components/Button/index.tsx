import { useEffect, useState } from "react"
import { theme } from "../../themes/theme"
import { ContainerButton } from "./styles"

export enum EButton {
    MainButton,
    MainButtonVariation,
    SecondaryButton,
    DeleteButton
}

interface IButtonProps {
    type: EButton
    width?: string
    children?: any
    style?: React.CSSProperties 
    onClick?: () => void
}

interface EButtonProperties {
    backgroundColor: string
    borderColor: string
    fontColor: string
    hoverColor: string 
    fontHoverColor: string
}

export const Button = (props: IButtonProps) => {
    const [buttonProperties, setButtonProperties] = useState<EButtonProperties>({
        backgroundColor:'',
        hoverColor: '',
        fontHoverColor: '',
        borderColor: '',
        fontColor: ''
    });

    const applyStyles = (button: EButtonProperties) => setButtonProperties(button)

    useEffect(()=>{
        if(props.type === EButton.MainButton) applyStyles({
            backgroundColor: theme.pallete.cyanGreen.dark,
            fontColor: theme.pallete.blueViolet.dark,
            hoverColor: theme.pallete.assistant.blueIce,
            fontHoverColor: theme.pallete.blueViolet.dark,
            borderColor: theme.pallete.blueViolet.dark
        });
        if(props.type === EButton.MainButtonVariation) applyStyles({
            backgroundColor: theme.pallete.cyanGreen.light,
            fontColor: theme.pallete.blueViolet.dark,
            hoverColor: theme.pallete.assistant.blueIce,
            fontHoverColor: theme.pallete.blueViolet.dark,
            borderColor: theme.pallete.cyanGreen.dark
        });
        if(props.type === EButton.SecondaryButton) applyStyles({
            backgroundColor: theme.pallete.assistant.blueIce,
            fontColor: theme.pallete.blueViolet.dark,
            hoverColor: theme.pallete.cyanGreen.light,
            fontHoverColor: theme.pallete.blueViolet.dark,
            borderColor: theme.pallete.blueViolet.dark
        });
        if(props.type === EButton.DeleteButton) applyStyles({
            backgroundColor: theme.pallete.assistant.lightRed,
            fontColor: theme.pallete.assistant.white,
            hoverColor: theme.pallete.assistant.darkRed,
            fontHoverColor: theme.pallete.assistant.white,
            borderColor: theme.pallete.assistant.darkRed
        });    

    }, [props.type])

    return(
        <>
            <ContainerButton
                style={props.style} 
                backgroundColor={buttonProperties.backgroundColor}
                borderColor = {buttonProperties.borderColor}
                fontColor = {buttonProperties.fontColor} 
                hoverColor={buttonProperties.hoverColor} 
                fontHoverColor={buttonProperties.fontHoverColor} 
                onClick={props.onClick}
                width= {
                    props.width ? props.width : 'auto'
                }
            >
                {props.children}
            </ContainerButton>
        </>
    )
}