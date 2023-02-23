import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { ITrainingProgress } from "../../interfaces/ITrainingProgress";
import { UserContext } from "../../App";
import { Background, EBackground } from "../../components/Background"
import { Button, EButton } from "../../components/Button"
import { Card } from "../../components/Card"
import { Typograph, ETypographType } from "../../components/Typograph"
import { TrainingService } from "../../services/TrainingService";
import { theme } from "../../themes/theme"
import { UpHeaderContainer, TrainingInfo, 
         ModulesListContainer, TrainingPreview, 
         ContentContainer, UpsideContainer,
         BottomSideContainer, TrainingProfileGrid}  from './styles'

export const TrainingProgressPanel = ( ) => {

    const userContext = useContext(UserContext);
    const [trainingProgress, setTrainingProgress] = useState<ITrainingProgress>();

    const { trainingId } = useParams();

    const getTrainingProgress = async () => {
        if(trainingId) {
            const trainingProgressResponse = await TrainingService.getTrainingProgressByUserToken(userContext.token, trainingId);
            setTrainingProgress(trainingProgressResponse);
        }
    }

    const formatDate = (unformattedDate?: Date) => {
        if(unformattedDate) return unformattedDate.toString().split('T')[0];
    }

    useEffect(() => {
        getTrainingProgress();
    }, [userContext.token, trainingId]);

    return(
        <Background 
            style={{display: "flex", flexDirection: "column"}} 
            type={EBackground.LoginBackgroundFrame}>
            <UpHeaderContainer>
                <TrainingProfileGrid>
                    <Typograph type={ETypographType.PageTitle}>
                        {trainingProgress?.training.title}</Typograph>
                    <Typograph type={ETypographType.AuxiliarText}>
                        {trainingProgress?.training.description}</Typograph>
                </TrainingProfileGrid>
            </UpHeaderContainer>

            <ContentContainer>
                <ModulesListContainer>
                    {trainingProgress?.training.modules.map((module) => {
                        let isEnabled = module.position <= trainingProgress.currentPosition;
                        return(
                        <Card 
                            style={{marginTop: "2%", display: "flex", alignItems: "center", 
                            justifyContent: "space-evenly", cursor: isEnabled ? "pointer" : undefined}}
                            width="50%" height="15%" hoverStyle={{backgroundColor: theme.pallete.blueViolet.dark, borderColor: theme.pallete.blueViolet.dark}}
                            borderColor={theme.pallete.blueViolet.dark} borderWidth={theme.shape.borderSize}
                            backgroundColor={theme.pallete.assistant.blueIce}>
                                <Typograph style={{width: "70%"}} type={ETypographType.LightText}>{module.title}</Typograph>
                        </Card>)
                    })}
                </ModulesListContainer>

                <TrainingPreview> 
                    <Card 
                        style={{display: "flex", flexDirection: "column"}}
                        width="60%" height="50%" 
                        borderColor={theme.pallete.blueViolet.dark} borderWidth={"5px"}>
                            <UpsideContainer>
                                <img src={trainingProgress?.training.emblem.icon} width={"100px"} height={"100px"}/>
                                <Card
                                    style={{display: "flex", flexDirection: "column", paddingTop: "5px", 
                                            alignItems:"center", cursor: "pointer", boxShadow: "none"}}
                                    width="130px" height="70px"
                                    borderColor={trainingProgress?.isFinished ? theme.pallete.cyanGreen.dark: theme.pallete.assistant.darkGray}
                                    backgroundColor={trainingProgress?.isFinished ? theme.pallete.cyanGreen.light: theme.pallete.assistant.lightGray}>
                                        <Typograph style={{color: "black", textAlign: "center", fontSize:"12px", width: "120px"}} 
                                                   type={ETypographType.ButtonTitle}>
                                                    Clique aqui para baixar seu certificado</Typograph>
                                        <img src="/img/icons/download.svg" width={"20px"} height={"20px"}/>
                                </Card>  
                            </UpsideContainer>

                            <BottomSideContainer>
                                <TrainingInfo>
                                    <img src="/img/icons/updateDate.svg" width={"20px"} height={"20px"}/>
                                    <Typograph style={{color: "black", fontSize:"12px", width: "130px", paddingLeft: "5px"}} 
                                            type={ETypographType.ButtonTitle}>Atualizado em {formatDate(trainingProgress?.training.lastUpdate)}</Typograph>
                                </TrainingInfo>
                                           
                                <TrainingInfo>
                                    <img src="/img/icons/dateRange.svg" width={"20px"} height={"20px"}/>
                                    <Typograph style={{color: "black", fontSize:"12px", width: "130px", paddingLeft: "5px"}} 
                                            type={ETypographType.ButtonTitle}>Criado em {(formatDate(trainingProgress?.training.createdDate))}</Typograph>
                                </TrainingInfo>
                            </BottomSideContainer>
                    </Card>
                    <Button type={EButton.MainButtonVariation} width="130px"
                            style={{marginTop: "5%"}}
                            icon={"/img/icons/arrowForward.svg"}>CONTINUAR</Button>
                </TrainingPreview>
            </ContentContainer>
        </Background>
    )
}