import { Styled, Container, StyledLink } from './styles';
import MenuItem from '../MenuItem/';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useLocation } from 'react-router-dom';

export const Menu = () => {
    const userContext = useContext(UserContext);
    const location = useLocation();
    

    return(
        <Styled>
            <Container>
                <StyledLink to="/">
                    <MenuItem
                        isActive={location.pathname === "/"} 
                        title={"Início"} icon={"/img/icons/inicio.svg"}></MenuItem>
                </StyledLink>

                <StyledLink to="/training">
                    <MenuItem 
                        isActive={location.pathname.includes("/training")} 
                        title={"Treinamento"} icon={"/img/icons/treinamento.svg"}></MenuItem>
                </StyledLink>

                {(userContext.user?.hasPermission || userContext.user?.isAdministrator) &&
                    <StyledLink to="/workshop">
                        <MenuItem 
                            isActive={location.pathname.includes("/workshop")} 
                            title={"Oficina"} icon={"/img/icons/oficina.svg"}></MenuItem>
                    </StyledLink>    
                }

                {userContext.user?.isAdministrator &&
                    <MenuItem 
                        isActive={location.pathname === "/manage-workers"} 
                        title={"Gerenciar Colaboradores"} icon={"/img/icons/gerenciar_colaboradores.svg"}></MenuItem> 
                }
                <MenuItem 
                    isActive={location.pathname === "/settings"} 
                    title={"Configurações"} icon={"/img/icons/configuracoes.svg"}></MenuItem>
            </Container>
            <MenuItem 
                isActive={location.pathname === "/help"}
                title={"Ajuda"} icon={"/img/icons/ajuda.svg"}></MenuItem>
        </Styled>
    );
}