import { useState } from "react";
import { IUser } from "../../interfaces/IUser"
import { ListItem } from "../ListItem";
import { Container } from "./styles";

interface IProps {
    users : Partial<IUser>[],
    filterValue: string,
    style?: React.CSSProperties
}

export const List = (props : IProps) => {
    
    return(
        <Container style={props.style} className="custom-scroll">
            {props.users
            .filter((user) => user?.name?.includes(props.filterValue) || user?.email?.includes(props.filterValue))
            .map((item, key) => {
                return( 
                <ListItem 
                    user={item} 
                    id={key} 
                    /> )
            })}
        </Container>
    )
}