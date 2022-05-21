import { Container, IconInput, TextInput } from "./styles"

interface IInputProps {
    icon?: string,
    hint: string,
    isPassword: boolean,
    width: string,
    onChange: (e: HTMLInputElement) => void
}

export const Input = (props : IInputProps) => {
    
    return (
        <Container width={props.width}>
            {props.icon ? (
                <IconInput src={props.icon} />
            ): <></>}
            <TextInput 
                onChange={(e) => props.onChange(e.target)}
                placeholder={props.hint}
                type={ props.isPassword ? 'password' : 'text'}
            />
        </Container>
    )
}