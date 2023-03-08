import { theme } from "../../themes/theme"
import { Card } from "../Card"
import { IconInput, TextInput } from "./styles"

interface IInputProps {
    icon?: string,
    hint: string,
    isPassword: boolean,
    width: string,
    style?: React.CSSProperties,
    inputType?: React.HTMLInputTypeAttribute,
    borderColor: string,
    defaultValue?: string,
    onChange: (e: HTMLInputElement) => void
}

export const Input = (props : IInputProps) => {

    const type = () => {
        return props.inputType? props.inputType : 'text'
    }
    
    return (
        <Card 
            width={props.width}
            height="40px"
            borderColor={props.borderColor}
            borderWidth={theme.shape.borderSize}
            style={{
                ...props.style,
                display: 'flex', 
                padding: '5px',
                alignItems: 'center'
            }}
        >
            {props.icon ? (
                <IconInput src={props.icon} />
            ): <></>}
            <TextInput 
                value={props.defaultValue}
                onChange={(e) => props.onChange(e.target)}
                placeholder={props.hint}
                type={ props.isPassword ? 'password' : type() }
            />
        </Card>
    )
}