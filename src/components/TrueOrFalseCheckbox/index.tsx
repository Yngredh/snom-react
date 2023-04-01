import { useState } from "react";
import { CheckboxTrueOrFalse } from "./styles"

export const TrueOrFalseCheckbox = () => {
    const [isTrue, setIsTrue] = useState(false);

    return(<>
        <CheckboxTrueOrFalse onClick={()=> setIsTrue(!isTrue)} isTrue={isTrue}>
            <img alt="Valor da opção" 
                src={isTrue ? "/img/icons/true_check.svg" : "/img/icons/false_x.svg"} />
        </CheckboxTrueOrFalse>
    </>)
}