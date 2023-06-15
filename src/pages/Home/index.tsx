import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { ITrainingProgress } from "../../interfaces/ITrainingProgress";
import { TrainingService } from "../../services/TrainingService";
import { theme } from "../../themes/theme"
import { Background, EBackground } from "../../components/Background"
import { Card } from "../../components/Card"
import { DivLine } from "../../components/DivLine"
import { Typograph, ETypographType } from "../../components/Typograph";
import { TrainingList, RecentlyAccessed, FinishedTrainings, 
    ProfileContainer, DetailedInfoCard, TrainingDiv, 
    DetailedInfoContainer, EmblemsContainer,
    TrainingLevelsContainer, ProfileTitles, TrainingGridView } from "./styles"
import { useNavigate } from "react-router-dom";
    
export const Home = () => {
    const [trainingProgressList, setTrainingProgressList] = useState<ITrainingProgress[]>([]);
    const [finishedTrainingProgressList, setFinishedTrainingProgressList] = useState<ITrainingProgress[]>([]);
    const userContext = useContext(UserContext);
    
    const navigate = useNavigate();

    const sortClosestToFinishTraining = (firstTrainingProgress: ITrainingProgress, secondTrainingProgress: ITrainingProgress) => {
        const distanceOfPrev = firstTrainingProgress.training.modulesCount - firstTrainingProgress.currentPosition;
        const distanceOfNext = secondTrainingProgress.training.modulesCount - secondTrainingProgress.currentPosition;
        if(distanceOfPrev > distanceOfNext) return 1
        if(distanceOfPrev < distanceOfNext) return -1
        return 0
    }

    useEffect(()=> {
        const getTrainingFromUser = async () => {
            const trainings = await TrainingService.getTrainingProgressByUserToken(userContext.token);
            const finishedTrainings :ITrainingProgress[] = []; 
            const notFinishedTrainings :ITrainingProgress[] = []; 
            trainings.forEach(trainingProgress => {
                if(trainingProgress.isFinished) finishedTrainings.push(trainingProgress)
                else notFinishedTrainings.push(trainingProgress);
            })
            setTrainingProgressList(notFinishedTrainings);
            setFinishedTrainingProgressList(finishedTrainings);
        }

        getTrainingFromUser();
    },[userContext.token])

    return(
        <Background
            style={{display:"flex", alignItems: "center", justifyContent: "center"}}
            type={EBackground.SimpleBackgroundFrame}>
                    <Card
                        style={{display: "flex", flexDirection: "column", alignItems: "center"}}
                        width="28%" height="80%" 
                        borderColor={theme.pallete.blueViolet.dark}
                        borderWidth={"1"}
                        backgroundColor={theme.pallete.assistant.blueIce}>
                            <ProfileContainer>
                                <Card
                                    style={{overflow: 'hidden'}}
                                    width="48%" height="52%"
                                    borderColor={theme.pallete.blueViolet.dark}
                                    borderWidth={"1"}
                                    backgroundColor={theme.pallete.assistant.blueIce}>
                                        <img style={{width: "100%", objectFit: 'cover'}} alt="User Icon" src={userContext.user?.icon}/>
                                </Card>
                                <ProfileTitles>
                                    <Typograph style={{textAlign: "center"}}
                                        type={ETypographType.VioletText}> 
                                        {userContext.user?.name}
                                    </Typograph>
                                    <Typograph style={{textAlign: "center"}}
                                        type={ETypographType.LightVioletText}>
                                            {userContext.user?.role}
                                    </Typograph>
                                </ProfileTitles>
                                
                            </ProfileContainer>

                            <DivLine size={"60%"} color={theme.pallete.assistant.darkGray}></DivLine>

                            <DetailedInfoContainer>
                                <Card
                                    width="44%" height="92%"
                                    borderColor={theme.pallete.cyanGreen.light}
                                    borderWidth={"1"}
                                    backgroundColor={theme.pallete.assistant.white}>
                                        <DetailedInfoCard>
                                            <Typograph
                                                style={{width: "40%", height: "12%", textAlign: "right"}}
                                                type={ETypographType.VioletText}> {userContext.user?.emblemCount}
                                            </Typograph>
                                            <Typograph
                                                style={{fontSize: "16px", fontWeight:"300", color: "#512DED", 
                                                        textAlign: "right", marginTop: "20%"}}
                                                type={ETypographType.LightVioletText}> Emblemas Conquistados
                                            </Typograph>
                                        </DetailedInfoCard>
                                </Card>
                                <Card
                                    width="44%" height="92%"
                                    borderColor={theme.pallete.cyanGreen.light}
                                    borderWidth={"1"}
                                    backgroundColor={theme.pallete.assistant.white}>
                                        <DetailedInfoCard>
                                            <Typograph
                                                style={{width: "40%", height: "12%", textAlign: "right"}}
                                                type={ETypographType.VioletText}> {userContext.user?.finishedTrainingCount}
                                            </Typograph>
                                            <Typograph
                                                style={{fontSize: "16px", fontWeight:"300", color: "#512DED", 
                                                        textAlign: "right", marginTop: "20%"}}
                                                type={ETypographType.LightVioletText}> Treinamentos Concluídos
                                            </Typograph>
                                        </DetailedInfoCard>
                                </Card>
                            </DetailedInfoContainer>

                            <DivLine color={theme.pallete.assistant.darkGray} size={"60%"}></DivLine>

                            <Card
                                width="80%" height="26%"
                                borderColor={theme.pallete.cyanGreen.light}
                                borderWidth={"1"}
                                backgroundColor={theme.pallete.assistant.white}>
                                    <EmblemsContainer>
                                        <img style={{width: "20%"}} alt="Medal Level One" src="/img/emblems/medalLevelOne.png"/>
                                        <img style={{width: "20%"}} alt="Medal Level Two" src="/img/emblems/medalLevelTwo.png"/>
                                        <img style={{width: "20%"}} alt="Medal Level Three" src="/img/emblems/medalLevelThree.png"/>
                                        <img style={{width: "20%"}} alt="Medal Level Four" src="/img/emblems/medalLevelFour.png"/>
                                        <img style={{width: "20%"}} alt="Medal Level Five" src="/img/emblems/medalLevelFive.png"/>
                                    </EmblemsContainer>
                                    <TrainingLevelsContainer>
                                            <Typograph style={{fontSize: "24px", width: "12%", textAlign: "center"}} type={ETypographType.VioletText}>
                                                {userContext.user?.levelOneEmblemCount} </Typograph>
                                            <Typograph style={{fontSize: "24px", width: "12%", textAlign: "center"}} type={ETypographType.VioletText}>
                                                {userContext.user?.levelTwoEmblemCount} </Typograph>
                                            <Typograph style={{fontSize: "24px", width: "12%", textAlign: "center"}} type={ETypographType.VioletText}>
                                                {userContext.user?.levelThreeEmblemCount} </Typograph>
                                            <Typograph style={{fontSize: "24px", width: "12%", textAlign: "center"}} type={ETypographType.VioletText}>
                                                {userContext.user?.levelFourEmblemCount} </Typograph>
                                            <Typograph style={{fontSize: "24px", width: "12%", textAlign: "center"}} type={ETypographType.VioletText}>
                                                {userContext.user?.levelFiveEmblemCount} </Typograph>
                                    </TrainingLevelsContainer>
                                    <Typograph
                                        style={{fontSize: "16px", fontWeight:"300", color: "#512DED",
                                                textAlign: "right", margin: "3% 4% 0 60%"}}
                                        type={ETypographType.LightVioletText}> Emblemas por Nível de Treinamento
                                    </Typograph>
                            </Card>
                    </Card>

                    <TrainingGridView>
                        <RecentlyAccessed>
                            <Typograph type={ETypographType.AuxiliarTitle}> Treinamentos em progresso </Typograph>
                            <TrainingList>
                                {trainingProgressList
                                .sort((a,b) => sortClosestToFinishTraining(a, b))
                                .map(trainingProgress => {
                                    return(
                                        <TrainingDiv>
                                            <Card 
                                                onClick={() => navigate(`/training/${trainingProgress.training.trainingId}`)}
                                                style={{cursor: 'pointer'}}
                                                width={"260px"}
                                                height={"200px"}
                                                borderColor={theme.pallete.blueViolet.dark}
                                                borderWidth={"1px"}>
                                                    <img width={"100%"} height={"100%"}
                                                    style={{objectFit: 'cover', borderRadius: '10px'}}
                                                    alt="" src={trainingProgress.training.icon}/>
                                            </Card>
                                            <Typograph type={ETypographType.AuxiliarText}> {trainingProgress.training.title}</Typograph>
                                        </TrainingDiv>
                                    )
                                })}

                                
                            </TrainingList>
                        </RecentlyAccessed>

                        <FinishedTrainings>
                            <Typograph type={ETypographType.AuxiliarTitle}> Treinamentos Finalizados </Typograph>
                            <TrainingList>
                                {finishedTrainingProgressList
                                .map(trainingProgress => {
                                    return(
                                        <TrainingDiv>
                                            <Card 
                                                onClick={() => navigate(`/training/${trainingProgress.training.trainingId}`)}
                                                style={{cursor: 'pointer'}}
                                                width={"260px"}
                                                height={"200px"}
                                                borderColor={theme.pallete.blueViolet.dark}
                                                borderWidth={"1px"}>
                                                    <img width={"100%"} height={"100%"}
                                                    style={{objectFit: 'cover', borderRadius: '10px'}}
                                                    alt="" src={trainingProgress.training.icon}/>
                                            </Card>
                                            <Typograph type={ETypographType.AuxiliarText}> {trainingProgress.training.title}</Typograph>
                                        </TrainingDiv>
                                    )
                                })
                                }
                            </TrainingList>
                        </FinishedTrainings>
                    </TrainingGridView>
                
        </Background>
    )

}
