import { IUser } from "../../interfaces/IUser"
import { ListItem } from "../ListItem";
import { Container } from "./styles";

interface IProps {
    users : Partial<IUser>[],
    onRemove: (userId: string) => void,
    style?: React.CSSProperties
}

export const List = (props : IProps) => {
    
    return(
        <Container style={props.style} className="custom-scroll">
            {props.users
            .map((item, key) => {
                return( 
                <ListItem
                    onRemove={props.onRemove}
                    user={item} 
                    id={key} 
                    /> )
            })}
        </Container>
    )
}