import { TitleContainer, 
          MainContainer, 
          ContentContainer, 
          ListContainer, 
          UserDetailContainer,
          IconContainer} from './styles';

import { Button, EButton } from '../../components/Button';
import { List } from '../../components/List';
import { DivLine } from '../../components/DivLine';
import { ETypographType, Typograph } from '../../components/Typograph';
import { theme } from '../../themes/theme';
import { Input } from '../../components/Input';
import { UserProfileView } from './components/UserProfileView';
import { UserEditCard } from './components/UserEditCard';
import { User } from '../../interfaces/User';
import { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';
import { LoginCard } from '../../components/LoginCard';

export const ManageEmployees = () => {
    const [userList, setUserList] = useState<User[]>([]);
    const [selectedUser, setSelectedUser ] = useState<User>();
    const [showCreateUser, setShowCreateUser] = useState(false);

    const updateUser = () => console.log('uhu')
    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
    }
    
    const handleCreteUserButtonClick = () => {
        setShowCreateUser(!showCreateUser);
    }

    useEffect(() => {
        const getUsers = async () => {
            const users = await UserService.getAllUsers();

            setUserList(users);
        }

        getUsers();
    }, []);

    return(
        <>
            <LoginCard open={showCreateUser} onClose={handleCreteUserButtonClick} />
            <MainContainer>
                <TitleContainer>
                        <Typograph type={ETypographType.PageTitle}>
                            Gerenciar Colaboradores
                        </Typograph>
                        <Button type={EButton.MainButton} onClick={handleCreteUserButtonClick} >
                            CRIAR USUÁRIO
                        </Button>
                </TitleContainer>
                <DivLine size='100%' color={theme.pallete.assistant.black}/>
                <ContentContainer>
                    <ListContainer>
                        <Input 
                            icon='/img/icons/inicio.svg'
                            hint='search' 
                            width='100%' 
                            isPassword={false} 
                            onChange={(e) => console.log(e.value)}
                            />
                        <List setUserSelected={handleSelectUser} style={{marginTop: '3%', height: '85%'}} users={userList} />
                    </ListContainer>
                    {selectedUser ? (
                        <UserDetailContainer>
                            <UserProfileView user={selectedUser} height='30%' width='94%' onDelete={() => console.log('inhai')} />
                            <DivLine size='94%' color={theme.pallete.assistant.black}/>
                            <UserEditCard onFinish={updateUser}/>
                        </UserDetailContainer>
                    ) : 
                    (<IconContainer>
                        <img src='/img/icons/nenhum_usuario_selecionado.svg' alt='Nenhum usuário selecionado'/>
                        <Typograph type={ETypographType.AuxiliarText} > Nenhum colaborador selecionado</Typograph>
                    </IconContainer>)}
                </ContentContainer>
            </MainContainer>
        </>
    )
}