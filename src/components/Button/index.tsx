import { useEffect, useState } from "react"
import { theme } from "../../themes/theme"
import { ContainerButton } from "./styles"

export enum EButton {
    MainButton,
    AlertButton
}

interface IButtonProps {
    type: EButton
    width?: string
    children?: any
    style?: React.CSSProperties 
    onClick?: () => void
}

export const Button = (props: IButtonProps) => {
    const [color, setColor] = useState('');
    const [hoverColor, setHoverColor] = useState('');
    const [fontHoverColor, setFontHoverColor] = useState('');

    const applyStyles = (newColor: string, 
                        newHoverColer: string, 
                        newFontHoverColor: string) => 
    {
        setColor(newColor);
        setHoverColor(newHoverColer);
        setFontHoverColor(newFontHoverColor);
    }

    useEffect(()=>{
        if(props.type === 0){
            applyStyles(
                theme.pallete.blue.main,
                theme.pallete.blue.second,
                theme.pallete.assistant.white
            );
        }

        if(props.type === 1){
            applyStyles(
                theme.pallete.assistant.alertButton,
                theme.pallete.status.fillRed,
                theme.pallete.assistant.black
            );
        }
    }, [props.type])

    return(
        <>
            <ContainerButton
                style={props.style} 
                color={color} 
                hoverColor={hoverColor} 
                fontHoverColor={fontHoverColor} 
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