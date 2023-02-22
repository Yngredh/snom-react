import { theme } from "../../themes/theme"
import { Card } from "../Card"
import { SelectionIcon, SelectionInput, SelectionOption } from "./styles"

interface ISelectionProps<T> {
    width: string,
    borderColor: string 
    options: T[],
    style?: React.CSSProperties,
    icon?: string,
    diplayData: (data: T, index: number) => React.ReactNode
    onChange: (e: string) => void
}

export const Dropdown = <T extends object> (props : ISelectionProps<T>) => {
    
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
                <SelectionIcon src={props.icon} />
            ): <></>}
            <SelectionInput onChange={e => props.onChange(e.target.value)}>
                {props.options.map((item, index) => {
                    return (<SelectionOption value={index} selected={index === 0} key={`key-${index+1}`}>
                        {props.diplayData(item, index)}
                    </SelectionOption>)
                })}
            </SelectionInput>
        </Card>
    )
}