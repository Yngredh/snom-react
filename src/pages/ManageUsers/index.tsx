import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"
import { Background, EBackground } from "../../components/Background"
import { Button, EButton } from "../../components/Button"
import { DivLine } from "../../components/DivLine"
import { Input } from "../../components/Input"
import { ETypographType, Typograph } from "../../components/Typograph"
import { UserTable } from "../../components/UserTable"
import { IUser } from "../../interfaces/IUser"
import { EOperation, IUserOperations } from "../../interfaces/IUserOperations"
import { UserService } from "../../services/UserService"
import { profileIconList } from "../../utils/iconLists"
import { theme } from "../../themes/theme"
import { ButtonsContainer, TopButtonAndTitleContainer, TopContainer } from "./styles"
import { useNavigate } from "react-router-dom"

export const ManageUsers = () => {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [searchedValue, setSearchedValue] = useState('');
    const [scrollToLast, setScrollToLast] = useState(false);
    const [userOperationList, setUserOperationList] = useState<IUserOperations[]>([]);

    const handleCreatingOperation = () => {
        const randomFile = profileIconList[Math.floor(Math.random() * profileIconList.length)]
        const newUser: Partial<IUser>  = {
            userId: `TEMPORARY-ID-${userOperationList.length}`,
            icon: `/img/profile/${randomFile}`,
            hasPermission: false
        };
        setUserOperationList([...userOperationList, {
            user: newUser,
            operation: EOperation.Creating
        }]);
        setSearchedValue('');
        setScrollToLast(true);
    }

    const handleCreateOperation = (user: Partial<IUser>) => {
        setUserOperationList(
            userOperationList.map(listedUserOperation => {
                if(listedUserOperation.user.userId === user.userId) {
                    return {
                        user,
                        operation: EOperation.Create
                    } as IUserOperations
                } 
                return listedUserOperation;
            })
        );
    };

    const handleUpdateOperation = (updatedUser: Partial<IUser>) => {
        setUserOperationList(
            userOperationList.map(listedUserOperation => {
                if(listedUserOperation.user.userId === updatedUser.userId) {
                    const operation = listedUserOperation.operation === EOperation.Create ? EOperation.Create : EOperation.Update;
                    return {
                        user: updatedUser,
                        operation
                    } as IUserOperations
                } 
                return listedUserOperation;
            })
        );
    }

    const handleDeleteOperation = (user: Partial<IUser>) => {
        const deleteUser = userOperationList.filter(listedUserOperation => listedUserOperation.user.userId === user.userId)[0];
        setUserOperationList(
                userOperationList.map(listedUserOperation => {
                    if(listedUserOperation.user.userId === user.userId) {
                        return {
                            user,
                            operation: deleteUser.operation === EOperation.Create ? EOperation.DeleteBeforeCreate : EOperation.Delete
                        } as IUserOperations
                    } 
                    return listedUserOperation;
                })
        );
        
    }

    const isUserOnCreatingOperation = (user: Partial<IUser>) => {
        const userOperation = userOperationList.filter(listedUserOperation => listedUserOperation.user.userId === user.userId)[0];
        return userOperation.operation === EOperation.Creating;
    }
    
    const handleSaveClick = async () => {
        const listToCreate: Partial<IUser>[] = [];
        const listToEdit: Partial<IUser>[] = [];
        const listToDelete: string[] = [];

        userOperationList
            .filter(listedUserOperation => listedUserOperation.operation !== EOperation.DeleteBeforeCreate)
            .map(listedUserOperation => {
                if(listedUserOperation.operation === EOperation.Create) listToCreate.push(listedUserOperation.user);
                if(listedUserOperation.operation === EOperation.Update) listToEdit.push(listedUserOperation.user);
                if(listedUserOperation.operation === EOperation.Delete 
                    && listedUserOperation.user.userId) listToDelete.push(listedUserOperation.user.userId);
                
                return { ...listedUserOperation, operation: EOperation.None};
            });
        
        if(!!listToCreate.length) await UserService.createUser(listToCreate, userContext.token);
        if(!!listToEdit.length) await UserService.editUser(listToEdit, userContext.token);
        if(!!listToDelete.length) await UserService.deleteUser(listToDelete, userContext.token);

        navigate(0);
    }

    useEffect(()=>{
        if(scrollToLast) setTimeout(()=> setScrollToLast(false), 100);
    },[scrollToLast])
    
    useEffect(()=>{
        const getUsers = async () => {
            const userList = await UserService.getAllUsers(userContext.token);
            setUserOperationList(
                userList.map(user => {
                    const newIUserOperation: IUserOperations = {
                        user: user,
                        operation: EOperation.None
                    }
                    return newIUserOperation;
                })
            );
        };

        getUsers();
    },[userContext.token])

    return(
        <Background
         style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
         type={EBackground.SimpleBackgroundFrame}>
            <TopContainer>
                <TopButtonAndTitleContainer>
                    <Typograph type={ETypographType.PageTitle}>
                        Gerenciar Colaboradores
                    </Typograph>
                    <ButtonsContainer>
                        <Button
                            onClick={handleCreatingOperation} 
                            style={{marginRight: '5%'}}
                            type={EButton.MainButtonVariation}
                            icon={"/img/icons/addIcon.svg"}>
                                ADICIONAR USUÁRIO
                        </Button>
                        <Button onClick={handleSaveClick} type={EButton.SecondaryButton} >
                            SALVAR
                        </Button>
                    </ButtonsContainer>
                </TopButtonAndTitleContainer>
                <DivLine  size="100%" color={theme.pallete.assistant.black}/>
                <Input 
                    style={{marginTop: '0.5%', alignSelf: 'flex-end'}}
                    hint="Procure um colaborador" 
                    isPassword={false} 
                    width="500px"
                    icon="/img/icons/searchIcon.svg" 
                    borderColor={theme.pallete.assistant.black} 
                    onChange={e=> setSearchedValue(e.value)} />
            </TopContainer>
            <UserTable
                scrollToLast={scrollToLast} 
                searchedValue={searchedValue}
                addCreatedUser={handleCreateOperation}
                editUser={handleUpdateOperation}
                isUserOnCreatingOperation={isUserOnCreatingOperation}
                removerUser={handleDeleteOperation}
                userList={userOperationList
                    .filter(listedUserOperation => listedUserOperation.operation !== EOperation.Delete 
                        && listedUserOperation.operation !== EOperation.DeleteBeforeCreate)
                    .map(listedUserOperation => listedUserOperation.user)}
                 />
        </Background>
    )
} 