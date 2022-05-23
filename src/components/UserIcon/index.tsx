import { Container, Icon } from "./styles"

interface IIconProps {
    userImg :string
}

export const UserIcon = (props : IIconProps) =>{
    

    return(
        <Container>
            <Icon src={props.userImg} alt="User profile" />
        </Container>
    )
}