import * as Styled from './styles'
import { ETypographType, Typograph } from '../../components/Typograph';
import { Button, EButton} from "../../components/Button";

export enum EPopUpType {
    WarnSaveConfirmation = "Todas as suas alterações serão salvas tem certeza que deseja prosseguir?",
    WarnExitWithoutSaving = "Tem certeza que deseja sair sem salvar?",
    WarnEditActiveTraining = "Alterar o status do treinamento para 'Manutenção' irá excluir o progresso de todos os usuários cadastrados nele. Tem certeza que deseja continuar?",
    WarnRemoveUserFromTraining = "Ao remover um usuário de um treinamento todo seu progresso será excluído. Tem certeza que deseja continuar?"
}

interface IPopUpProps {
    type: EPopUpType,
    onConfirm: () => void,
    onClose: () => void
}

export const PopUp = (props: IPopUpProps) => {

    const buttonLabel: string = props.type === EPopUpType.WarnRemoveUserFromTraining? "CONFIRMAR" : "SALVAR"

    return(
        <Styled.Background>
            <Styled.PopUp>
                <Styled.Header>
                    <Typograph style={{fontSize: "28px"}} type={ETypographType.MediumText}>Atenção</Typograph>
                    <img alt="" style={{cursor: "pointer"}} src={"/img/icons/closeIcon.svg"} onClick={e => props.onClose()}></img>
                </Styled.Header>
                <Styled.Body>
                    <Typograph type={ETypographType.LightText}>{props.type}</Typograph>
                    <Button onClick={props.onConfirm} style={{alignSelf: "flex-end"}} type={EButton.SecondaryButton}>{buttonLabel}</Button>
                </Styled.Body>
            </Styled.PopUp>
        </Styled.Background>
    );
}