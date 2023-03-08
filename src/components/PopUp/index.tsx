import * as Styled from './styles'
import { ETypographType, Typograph } from '../../components/Typograph';
import { Button, EButton} from "../../components/Button";

export enum EPopUpType {
    WarnExitWithoutSaving = "Tem certeza que deseja sair sem salvar?",
    WarnEditActiveTraining = "Alterar o status do treinamento para 'Manutenção' irá excluir o progresso de todos os usuários cadastrados nele. Tem certeza que deseja continuar?",
    WarnRemoveUserFromTraining = "Todo o progresso desse usuário nesse treinamento será excluído. Tem certeza que deseja continuar?"
}

interface IPopUpProps {
    type: EPopUpType
}

export const PopUp = (props: IPopUpProps) => {

    const buttonLabel: string = props.type === EPopUpType.WarnRemoveUserFromTraining? "CONFIRMAR" : "SALVAR"

    return(
        <Styled.Background>
            <Styled.PopUp>
                <Styled.Header>
                    <Typograph style={{fontSize: "28px"}} type={ETypographType.MediumText}>Atenção</Typograph>
                    <img style={{cursor: "pointer"}} src={"/img/icons/closeIcon.svg"}></img>
                </Styled.Header>
                <Styled.Body>
                    <Typograph type={ETypographType.LightText}>{props.type}</Typograph>
                    <Button style={{alignSelf: "flex-end"}} type={EButton.SecondaryButton}>{buttonLabel}</Button>
                </Styled.Body>
            </Styled.PopUp>
        </Styled.Background>
    );
}