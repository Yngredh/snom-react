import { User } from "../../interfaces/User"
import { ListItem } from "../ListItem";
import { Container } from "./styles";

interface IProps {
    users : User[],
    style?: React.CSSProperties
}

export const List = (props : IProps) => {

    return(
        <Container style={props.style} className="custom-scroll">
            {props.users.map((item, key) => {
                return( <ListItem user={item} /> )
            })}
        </Container>
    )
}