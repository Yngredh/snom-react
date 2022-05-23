import { theme } from "../../themes/theme"
import { Card } from "../Card"
import { IconInput, TextInput } from "./styles"

interface IInputProps {
    icon?: string,
    hint: string,
    isPassword: boolean,
    width: string,
    onChange: (e: HTMLInputElement) => void
}

export const Input = (props : IInputProps) => {
    
    return (
        <Card 
            width={props.width}
            height="40px"
            borderColor={theme.pallete.assistant.darkGray}
            borderWidth={theme.shape.borderSize}
            style={{
                display: 'flex', 
                padding: '5px',
                alignItems: 'center'
            }}
        >
            {props.icon ? (
                <IconInput src={props.icon} />
            ): <></>}
            <TextInput 
                onChange={(e) => props.onChange(e.target)}
                placeholder={props.hint}
                type={ props.isPassword ? 'password' : 'text'}
            />
        </Card>
    )
}