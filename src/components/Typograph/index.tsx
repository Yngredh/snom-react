import { useEffect, useState } from "react"
import { theme } from "../../themes/theme";
import { Paragraph } from "./styles"


export enum ETypographType {
    PageTitle = 0,
    AuxiliarTitle = 1,
    ButtonTitle = 2,
    VioletText = 3,
    ConstrastVioletText = 4,
    LightVioletText = 5,
    LightText = 6,
    MediumText = 7,
    MenuText = 8,
    AuxiliarText = 9
}

interface ITextValues {
    size: string,
    weight: string,
    color: string
}

interface ITypographProps {
    type: ETypographType,
    children: any,
    id?: string,
    style?: React.CSSProperties,
    onClick?: () => void
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
        if(props.type === ETypographType.PageTitle) changeTextValues(theme.typography.pageTitle);
        if(props.type === ETypographType.AuxiliarTitle) changeTextValues(theme.typography.auxiliarTitle);
        if(props.type === ETypographType.ButtonTitle) changeTextValues(theme.typography.buttonTitle);
        if(props.type === ETypographType.VioletText) changeTextValues(theme.typography.violetText);
        if(props.type === ETypographType.ConstrastVioletText) changeTextValues(theme.typography.contrastVioletText);
        if(props.type === ETypographType.LightVioletText) changeTextValues(theme.typography.lightVioletText);
        if(props.type === ETypographType.LightText) changeTextValues(theme.typography.lightText);
        if(props.type === ETypographType.MediumText) changeTextValues(theme.typography.mediumText);
        if(props.type === ETypographType.MenuText) changeTextValues(theme.typography.menuText);
        if(props.type === ETypographType.AuxiliarText) changeTextValues(theme.typography.auxiliarText);
    } , [props.type]);

    return(
        <Paragraph
            id={props.id}
            color={color}
            size= {size}
            weight= {weight}
            style= {props.style}
            onClick={props.onClick}
        >
            {props.children}
        </Paragraph>
    )
}