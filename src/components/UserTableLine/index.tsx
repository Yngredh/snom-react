import { useEffect, useState } from "react"
import { IUser } from "../../interfaces/IUser"
import { theme } from "../../themes/theme"
import { Input } from "../Input"
import { ETypographType, Typograph } from "../Typograph"
import { ActionContainer, EmailContainer, IconContainer, LineContainer, NameContainer, PermissionContainer, Icon, Checkbox } from "./styes"

interface IUserTableLineProps{
    user: Partial<IUser>,
    isNewUser: boolean,
    onCreateUser: (user: Partial<IUser>) => void,
    onEditUser: (editedUser: Partial<IUser>) => void
    onRemoveUser: (user: Partial<IUser>) => void
}

export const UserTableLine = (props: IUserTableLineProps) => {
    const [enableEditUser, setEnableEditUser] = useState(false);
    const [editedUser, setEditedUser] = useState<Partial<IUser>>(props.user);
    const [createUserValidation, setCreateUserValidation] = useState({
        emailIsValid: !!editedUser.name,
        nameIsValid: !!editedUser.email
    })

    const handleDoneClick = () => {
        const isInputValid = createUserValidation.emailIsValid && createUserValidation.nameIsValid;

        if(isInputValid) {
            if(props.isNewUser) props.onCreateUser(editedUser);
            else props.onEditUser(editedUser);
            setEnableEditUser(false);
        }
    }

    const handleRemoveClick = () => props.onRemoveUser(editedUser)

    const onChangeNameInput = (element: HTMLInputElement) => {
        setCreateUserValidation({ ...createUserValidation ,nameIsValid: !!editedUser.name});
        setEditedUser({...editedUser, name: element.value})
    }

    const onChangeEmailInput = (element: HTMLInputElement) => {
        setCreateUserValidation({ ...createUserValidation ,emailIsValid: !!editedUser.email});
        setEditedUser({...editedUser, email: element.value})
    }

    useEffect(()=> {
        if(props.isNewUser) setEnableEditUser(true);
    },[props.isNewUser])

    useEffect(()=> {
        setEditedUser(props.user);
    },[props.user])

    return(
        <>
            <LineContainer>
                <IconContainer> 
                    <Icon 
                     style={{width: '50px', height: '50px'}}
                     src={props.user.icon} />
                </IconContainer>
                <NameContainer>
                    {!enableEditUser ? 
                        <Typograph
                            onClick={()=> setEnableEditUser(true)} 
                            type={ETypographType.LightText}>
                            {editedUser.name}
                        </Typograph>
                        :
                        <Input 
                            hint="Digite o nome do usuário"
                            defaultValue={editedUser.name}
                            isPassword={false} 
                            width={"80%"} 
                            borderColor={theme.pallete.blueViolet.dark} 
                            onChange={onChangeNameInput} />
                    }
                </NameContainer>
                <EmailContainer>
                    {!enableEditUser ? 
                        <Typograph
                            onClick={()=> setEnableEditUser(true)} 
                            type={ETypographType.LightText}>
                            {editedUser.email}
                        </Typograph>
                        :
                        <Input 
                            hint="Digite o email do usuário"
                            defaultValue={editedUser.email} 
                            isPassword={false} 
                            width={"80%"} 
                            borderColor={theme.pallete.blueViolet.dark} 
                            onChange={onChangeEmailInput} />
                    }
                </EmailContainer>
                <PermissionContainer>
                    <Checkbox
                        onChange={e=> {
                            setEditedUser({...editedUser, hasPermission: e.target.checked});
                            props.onEditUser(editedUser);
                        }} 
                        checked={editedUser.hasPermission} type={"checkbox"} />
                </PermissionContainer>
                <ActionContainer>
                    <Icon
                     style={{width: '30px', height: '30px', cursor: 'pointer'}}
                     src={!enableEditUser ? "/img/icons/deleteIcon.svg" : "/img/icons/doneIcon.svg"}
                     onClick={!enableEditUser ? handleRemoveClick : handleDoneClick} />
                </ActionContainer>
            </LineContainer>
        </>
    )
}