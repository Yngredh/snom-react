import { useEffect, useState } from "react"
import { Background, EBackground } from "../../components/Background"
import { Button, EButton } from "../../components/Button"
import { DivLine } from "../../components/DivLine"
import { Input } from "../../components/Input"
import { ETypographType, Typograph } from "../../components/Typograph"
import { UserTable } from "../../components/UserTable"
import { IUser } from "../../interfaces/IUser"
import { ListedUsers } from "../../mock/UserMock"
import { theme } from "../../themes/theme"
import { ButtonsContainer, TopButtonAndTitleContainer, TopContainer } from "./styles"

enum EOperation {
    None = 0,
    Creating = 1,
    Create = 2,
    Update = 3,
    Delete = 4
}

interface IUserOperations {
    user: Partial<IUser>,
    operation: EOperation
}

export const ManageUsers = () => {
    const mockUserList = ListedUsers.map(user => {
        const newIUserOperation: IUserOperations = {
            user: user,
            operation: 0
        }
        return newIUserOperation;
    })
    const [searchedValue, setSearchedValue] = useState('');
    const [scrollToLast, setScrollToLast] = useState(false);
    const [userOperationList, setUserOperationList] = useState<IUserOperations[]>(mockUserList);

    const isUserOnCreatingOperation = (user: Partial<IUser>) => {
        const userOperation = userOperationList.filter(listedUserOperation => listedUserOperation.user.userId === user.userId)[0];
        return userOperation.operation === EOperation.Creating;
    } 

    const handleCreatingOperation = () => {
        const newUser: Partial<IUser>  = {
            userId: `TEMPORARY-ID-${userOperationList.length}`,
            icon: "/img/profile/level1.svg",
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

        if(deleteUser.operation === EOperation.Create) {
            setUserOperationList(userOperationList.filter(listesdUserOperation => listesdUserOperation.user.userId !== user.userId));
        }else{
            setUserOperationList(
                userOperationList.map(listedUserOperation => {
                    if(listedUserOperation.user.userId === user.userId) {
                        return {
                            user,
                            operation: EOperation.Delete
                        } as IUserOperations
                    } 
                    return listedUserOperation;
                })
            );
        }
    }

    useEffect(()=>{
        if(scrollToLast) setTimeout(()=> setScrollToLast(false), 100);
    },[scrollToLast])
    
    useEffect(()=>{
        console.log(userOperationList);
    }, [userOperationList])

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
                        <Button type={EButton.SecondaryButton} >
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
                    .filter(listedUserOperation => listedUserOperation.operation !== EOperation.Delete)
                    .map(listedUserOperation => listedUserOperation.user)}
                 />
        </Background>
    )
} 