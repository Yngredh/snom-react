import { useEffect, useState } from "react"
import { theme } from "../../themes/theme"
import { ContainerButton } from "./styles"

export enum EButton {
    'MainButton',
    'AlertButton'
}

interface IProps {
    text: string
    type: EButton
    onClick?: () => void
}

export const Button = (props: IProps) => {
    const [color, setColor] = useState('');
    const [hoverColor, setHoverColor] = useState('');
    const [fontHoverColor, setFontHoverColor] = useState('');

    useEffect(()=>{
        if(props.type === 0){
            setColor(theme.pallete.blue.main)
            setHoverColor(theme.pallete.blue.second)
            setFontHoverColor(theme.pallete.assistant.white)
        }

        if(props.type === 1){
            setColor(theme.pallete.assistant.alertButton)   
            setHoverColor(theme.pallete.status.fillRed)
            setFontHoverColor(theme.pallete.assistant.black)
        }
    }, [props.type])

    return(
        <>
            <ContainerButton 
                color={color} 
                hoverColor={hoverColor} 
                fontHoverColor={fontHoverColor} 
                onClick={props.onClick}
            >
                {props.text}
            </ContainerButton>
        </>
    )
}