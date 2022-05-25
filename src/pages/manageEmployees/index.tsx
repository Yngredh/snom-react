import { UserMock } from '../../mock/UserMock';
import { TitleContainer, 
          MainContainer, 
          ContentContainer, 
          ListContainer, 
          UserDetailContainer} from './styles';

import { Button, EButton } from '../../components/Button';
import { List } from '../../components/List';
import { DivLine } from '../../components/DivLine';
import { ETypograghType, Typograph } from '../../components/Typograph';
import { theme } from '../../themes/theme';
import { Input } from '../../components/Input';
import { UserProfileView } from './components/UserProfileView';
import { UserEditCard } from './components/UserEditCard';

export const ManageEmployees = () => {

    const usersMock = [ UserMock, UserMock, UserMock, UserMock, UserMock, UserMock, UserMock, UserMock, UserMock, UserMock ];

    return(
        <MainContainer>
            <TitleContainer>
                    <Typograph type={ETypograghType.PageTitle}>
                        Gerenciar Colaboradores
                    </Typograph>
                    <Button type={EButton.MainButton} >
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
                    <List style={{marginTop: '3%', height: '85%'}} users={usersMock} />
                </ListContainer>
                <UserDetailContainer>
                    <UserProfileView user={UserMock} height='30%' width='94%' onDelete={() => console.log('inhai')} />
                    <DivLine size='94%' color={theme.pallete.assistant.black}/>
                    <UserEditCard />
                </UserDetailContainer>
            </ContentContainer>
        </MainContainer>
    )
}