import { Styled, Container, StyledLink } from './styles';
import MenuItem from '../MenuItem/';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';

export const Menu = () => {
    const userContext = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () : void => {
        localStorage.removeItem('authToken');
        navigate(0);
    };

    return(
        <Styled>
            <Container>
                <img  
                    height={'80px'}
                    width={'90px'}
                    style={{marginBottom: '1.5rem'}}
                    src={"/img/logotypes/menuLogotype.svg"} alt=''/>
                
                {!userContext.user?.isAdministrator &&
                    <StyledLink to="/">
                        <MenuItem
                            isActive={location.pathname === "/"} 
                            title={"Início"} icon={"/img/icons/inicio.svg"}></MenuItem>
                    </StyledLink>
                }

                {!userContext.user?.isAdministrator && 
                    <StyledLink to="/training">
                    <MenuItem 
                        isActive={location.pathname === ("/training")} 
                        title={"Treinamento"} icon={"/img/icons/treinamento.svg"}></MenuItem>
                    </StyledLink>
                }

                {(userContext.user?.hasPermission || userContext.user?.isAdministrator) &&
                    <StyledLink to="/workshop">
                        <MenuItem 
                            isActive={location.pathname.includes("/workshop") || 
                                        location.pathname.includes("/trainingManagement") || 
                                        location.pathname.includes("/moduleManagement") } 
                            title={"Oficina"} icon={"/img/icons/oficina.svg"}></MenuItem>
                    </StyledLink>    
                }

                {userContext.user?.isAdministrator &&
                    <StyledLink to="/manageusers">
                        <MenuItem 
                            isActive={location.pathname === "/manageusers"} 
                            title={"Gerenciar Colaboradores"} icon={"/img/icons/gerenciar_colaboradores.svg"}></MenuItem> 
                    </StyledLink>   
                }
                <StyledLink to="/changePassword">
                    <MenuItem 
                        isActive={location.pathname === "/changePassword"} 
                        title={"Alterar Senha"} icon={"/img/icons/keyIcon.svg"}></MenuItem>
                </StyledLink>
            </Container>
            <MenuItem 
                isActive={false}
                onClick={handleLogout}
                title={"Sair"} icon={"/img/icons/exitIcon.svg"}></MenuItem>
        </Styled>
    );
}