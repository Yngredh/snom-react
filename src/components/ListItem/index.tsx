import { useEffect, useState } from "react"
import { IUser } from "../../interfaces/IUser"
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
    user : IUser,
    id: number,
    selected: boolean,
    onSelect: (itemId: string) => void
}

export const ListItem = (props : IListItemProps) => {
    const [styleSelection, setStyleSelection] = useState(notSelectedStyle);

    const handleClick = () => { props.onSelect(props.user.userId); }

    useEffect(() => {
        if(props.selected) setStyleSelection(selectedStyle);
        else setStyleSelection(notSelectedStyle);
    }, [props])

    return(
    <>
        <div>
            <Styled.Container backgroundColor={styleSelection.backgroundColor} onClick={handleClick}>
                <Styled.UserInfoContainer>
                    <Styled.Icon src={props.user.icon} />
                    <Styled.BlockContainer>
                        <Typograph style={{color: styleSelection.textColor, fontWeight: "700"}} type={ETypographType.MediumText}>{props.user.name}</Typograph>
                        <Typograph style={{color: styleSelection.textColor}} type={ETypographType.LightText}>{props.user.email}</Typograph>
                    </Styled.BlockContainer>
                </Styled.UserInfoContainer>
                
                <Styled.ActionsContainer>
                    <Styled.DeleteIcon src={"/img/icons/deleteIcon.svg"} ></Styled.DeleteIcon>
                </Styled.ActionsContainer>
            </Styled.Container> 
            <DivLine size={"100%"} color={theme.pallete.assistant.blueIce}/>
        </div>

    </>
    )
}