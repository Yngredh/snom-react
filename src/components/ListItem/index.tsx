import { User } from "../../interfaces/User"
import * as Styled from "./styles"

interface IProps {
    user : User
}


export const ListItem = (props : IProps) => {

    return(
    <>
        <Styled.Container>
            <Styled.Icon src="/img/profile/teste.jpg" />
            <Styled.BlockContainer>
                <Styled.Name>{props.user.name}</Styled.Name>
                <Styled.Email>{props.user.email}</Styled.Email>
            </Styled.BlockContainer>
        </Styled.Container>

    </>
    )
}