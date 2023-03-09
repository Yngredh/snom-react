import { useEffect, useState } from "react"
import { IUser } from "../../interfaces/IUser"
import { theme } from "../../themes/theme"
import { Input } from "../Input"
import { ETypographType, Typograph } from "../Typograph"
import { ActionContainer, EmailContainer, IconContainer, LineContainer, NameContainer, PermissionContainer, Icon, Checkbox, RoleContainer } from "./styes"

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
    const [inputBorder, setInputBorder] = useState({
        emailBorder: theme.pallete.blueViolet.dark,
        nameBorder: theme.pallete.blueViolet.dark,
        roleBorder: theme.pallete.blueViolet.dark
    });
    const [inputValidation, setInputValidation] = useState({
        emailIsValid: !!editedUser.email,
        nameIsValid: !!editedUser.name,
        roleIsValid: !!editedUser.role,
    })

    const handleDoneClick = () => {
        const isInputValid = inputValidation.emailIsValid && 
        inputValidation.nameIsValid && inputValidation.roleIsValid;

        setInputBorder({
            emailBorder: inputValidation.emailIsValid ? theme.pallete.blueViolet.dark : theme.pallete.assistant.darkRed,
            nameBorder: inputValidation.nameIsValid ? theme.pallete.blueViolet.dark : theme.pallete.assistant.darkRed,
            roleBorder: inputValidation.roleIsValid ? theme.pallete.blueViolet.dark : theme.pallete.assistant.darkRed,
        });
        
        if(isInputValid) {
            if(props.isNewUser) props.onCreateUser(editedUser);
            else if(props.user.name !== editedUser.name ||
                    props.user.email !== editedUser.email ||
                    props.user.email !== editedUser.role || 
                    props.user.hasPermission !== editedUser.hasPermission)
                        props.onEditUser(editedUser);
            setEnableEditUser(false);
        }
    }

    const handleRemoveClick = () => props.onRemoveUser(editedUser)

    const onChangeNameInput = (element: HTMLInputElement) => {
        setInputValidation({ ...inputValidation, nameIsValid: !!element.value});
        setEditedUser({...editedUser, name: element.value})
    }

    const onChangeEmailInput = (element: HTMLInputElement) => {
        setInputValidation({ ...inputValidation, emailIsValid: !!element.value});
        setEditedUser({...editedUser, email: element.value});
    }
    
    const onChangeRoleInput = (element: HTMLInputElement) => {
        setInputValidation({ ...inputValidation, roleIsValid: !!element.value});
        setEditedUser({...editedUser, role: element.value});
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
                            borderColor={inputBorder.nameBorder} 
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
                            borderColor={inputBorder.emailBorder} 
                            onChange={onChangeEmailInput} />
                    }
                </EmailContainer>
                <RoleContainer>
                    {!enableEditUser ? 
                        <Typograph
                            onClick={()=> setEnableEditUser(true)} 
                            type={ETypographType.LightText}>
                            {editedUser.role}
                        </Typograph>
                        :
                        <Input 
                            hint="Digite o cargo do usuário"
                            defaultValue={editedUser.role} 
                            isPassword={false} 
                            width={"80%"} 
                            borderColor={inputBorder.roleBorder} 
                            onChange={onChangeRoleInput} />
                    }
                </RoleContainer>
                <PermissionContainer>
                    <Checkbox
                        onChange={e=> {
                            setEnableEditUser(true);
                            setEditedUser({...editedUser, hasPermission: e.target.checked});
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