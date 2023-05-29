
import { CheckboxTrueOrFalse } from "./styles"

export interface ICheckboxProps {
    isTrue: boolean,
    setNewResponse: () => void;
}

export const TrueOrFalseCheckbox = (props: ICheckboxProps) => {

    return(<>
        <CheckboxTrueOrFalse onClick={()=> props.setNewResponse()} isTrue={props.isTrue}>
            <img alt="Valor da opção" 
                src={props.isTrue ? "/img/icons/true_check.svg" : "/img/icons/false_x.svg"} />
        </CheckboxTrueOrFalse>
    </>)
}