import { theme } from "../../themes/theme"
import { Container } from "./styles"

interface ICardProps {
    width: string,
    height: string,
    borderColor: string,
    borderWidth: string,
    backgroundColor?: string,
    style?: React.CSSProperties,
    children: any,
    hoverStyle?: React.CSSProperties,
    onClick?: () => void
}

export const Card = (props : ICardProps) => {

    return(
        <Container 
            onClick={props.onClick}
            style={props.style}
            width={props.width} 
            height={props.height}
            hoverStyle={props.hoverStyle}
            borderColor={props.borderColor}
            borderWidth={props.borderWidth}
            backgroundColor={
                props.backgroundColor ?
                props.backgroundColor : theme.pallete.assistant.white}>
                    {props.children}
        </Container>
    )
}