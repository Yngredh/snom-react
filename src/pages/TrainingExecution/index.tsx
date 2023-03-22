import { Background, EBackground } from "../../components/Background";
import { Button, EButton } from "../../components/Button";
import { Card } from "../../components/Card";
import { DivLine } from "../../components/DivLine";
import { ETypographType, Typograph } from "../../components/Typograph";
import { theme } from "../../themes/theme"
import * as Styled from "./styles"

export const TrainingExecution = () => {
    
    return(
        <Background
            style={{display:"flex", alignItems: "center", justifyContent: "space-around"}}
            type={EBackground.SimpleBackgroundFrame}>
            <Card
                style={{display: "flex", flexDirection: "column", alignItems: "center"}}
                width="70%" height="96%" 
                borderColor={theme.pallete.blueViolet.dark}
                borderWidth={"2"}
                backgroundColor={theme.pallete.assistant.white}>
                <Card
                    style={{display: "flex", alignItems: "center", borderRadius: "5px", boxShadow:"0px"}}
                    width="100%" height="10%" 
                    borderColor={theme.pallete.blueViolet.dark}
                    borderWidth={"0"}
                    backgroundColor={theme.pallete.blueViolet.dark}>
                    <Styled.ShowModuleTitle>
                        <img style={{width: "4%"}} src="/img/icons/arrowBackward.svg"></img>
                        <Typograph type={ETypographType.ConstrastVioletText} style={{color: "white", paddingLeft: "2%"}}>Plano Mínimo de Teste - Exercício Complementar II</Typograph>
                    </Styled.ShowModuleTitle>
                </Card>
            </Card>
            <Card
                style={{display: "flex", flexDirection: "column", alignItems: "center", boxShadow:"0px"}}
                width="25%" height="96%" 
                borderColor={theme.pallete.cyanGreen.dark}
                borderWidth={"1"}
                backgroundColor={theme.pallete.assistant.white}>
                    <Card
                        style={{display: "flex", alignItems: "center", borderRadius: "5px"}}
                        width="100%" height="10%" 
                        borderColor={theme.pallete.cyanGreen.dark}
                        borderWidth={"0"}
                        backgroundColor={theme.pallete.cyanGreen.dark}>
                    </Card>
                <Styled.ModuleList>
                    <Styled.Module>
                        <img style={{width: "10%"}} src="/img/modules/video.svg"></img>
                        <Typograph style={{paddingLeft: "3%"}} type={ETypographType.AuxiliarText}>Introdução aos testes básicos de desenvolvimento</Typograph>    
                    </Styled.Module>
                    <DivLine size={"100%"} color={theme.pallete.assistant.blueIce}></DivLine>
                    <Styled.Module>
                        <img style={{width: "10%"}} src="/img/modules/video.svg"></img>
                        <Typograph style={{paddingLeft: "3%"}} type={ETypographType.AuxiliarText}>Plano Mínimo de Teste - Exercício Complementar II</Typograph>
                    </Styled.Module>
                    <DivLine size={"100%"} color={theme.pallete.assistant.blueIce}></DivLine>
                </Styled.ModuleList>

                <Button style={{width:"40%", marginBottom: "3%"}} type={EButton.MainButtonVariation}>CONCLUIR MÓDULO</Button>
                
            </Card>
        </Background>
    )
}