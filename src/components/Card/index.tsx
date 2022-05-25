import { theme } from "../../themes/theme"
import { Container } from "./styles"

interface ICardProps {
    width: string,
    height: string,
    borderColor: string,
    borderWidth: string,
    backgroundColor?: string,
    style?: React.CSSProperties,
    children: any
}

export const Card = (props : ICardProps) => {

    return(
        <Container 
            style={props.style}
            width={props.width} 
            height={props.height}
            borderColor={props.borderColor}
            borderWidth={props.borderWidth}
            backgroundColor={
                props.backgroundColor ?
                props.backgroundColor : theme.pallete.assistant.white}>
                    {props.children}
        </Container>
    )
}