import { User } from "../../interfaces/User"
import { ListItem } from "../ListItem";
import { Container } from "./styles";

interface IProps {
    users : User[]
}

export const List = (props : IProps) => {

    return(
        <Container>
            {props.users.map((item, key) => {
                return( <ListItem user={item} /> )
            })}
        </Container>
    )
}