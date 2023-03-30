import { useEffect, useState } from "react"
import { IUser } from "../../interfaces/IUser"
import { theme } from "../../themes/theme"
import { DivLine } from "../DivLine"
import { Typograph, ETypographType } from "../Typograph"
import * as Styled from "./styles"
interface IListItemProps {
    user : Partial<IUser>,
    onRemove: (userId: string) => void,
    id: number
}

export const ListItem = (props : IListItemProps) => {

    return(
    <>
        <div>
            <Styled.Container backgroundColor='unset'>
                <Styled.UserInfoContainer>
                    <Styled.Icon src={props.user.icon} />
                    <Styled.BlockContainer>
                        <Typograph style={{color: theme.pallete.assistant.black, fontWeight: "700"}} type={ETypographType.MediumText}>{props.user.name}</Typograph>
                        <Typograph style={{color: theme.pallete.assistant.black}} type={ETypographType.LightText}>{props.user.email}</Typograph>
                    </Styled.BlockContainer>
                </Styled.UserInfoContainer>
                
                <Styled.ActionsContainer>
                    <Styled.DeleteIcon onClick={() => props.onRemove(props.user.userId || '')} src={"/img/icons/deleteIcon.svg"} ></Styled.DeleteIcon>
                </Styled.ActionsContainer>
            </Styled.Container> 
            <DivLine size={"100%"} color={theme.pallete.assistant.blueIce}/>
        </div>

    </>
    )
}