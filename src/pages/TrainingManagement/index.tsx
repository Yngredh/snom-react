import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../App";
import { TrainingService } from "../../services/TrainingService";
import { ITraining } from "../../interfaces/ITraining";
import { theme } from "../../themes/theme"
import { Background, EBackground } from "../../components/Background"
import { Typograph, ETypographType } from "../../components/Typograph";
import { DivLine } from "../../components/DivLine"
import { Card } from "../../components/Card"
import { Input } from "../../components/Input"
import { Form, CardContainer, SelectInput, 
        TopSideContainer, ButtonContainer,
        PartitionContainer, UsersManagerContainer } from "./styles"
import { Button, EButton} from "../../components/Button";
import { List } from "../../components/List";
import { EOperation, IUserOperations } from "../../interfaces/IUserOperations";

enum EExhibitionLists {
    Aprendizes = 0,
    Coordenadores = 1
}

export const TrainingManagement = () => {

    const userContext = useContext(UserContext);
    const { trainingId } = useParams();

    const [selectedListName, setSelectedListName] = useState<EExhibitionLists>(0);
    const [apprenticeList, setApprenticeList] = useState<IUserOperations[]>([]);
    const [managerList, setManagerList] = useState<IUserOperations[]>([]);
    const [training, setTraining] = useState<ITraining>();
    const [newTraining, setNewTraining] = useState<ITraining>();

    const defineBackgroundColor = (listName : EExhibitionLists) => selectedListName === listName ? 
        "rgba(138, 154, 233, 0.7)" : theme.pallete.assistant.blueIce

    const defineBorderBottom = (listName : EExhibitionLists) => selectedListName === listName ? 
        "none" : "3px solid " + theme.pallete.blueViolet.dark;

    const handleEditTraining = (value: string, field: string) => {
        if(field === "title") setNewTraining({...newTraining!!, title: value})
        else setNewTraining({...newTraining!!, description: value});
    }

    const handleEditTrainingStatus = (value: string) => {}
    
    const handleEditTrainingLevel = (value: string) => {
        const parsedLevel = parseInt(value);
        setNewTraining({...newTraining!!, level: parsedLevel? parsedLevel : 1})
    }

    const handleSaveChanges = async () => {

        if(newTraining){
            if(trainingId){
                const trainingResponse = await TrainingService.updateTraining(userContext.token, newTraining);
            }else{
                const trainingResponse = await TrainingService.createTraining(userContext.token, newTraining);
            }
        }

    }

    useEffect(() => {
        const getTraining = async () => {
            if(trainingId) {
                const trainingResponse = await TrainingService.getTrainingByTrainingId(userContext.token, trainingId);
                setTraining(trainingResponse[0]);
                setNewTraining(trainingResponse[0]);

                const managerUserResponse = await TrainingService.getManagerUsersByTrainingId(userContext.token, trainingId);
                const apprenticesResponse = await TrainingService.getApprenticeUsersByTrainingId(userContext.token, trainingId);
                
                setApprenticeList(apprenticesResponse.map(user => {
                    return {
                        operation: EOperation.None,
                        user: user
                    }
                }));
                setManagerList(managerUserResponse.map(user => {
                    return {
                        operation: EOperation.None,
                        user: user
                    }
                }));
            } 
        }
        getTraining();
    }, [userContext.token, trainingId]);

    return(
        <Background
            style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}
            type={EBackground.SimpleBackgroundFrame}>
            
            <TopSideContainer>
                <Typograph type={ETypographType.PageTitle}>Gerenciar Treinamento</Typograph>
                <ButtonContainer>
                    <Button
                        onClick={handleSaveChanges}
                        type={EButton.SecondaryButton}>SALVAR</Button>
                    <Button type={EButton.SecondaryButton}>VOLTAR</Button>
                    <Button type={EButton.MainButtonVariation}
                            icon={"/img/icons/arrowForward.svg"}>GERENCIAR MÓDULOS</Button>
                </ButtonContainer>
            </TopSideContainer>

            <CardContainer>
                <Card
                    style={{display: "flex", flexDirection: "column", alignItems: "center"}}
                    width="45%" height="96%" 
                    borderColor={theme.pallete.blueViolet.dark}
                    borderWidth={"1"}
                    backgroundColor={theme.pallete.cyanGreen.light}>
                    <Form>
                        <Typograph style={{fontSize: "20px", textAlign: "center", marginBottom: "2%"}} 
                            type={ETypographType.ConstrastVioletText}>Informações do Treinamento</Typograph>
                        <DivLine size={"80%"} color={theme.pallete.blueViolet.dark}></DivLine>

                        <Typograph style={{color:"#000000", marginTop: "5%"}}
                            type={ETypographType.MediumText}>Título do Treinamento</Typograph>
                        <Input 
                            style={{marginBottom: '8%'}} hint={"Digite um título para o treinamento"}
                                isPassword={false} width="80%"
                                borderColor={theme.pallete.blueViolet.dark}
                                onChange={e => handleEditTraining(e.value, "title")}
                                defaultValue={newTraining?.title? newTraining.title : ""}/>

                        <Typograph style={{color:"#000000"}} type={ETypographType.MediumText}>Descrição</Typograph>
                        <Input
                            style={{marginBottom: '8%', height: "20%"}}
                            hint={"Escreva uma breve descrição sobre o conteúdo desse treinamento"}
                            isPassword={false} width="100%"
                            borderColor={theme.pallete.blueViolet.dark}
                            onChange={e => handleEditTraining(e.value, "description")} 
                            defaultValue={newTraining?.description? newTraining.description : ""}/>
                            
                        <Typograph style={{color:"#000000"}} type={ETypographType.MediumText}>Status do Treinamento</Typograph>
                        <SelectInput onClick={element => handleEditTrainingStatus(element.currentTarget.value)}>
                            <option selected={newTraining?.status.trainingStatusId === 1} value="1">Disponível</option>
                            <option selected={newTraining?.status.trainingStatusId === 2} value="2">Manutenção</option>
                            <option selected={newTraining?.status.trainingStatusId === 3} value="3">Inativo</option>
                        </SelectInput>

                        <Typograph style={{color:"#000000"}} type={ETypographType.MediumText}>Nível do treinamento</Typograph>
                        <SelectInput onClick={element => handleEditTrainingLevel(element.currentTarget.value)}>
                            <option selected={newTraining?.level === 1} value="1">Nível 1</option>
                            <option selected={newTraining?.level === 2} value="2">Nível 2</option>
                            <option selected={newTraining?.level === 3} value="3">Nível 3</option>
                            <option selected={newTraining?.level === 4} value="4">Nível 4</option>
                            <option selected={newTraining?.level === 5} value="5">Nível 5</option>
                        </SelectInput>
                    </Form>
                </Card>

                <UsersManagerContainer>
                    <PartitionContainer>
                        <Card
                            onClick={() => setSelectedListName(EExhibitionLists.Aprendizes)}
                            style={{display: "flex", justifyContent: "center", alignItems: "center", 
                                cursor: "pointer", borderBottom: defineBorderBottom(EExhibitionLists.Aprendizes), 
                                borderBottomLeftRadius: "0", borderBottomRightRadius: "0", boxShadow: "none"}}
                            hoverStyle={{backgroundColor: "rgba(138, 154, 233, 0.7)"}}
                            width="50%" height="100%" 
                            borderColor={theme.pallete.blueViolet.dark}
                            borderWidth={"1"}
                            backgroundColor={defineBackgroundColor(EExhibitionLists.Aprendizes)}>
                            <Typograph type={ETypographType.AuxiliarTitle}>Aprendizes</Typograph>
                        </Card>
                        <Card
                            onClick={() => setSelectedListName(EExhibitionLists.Coordenadores)}
                            style={{display: "flex", justifyContent: "center", alignItems: "center", 
                                cursor: "pointer", borderBottom: defineBorderBottom(EExhibitionLists.Coordenadores), 
                                borderBottomLeftRadius: "0", borderBottomRightRadius: "0", boxShadow: "none"}}
                            hoverStyle={{backgroundColor: "rgba(138, 154, 233, 0.7)"}}
                            width="50%" height="100%" 
                            borderColor={theme.pallete.blueViolet.dark}
                            borderWidth={"1"}
                            backgroundColor={defineBackgroundColor(EExhibitionLists.Coordenadores)}>
                            <Typograph type={ETypographType.AuxiliarTitle}>Coordenadores</Typograph>
                        </Card>
                    </PartitionContainer>   
                    <Card
                        style={{display: "flex", flexDirection: "column", alignItems: "center", 
                            borderTopLeftRadius: "0", borderTopRightRadius: "0", borderTop: "none"}}
                        width="100%" height="92%" 
                        borderColor={theme.pallete.blueViolet.dark}
                        borderWidth={"1"}
                        backgroundColor={"rgba(138, 154, 233, 0.7)"}>
                        <SelectInput style={{width: "90%", marginTop: "2%", marginBottom: "1%"}}>
                            <option value="1">yngredh.cruz@gmail.com</option>
                            <option value="2">davihgs20@gmail.com</option>
                            <option value="3">yngredh.cruz@gmail.com</option>
                            <option value="4">adalberto.t@gmail.com</option>
                            <option value="5">yngredhzinha@gmail.com</option>
                        </SelectInput>
                        {selectedListName === EExhibitionLists.Aprendizes ? 
                            <List users={apprenticeList.map(x=> x.user)} filterValue={""}/> :
                            <List users={managerList.map(x => x.user)} filterValue={""} />
                        }
                        
                    </Card>
                </UsersManagerContainer>
            </CardContainer>

        </Background>
    )
}