import { useState } from "react";
import { User } from "../../interfaces/User"
import { ListItem } from "../ListItem";
import { Container } from "./styles";

interface IProps {
    users : User[],
    style?: React.CSSProperties
}

export const List = (props : IProps) => {
    const [selectedItem, setSelectedItem] = useState<number>()

    const selectedItemFunc = (itemId : number) => {
        setSelectedItem(itemId);
    }
    
    return(
        <Container style={props.style} className="custom-scroll">
            {props.users.map((item, key) => {
                return( 
                <ListItem 
                    user={item} 
                    id={key} 
                    onSelect={selectedItemFunc} 
                    selected={selectedItem === key ? true : false} 
                    /> )
            })}
        </Container>
    )
}