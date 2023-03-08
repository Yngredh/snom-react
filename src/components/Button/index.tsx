import { useEffect, useState } from "react"
import { theme } from "../../themes/theme"
import { ContainerButton, IconInput } from "./styles"

export enum EButton {
    MainButton,
    MainButtonVariation,
    SecondaryButton,
    DeleteButton
}

interface IButtonProps {
    icon?: string,
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
    borderHoverColor?: string
}

export const Button = (props: IButtonProps) => {
    const [buttonProperties, setButtonProperties] = useState<EButtonProperties>({
        backgroundColor:'',
        hoverColor: '',
        fontHoverColor: '',
        borderColor: '',
        fontColor: '',
        borderHoverColor: ''
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
            borderColor: theme.pallete.cyanGreen.dark,
            hoverColor: theme.pallete.assistant.blueIce,
            fontHoverColor: theme.pallete.blueViolet.dark,
            borderHoverColor: theme.pallete.blueViolet.dark 
        });
        if(props.type === EButton.SecondaryButton) applyStyles({
            backgroundColor: theme.pallete.assistant.blueIce,
            fontColor: theme.pallete.blueViolet.dark,
            borderColor: theme.pallete.blueViolet.dark,
            hoverColor: theme.pallete.blueViolet.dark,
            fontHoverColor: theme.pallete.assistant.white
        });
        if(props.type === EButton.DeleteButton) applyStyles({
            backgroundColor: theme.pallete.assistant.lightRed,
            fontColor: theme.pallete.assistant.white,
            borderColor: theme.pallete.assistant.darkRed,
            hoverColor: theme.pallete.assistant.darkRed,
            fontHoverColor: theme.pallete.assistant.white
        });    

    }, [props.type])

    const buttonIconStyle: React.CSSProperties = {...props.style, textAlign: "start", width: "160px", justifyContent: "space-between"}

    return(
        <>
            <ContainerButton
                style={props.icon? buttonIconStyle : props.style} 
                backgroundColor={buttonProperties.backgroundColor}
                borderColor = {buttonProperties.borderColor}
                fontColor = {buttonProperties.fontColor} 
                hoverColor={buttonProperties.hoverColor} 
                fontHoverColor={buttonProperties.fontHoverColor} 
                borderHoverColor={buttonProperties.borderHoverColor}
                onClick={props.onClick}
                width= {
                    props.width ? props.width : '100px'
                }>
                {props.children}

                {props.icon ? (<IconInput src={props.icon} />): <></>}
            </ContainerButton>
        </>
    )
}