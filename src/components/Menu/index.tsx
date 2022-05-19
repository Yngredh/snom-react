import { Styled, Container } from './styles';
import MenuItem from '../MenuItem/';

export const Menu = () => {
    return(
        <Styled>
            <Container>
                <MenuItem 
                    title={"Início"} 
                    icon={"/img/icons/inicio.svg"}></MenuItem>
                <MenuItem 
                    title={"Gerenciar Colaboradores"} 
                    icon={"/img/icons/gerenciar_colaboradores.svg"}></MenuItem>
                <MenuItem 
                    title={"Treinamento"}
                    icon={"/img/icons/treinamento.svg"}></MenuItem>
                <MenuItem 
                    title={"Alterar Senha"} 
                    icon={"/img/icons/alterar_senha.svg"}></MenuItem>
            </Container>
                <MenuItem 
                title={"Ajuda"} 
                icon={"/img/icons/ajuda.svg"}></MenuItem>
        </Styled>
    );
}