import { Styled, Container } from './styles';
import MenuItem from '../MenuItem/';

interface IMenuProps {
    permissao: boolean,
}

export const Menu = (props : IMenuProps) => {
    return(
        <Styled>
            <Container>
                {!props.permissao ? (
                    <MenuItem 
                    title={"Início"} 
                    icon={"/img/icons/inicio.svg"}></MenuItem>
                ): <></>}
                <MenuItem 
                    title={"Treinamento"} 
                    icon={"/img/icons/treinamento.svg"}></MenuItem>
                <MenuItem 
                    title={"Oficina"}
                    icon={"/img/icons/oficina.svg"}></MenuItem>
                {props.permissao ? (
                    <MenuItem 
                        title={"Gerenciar Colaboradores"}
                        icon={"/img/icons/gerenciar_colaboradores.svg"}></MenuItem> 
                ): <></>}
                <MenuItem 
                    title={"Configurações"} 
                    icon={"/img/icons/configuracoes.svg"}></MenuItem>
            </Container>
                <MenuItem 
                title={"Ajuda"} 
                icon={"/img/icons/ajuda.svg"}></MenuItem>
        </Styled>
    );
}