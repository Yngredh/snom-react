import { Background, EBackground } from "../../components/Background"
import { Button } from "../../components/Button"
import { Card } from "../../components/Card"
import { Typograph, ETypographType } from "../../components/Typograph"
import { theme } from "../../themes/theme"
import { UpHeaderContainer, 
            TrainingInfo, 
            ModulesListContainer, 
            TrainingPreview, 
            ContentContainer}  from './styles'

export const TrainingProgressPanel = ( ) => {
    return(
        <Background 
            style={{display: "flex", flexDirection: "column"}} 
            type={EBackground.SimpleBackgroundFrame}>
            <UpHeaderContainer>
                <TrainingInfo>
                    <Typograph type={ETypographType.PageTitle}>
                        Plano Mínimo de Teste
                    </Typograph>
                    <Typograph type={ETypographType.AuxiliarText}>
                        Insira aqui a descrição do treinamento, essa descrição deve <br></br>
                        contemplar uma breve explicação da abordagem do treinamento <br></br>
                        ou seja, o conhecimento que será adquirido nesse treino.
                    </Typograph>
                </TrainingInfo>
            </UpHeaderContainer>
            <ContentContainer>
                <ModulesListContainer>
                    <Card 
                        style={{marginTop: "2%", display: "flex", alignItems: "center", justifyContent: "space-evenly"}}
                        width="50%" height="15%" 
                        borderColor={theme.pallete.blueViolet.dark}
                        borderWidth={theme.shape.borderSize}
                        backgroundColor={theme.pallete.assistant.blueIce} >
                            <Typograph style={{width: "70%"}} type={ETypographType.LightText}>
                                Introdução aos testes básicos de desenvolvimento
                            </Typograph>
                    </Card>
                    <Card 
                        style={{marginTop: "2%", display: "flex", alignItems: "center", justifyContent: "space-evenly"}}
                        width="50%" height="15%" 
                        borderColor={theme.pallete.blueViolet.dark}
                        borderWidth={theme.shape.borderSize}
                        backgroundColor={theme.pallete.assistant.blueIce} >
                            <Typograph style={{width: "70%"}} type={ETypographType.LightText}>
                                Introdução aos testes básicos de desenvolvimento
                            </Typograph>
                    </Card>
                </ModulesListContainer>
                <TrainingPreview> 
                    <Card 
                        width="60%" height="50%"
                        borderColor={theme.pallete.blueViolet.dark}
                        borderWidth={theme.shape.borderSize}>
                    </Card>
                </TrainingPreview>
            </ContentContainer>
        </Background>
    )
}