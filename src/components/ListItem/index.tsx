import { useEffect, useState } from "react"
import { User } from "../../interfaces/User"
import { theme } from "../../themes/theme"
import { DivLine } from "../DivLine"
import { Typograph, ETypographType } from "../Typograph"
import * as Styled from "./styles"

const selectedStyle = {
    textColor: theme.pallete.assistant.white,
    backgroundColor: theme.pallete.blueViolet.dark,
}

const notSelectedStyle = {
    textColor: theme.pallete.assistant.black,
    backgroundColor: 'unset'
}

interface IListItemProps {
    user : User,
    id: number,
    selected: boolean,
    onSelect: (itemId: number) => void
}

export const ListItem = (props : IListItemProps) => {
    const [styleSelection, setStyleSelection] = useState(notSelectedStyle);

    const handleClick = () => { props.onSelect(props.user.id); }

    useEffect(() => {
        if(props.selected) setStyleSelection(selectedStyle);
        else setStyleSelection(notSelectedStyle);
    }, [props])

    return(
    <>
        <div>
            <Styled.Container backgroundColor={styleSelection.backgroundColor} onClick={handleClick}>
                <Styled.Icon src={props.user.icon} />
                <Styled.BlockContainer>
                    <Typograph style={{color: styleSelection.textColor}} type={ETypographType.AuxiliarTitle}>{props.user.name}</Typograph>
                    <Typograph style={{color: styleSelection.textColor}} type={ETypographType.ConstrastVioletText}>{props.user.email}</Typograph>
                </Styled.BlockContainer>
            </Styled.Container> 
            <DivLine size={"100%"} color={theme.pallete.assistant.blueIce}/>
        </div>

    </>
    )
}