import { ContainerButton } from "./styles"

interface IProps {
    text: string
    color: string
    onClick?: () => void
}

export const Button = (props: IProps) => {

    return(
        <>
            <ContainerButton color={props.color} onClick={props.onClick}>
                {props.text}
            </ContainerButton>
        </>
    )
}