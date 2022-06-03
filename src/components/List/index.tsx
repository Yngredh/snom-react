import { useState } from "react";
import { User } from "../../interfaces/User"
import { ListItem } from "../ListItem";
import { Container } from "./styles";

interface IProps {
    users : User[],
    filterValue: string,
    setUserSelected: (user: User) => void,
    style?: React.CSSProperties
}

export const List = (props : IProps) => {
    const [selectedItem, setSelectedItem] = useState<User>()

    const selectedItemFunc = (itemId : number) => {
        const selectedUser = props.users.find((user) => user.id === itemId)
        setSelectedItem(selectedUser);
        props.setUserSelected(selectedUser!!);
    }
    
    return(
        <Container style={props.style} className="custom-scroll">
            {props.users
            .filter((user) => user.name.includes(props.filterValue) || user.email.includes(props.filterValue))
            .map((item, key) => {
                return( 
                <ListItem 
                    user={item} 
                    id={key} 
                    onSelect={selectedItemFunc} 
                    selected={selectedItem === item ? true : false} 
                    /> )
            })}
        </Container>
    )
}