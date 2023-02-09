
import { theme } from "../../themes/theme"
import { Background, EBackground } from "../../components/Background"
import { Card } from "../../components/Card"
import { TrainingList, RecentlyAccessed, FinishedTrainings, 
    ProfileContainer, DetailedInfoCard, TrainingDiv, 
    DetailedInfoContainer, EmblemsContainer,
    TrainingLevelsContainer, ProfileTitles, TrainingGridView } from "./styles"
import { Typograph, ETypographType } from "../../components/Typograph";
import { DivLine } from "../../components/DivLine"

export const Home = () => {

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
                                    style={{}}
                                    width="48%" height="52%"
                                    borderColor={theme.pallete.blueViolet.dark}
                                    borderWidth={"1"}
                                    backgroundColor={theme.pallete.assistant.blueIce}>
                                        <img style={{width: "100%"}} alt="Ayaya" src="/img/profile/ayaya.png"/>
                                </Card>
                                <ProfileTitles>
                                    <Typograph style={{textAlign: "center"}}
                                        type={ETypographType.VioletText}> Davi Henrique Gonçalves da Silva
                                    </Typograph>
                                    <Typograph style={{textAlign: "center"}}
                                        type={ETypographType.LightVioletText}> Analista de Desenvolvimento de Software III
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
                                                type={ETypographType.VioletText}> 24
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
                                                type={ETypographType.VioletText}> 7
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
                                            <Typograph style={{fontSize: "24px", width: "12%", textAlign: "center"}} type={ETypographType.VioletText}> 7 </Typograph>
                                            <Typograph style={{fontSize: "24px", width: "12%", textAlign: "center"}} type={ETypographType.VioletText}> 10 </Typograph>
                                            <Typograph style={{fontSize: "24px", width: "12%", textAlign: "center"}} type={ETypographType.VioletText}> 5 </Typograph>
                                            <Typograph style={{fontSize: "24px", width: "12%", textAlign: "center"}} type={ETypographType.VioletText}> 2 </Typograph>
                                            <Typograph style={{fontSize: "24px", width: "12%", textAlign: "center"}} type={ETypographType.VioletText}> 0 </Typograph>
                                    </TrainingLevelsContainer>
                                    <Typograph
                                        style={{fontSize: "16px", fontWeight:"300", color: "#512DED",
                                                textAlign: "right", margin: "3% 4% 0 60%"}}
                                        type={ETypographType.LightVioletText}> Emblemas por Nível de Treinamento
                                    </Typograph>
                            </Card>
                    </Card>

                <TrainingGridView>

                    <Typograph type={ETypographType.AuxiliarTitle}> Acessados Recentemente </Typograph>
                    <TrainingList>
                        <TrainingDiv>
                                <Card
                                    width={"260px"}
                                    height={"200px"}
                                    style={{marginBottom: '4%'}}
                                    borderColor={theme.pallete.blueViolet.dark}
                                    borderWidth={"1px"}>
                                    <img width={"100%"} height={"100%"} style={{objectFit: 'contain'}} src="img/trainingIcons/Figure1.svg"/>
                                </Card>
                                <Typograph type={ETypographType.AuxiliarText}> Treinamento Básico de Banco de Dados</Typograph>
                            </TrainingDiv>
                            <TrainingDiv>
                                <Card
                                    width={"260px"}
                                    height={"200px"}
                                    style={{marginBottom: '4%'}}
                                    borderColor={theme.pallete.blueViolet.dark}
                                    borderWidth={"1px"}>
                                    <img width={"100%"} height={"100%"} src="img/trainingIcons/Figure2.svg"/>
                                </Card>
                                <Typograph type={ETypographType.AuxiliarText}> Treinamento Básico de Banco de Dados</Typograph>
                            </TrainingDiv>
                            <TrainingDiv>
                                <Card
                                    width={"260px"}
                                    height={"200px"}
                                    style={{marginBottom: '4%'}}
                                    borderColor={theme.pallete.blueViolet.dark}
                                    borderWidth={"1px"}>
                                    <img width={"100%"} height={"100%"} src="img/trainingIcons/Figure5.svg"/>
                                </Card>
                                <Typograph type={ETypographType.AuxiliarText}> Treinamento Básico de Banco de Dados</Typograph>
                            </TrainingDiv>
                            <TrainingDiv>
                                <Card
                                    width={"260px"}
                                    height={"200px"}
                                    style={{marginBottom: '4%'}}
                                    borderColor={theme.pallete.blueViolet.dark}
                                    borderWidth={"1px"}>
                                    <img width={"100%"} height={"100%"} src="img/trainingIcons/Figure5.svg"/>
                                </Card>
                                <Typograph type={ETypographType.AuxiliarText}> Treinamento Básico de Banco de Dados</Typograph>
                            </TrainingDiv>
                    </TrainingList>

                    <Typograph type={ETypographType.AuxiliarTitle}> Treinamentos Finalizados </Typograph>
                    <TrainingList>

                        <TrainingDiv>
                            <Card
                                width={"260px%"}
                                height={"200px"}
                                style={{marginBottom: '4%'}}
                                borderColor={theme.pallete.blueViolet.dark}
                                borderWidth={"1px"}>
                                    <img width={"100%"} height={"100%"} style={{objectFit: 'contain'}} src="img/trainingIcons/Figure5.svg"/>
                            </Card>
                            <Typograph type={ETypographType.AuxiliarText}> Treinamento Básico de Banco de Dados</Typograph>
                        </TrainingDiv>
                        <TrainingDiv>
                            <Card
                                width={"80%"}
                                height={"60%"}
                                style={{marginBottom: '4%'}}
                                borderColor={theme.pallete.blueViolet.dark}
                                borderWidth={"1px"}>
                                <img width={"100%"} height={"100%"} style={{objectFit: 'contain'}} src="img/trainingIcons/Figure5.svg"/>
                            </Card>
                            <Typograph type={ETypographType.AuxiliarText}> Treinamento Básico de Banco de Dados</Typograph>
                        </TrainingDiv>
                        <TrainingDiv>
                            <Card
                                width={"80%"}
                                height={"60%"}
                                style={{marginBottom: '4%'}}
                                borderColor={theme.pallete.blueViolet.dark}
                                borderWidth={"1px"}>
                                <img width={"100%"} height={"100%"} src="img/trainingIcons/Figure5.svg"/>
                            </Card>
                            <Typograph type={ETypographType.AuxiliarText}> Treinamento Básico de Banco de Dados</Typograph>
                        </TrainingDiv>
                        
                        <TrainingDiv>
                            <Card
                                width={"80%"}
                                height={"60%"}
                                style={{marginBottom: '4%'}}
                                borderColor={theme.pallete.blueViolet.dark}
                                borderWidth={"1px"}>
                                <img width={"100%"} height={"100%"} src="img/trainingIcons/Figure5.svg"/>
                            </Card>
                            <Typograph type={ETypographType.AuxiliarText}> Treinamento Básico de Banco de Dados</Typograph>
                        </TrainingDiv>
                        <TrainingDiv>
                            <Card
                                width={"80%"}
                                height={"60%"}
                                style={{marginBottom: '4%'}}
                                borderColor={theme.pallete.blueViolet.dark}
                                borderWidth={"1px"}>
                                <img width={"100%"} height={"100%"} src="img/trainingIcons/Figure5.svg"/>
                            </Card>
                            <Typograph type={ETypographType.AuxiliarText}> Treinamento Básico de Banco de Dados</Typograph>
                        </TrainingDiv>


                    </TrainingList>
                        

                </TrainingGridView>
                
                
        </Background>
    )

}