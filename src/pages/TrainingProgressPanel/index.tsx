import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
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
         BottomSideContainer, TrainingProfileGrid, ScrollableListContainer}  from './styles'

export const TrainingProgressPanel = ( ) => {

    const userContext = useContext(UserContext);
    const [trainingProgress, setTrainingProgress] = useState<ITrainingProgress>();
    const [isLoading, setIsLoading] = useState(true);
    const { trainingId } = useParams();
    const navigate = useNavigate();

    const formatDate = (unformattedDate?: Date) => {
        if(unformattedDate) return unformattedDate.toString().split('T')[0];
    }

    const goToTrainingExecution = () => {
        let lastModuleId = "";
        trainingProgress?.training?.modules?.forEach((module) => {
            console.log(module.position)
            if (module.position === trainingProgress.currentPosition) {
                lastModuleId = module.moduleId;
            }
        })
        navigate(`/trainingExecution/${trainingId}/${lastModuleId}`);
    }

    useEffect(() => {
        const getTrainingProgress = async () => {
            const validTrainingId = trainingId ? trainingId : '';
            const trainingProgressResponse = await TrainingService.getTrainingProgressByUserToken(userContext.token, validTrainingId);
            setTrainingProgress(trainingProgressResponse[0]);
            setIsLoading(false);
        }
        getTrainingProgress();
    }, [userContext.token, trainingId]);

    return(
        <Background 
            style={{display: "flex", flexDirection: "column"}} 
            type={EBackground.SimpleBackgroundFrame}>
            <UpHeaderContainer>
                <TrainingProfileGrid>
                    <Typograph type={ETypographType.PageTitle}>
                        {!isLoading && trainingProgress?.training?.title}</Typograph>
                    <Typograph type={ETypographType.AuxiliarText}>
                        {!isLoading && trainingProgress?.training?.description}
                        </Typograph>
                </TrainingProfileGrid>
            </UpHeaderContainer>

            <ContentContainer>
                <ModulesListContainer>
                    <ScrollableListContainer>
                        {!isLoading && trainingProgress?.training?.modules?.map((module, index) => {
                            let isEnabled = module.position <= trainingProgress.currentPosition;
                            return(
                            <Card 
                                onClick={() => {
                                    if(isEnabled) navigate(`/trainingExecution/${module.trainingId}/${module.moduleId}`); 
                                }}
                                style={{marginTop: `${index === 0 ? '0px' : '2%'}`, display: "flex", alignItems: "center", 
                                justifyContent: "space-evenly", cursor: isEnabled ? "pointer" : undefined, minHeight: '70px'}}
                                borderWidth={theme.shape.borderSize}
                                width="90%" height="70px" 
                                borderColor={isEnabled ? theme.pallete.blueViolet.dark : theme.pallete.assistant.darkGray} 
                                backgroundColor={isEnabled? theme.pallete.assistant.blueIce : theme.pallete.assistant.lightGray}
                                hoverStyle={!isEnabled ? {} : {backgroundColor: theme.pallete.blueViolet.dark, borderColor: theme.pallete.blueViolet.dark}}
                                >
                                    <Typograph style={{width: "80%"}} type={ETypographType.LightText} id={isEnabled ? "module-title" : ""}>{module.title}</Typograph>
                            </Card>)
                        })}
                    </ScrollableListContainer>
                </ModulesListContainer>

                <TrainingPreview> 
                    <Card 
                        style={{display: "flex", flexDirection: "column"}}
                        width="60%" height="50%" 
                        borderColor={theme.pallete.blueViolet.dark} borderWidth={"5px"}>
                            <UpsideContainer>
                                <img src={!isLoading ? trainingProgress?.training?.emblem?.icon : ''} alt="" width={"100px"} height={"100px"}/>
                                <Card
                                    style={{display: "flex", flexDirection: "column", paddingTop: "5px", 
                                            alignItems:"center", cursor: "pointer", boxShadow: "none"}}
                                    width="130px" height="70px"
                                    borderColor={!isLoading && trainingProgress?.isFinished ? theme.pallete.cyanGreen.dark: theme.pallete.assistant.darkGray}
                                    backgroundColor={!isLoading && trainingProgress?.isFinished ? theme.pallete.cyanGreen.light: theme.pallete.assistant.lightGray}>
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
                                            type={ETypographType.ButtonTitle}>Atualizado em {!isLoading && formatDate(trainingProgress?.training?.lastUpdate)}</Typograph>
                                </TrainingInfo>
                                           
                                <TrainingInfo>
                                    <img src="/img/icons/dateRange.svg" width={"20px"} height={"20px"}/>
                                    <Typograph style={{color: "black", fontSize:"12px", width: "130px", paddingLeft: "5px"}} 
                                            type={ETypographType.ButtonTitle}>Criado em {!isLoading && formatDate(trainingProgress?.training?.createdDate)}</Typograph>
                                </TrainingInfo>
                            </BottomSideContainer>
                    </Card>
                    {!trainingProgress?.isFinished && <Button type={EButton.MainButtonVariation} width="130px"
                            style={{marginTop: "5%", cursor: "pointer"}} onClick={goToTrainingExecution}
                            icon={"/img/icons/arrowForward.svg"}>CONTINUAR</Button>}
                </TrainingPreview>
            </ContentContainer>
        </Background>
    )
}