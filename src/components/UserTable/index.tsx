import { useEffect, useRef } from "react"
import { IUser } from "../../interfaces/IUser"
import { ETypographType, Typograph } from "../Typograph"
import { UserTableLine } from "../UserTableLine"
import { HeaderCell, HeaderContainer, TableContainer, ContentContainer } from "./styles"

interface IUserTableProps {
    userList: Partial<IUser>[],
    scrollToLast: boolean,
    searchedValue: string,
    addCreatedUser: (user: Partial<IUser>) => void,
    editUser: (editedUser: Partial<IUser>) => void,
    isUserOnCreatingOperation: (user: Partial<IUser>) => boolean
    removerUser: (user: Partial<IUser>) => void,
}

export const UserTable = (props: IUserTableProps) => {
    const lastItemRef = useRef<HTMLDivElement>(null); 

    useEffect(()=> {
        if(props.scrollToLast && lastItemRef.current) {
            lastItemRef.current.scroll({ top: lastItemRef.current.scrollHeight, behavior: 'smooth' });
        }
    },[lastItemRef, props.scrollToLast])

    return(
    <TableContainer>
        <HeaderContainer>
            <HeaderCell style={{justifyContent: 'center'}}>
                <Typograph type={ETypographType.MenuText}>
                    Imagem
                </Typograph>
            </HeaderCell>
            <HeaderCell>
                <Typograph type={ETypographType.MenuText}>
                    Nome
                </Typograph>
            </HeaderCell>
            <HeaderCell>
                <Typograph type={ETypographType.MenuText}>
                    E-mail
                </Typograph>
            </HeaderCell>
            <HeaderCell style={{justifyContent: 'center'}}>
                <Typograph type={ETypographType.MenuText}>
                    Permissão
                </Typograph>
            </HeaderCell>
            <HeaderCell style={{justifyContent: 'center'}}>
                <Typograph type={ETypographType.MenuText}>
                    Ação
                </Typograph>
            </HeaderCell>

        </HeaderContainer>
        <ContentContainer ref={lastItemRef}>
            {props.userList
            .filter(user => {
                if(props.searchedValue) 
                    return user.email?.includes(props.searchedValue) || user.name?.includes(props.searchedValue)
                return user;
            })
            .map((user)=> {
                return(
                    <UserTableLine 
                        isNewUser={props.isUserOnCreatingOperation(user)}
                        onCreateUser={props.addCreatedUser}
                        onEditUser={props.editUser}
                        onRemoveUser={props.removerUser} 
                        user={user}/>
                )
            })}
        </ContentContainer>
    </TableContainer>)
}