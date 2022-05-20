import { User } from "../../interfaces/User"
import { theme } from "../../themes/theme"
import { DivLine } from "../DivLine"
import * as Styled from "./styles"

interface IProps {
    user : User
}


export const ListItem = (props : IProps) => {

    return(
    <>
        <div style={{marginBottom : "6%"}}>
            <Styled.Container>
                <Styled.Icon src="/img/profile/teste.jpg" />
                <Styled.BlockContainer>
                    <Styled.Name>{props.user.name}</Styled.Name>
                    <Styled.Email>{props.user.email}</Styled.Email>
                </Styled.BlockContainer>
            </Styled.Container> 
            <DivLine size={"100%"} color={theme.pallete.assistant.lightGray}/>
        </div>

    </>
    )
}