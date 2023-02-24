import { Styled, Container, StyledLink } from './styles';
import MenuItem from '../MenuItem/';
import { useContext } from 'react';
import { UserContext } from '../../App';

export const Menu = () => {
    const userContext = useContext(UserContext);
    console.log(userContext.user);
    return(
        <Styled>
            <Container>
                <StyledLink to="/">
                    <MenuItem 
                        title={"Início"} icon={"/img/icons/inicio.svg"}></MenuItem>
                </StyledLink>

                <StyledLink to="/training">
                    <MenuItem 
                        title={"Treinamento"} icon={"/img/icons/treinamento.svg"}></MenuItem>
                </StyledLink>

                {(userContext.user?.hasPermission || userContext.user?.isAdministrator) &&
                    <StyledLink to="/workshop">
                        <MenuItem 
                            title={"Oficina"} icon={"/img/icons/oficina.svg"}></MenuItem>
                    </StyledLink>    
                }

                {userContext.user?.isAdministrator &&
                    <MenuItem 
                        title={"Gerenciar Colaboradores"} icon={"/img/icons/gerenciar_colaboradores.svg"}></MenuItem> 
                }
                <MenuItem 
                    title={"Configurações"} icon={"/img/icons/configuracoes.svg"}></MenuItem>
            </Container>
            <MenuItem 
                title={"Ajuda"} icon={"/img/icons/ajuda.svg"}></MenuItem>
        </Styled>
    );
}