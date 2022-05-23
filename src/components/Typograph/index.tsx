import { useEffect, useState } from "react"
import { theme } from "../../themes/theme";
import { Paragraph } from "./styles"


export enum ETypograghType {
    PageTitle = 0,
    MainTitle = 1,
    AuxiliarTitle= 2,
    ButtonTitle = 3,
    Text = 4,
    AuxiliarText = 5
}

interface ITextValues {
    size: string,
    weight: string,
    color: string
}

interface ITypographProps {
    type: ETypograghType,
    children: any,
    style?: React.CSSProperties
}

export const Typograph = (props : ITypographProps) => {
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState('');

    const changeTextValues = (newTextValues : ITextValues ) => {
        setColor(newTextValues.color);
        setSize(newTextValues.size);
        setWeight(newTextValues.weight);
    }


    useEffect(() =>{
        if(props.type === ETypograghType.PageTitle) changeTextValues(theme.typography.pageTitle);
        if(props.type === ETypograghType.MainTitle) changeTextValues(theme.typography.mainTitle);
        if(props.type === ETypograghType.AuxiliarTitle) changeTextValues(theme.typography.auxiliarTitle);
        if(props.type === ETypograghType.ButtonTitle) changeTextValues(theme.typography.buttonTitle);
        if(props.type === ETypograghType.Text) changeTextValues(theme.typography.text);
        if(props.type === ETypograghType.AuxiliarText) changeTextValues(theme.typography.auxiliarText);
    } , [props.type]);

    return(
        <Paragraph
            color={color}
            size= {size}
            weight= {weight}
            style= {props.style}
        >
            {props.children}
        </Paragraph>
    )
}