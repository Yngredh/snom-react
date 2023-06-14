import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
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
        PartitionContainer, UsersManagerContainer, 
        DropDown, AddIcon } from "./styles"
import { Button, EButton} from "../../components/Button";
import { List } from "../../components/List";
import { EOperation, IUserOperations } from "../../interfaces/IUserOperations";
import { UserService } from "../../services/UserService";
import { IUser } from "../../interfaces/IUser";
import { TrainingUtils } from "../../utils/TrainingUtils";
import { EPopUpType, PopUp } from "../../components/PopUp";

enum EExhibitionLists {
    Aprendizes = 0,
    Coordenadores = 1
}

export const TrainingManagement = () => {

    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const { trainingId } = useParams();
    const [disableButton, setDisableButton] = useState<Boolean>(false);
    const [newTraining, setNewTraining] = useState<ITraining>();
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [selectedListName, setSelectedListName] = useState<EExhibitionLists>(0);
    const [apprenticeList, setApprenticeList] = useState<IUserOperations[]>([]);
    const [managerList, setManagerList] = useState<IUserOperations[]>([]);
    const [notApprenticeList, setNotApprenticeList] = useState<IUserOperations[]>([]);
    const [notManagerList, setNotManagerList] = useState<IUserOperations[]>([]);
    const [showConfirmPopUp, setShowConfirmPopUp] = useState(false);
    const [hasDeleteUserOperation, setHasDeleteUserOperation] = useState(false);

    const goToModuleManagement = () => {
        if(trainingId) navigate(`/moduleManagement/${trainingId}`);  
    }

    const goToWorkshop = () => {
        navigate(`/workshop`);
    }

    const defineBackgroundColor = (listName : EExhibitionLists) => selectedListName === listName ? 
        "rgba(138, 154, 233, 0.7)" : theme.pallete.assistant.blueIce

    const defineBorderBottom = (listName : EExhibitionLists) => selectedListName === listName ? 
        "none" : "3px solid " + theme.pallete.blueViolet.dark;

    const handleAddUser = () => {
        if(selectedListName === EExhibitionLists.Aprendizes) {
            let apprenticeUser = removeAndGetUser(selectedUser, notApprenticeList);
            apprenticeUser.operation = EOperation.Create;
            setApprenticeList([...apprenticeList, apprenticeUser]);
        }else if(selectedListName === EExhibitionLists.Coordenadores) {
            let managerUser = removeAndGetUser(selectedUser, notManagerList);
            managerUser.operation = EOperation.Create;
            setManagerList([...managerList, managerUser]);
        }
    }

    const handleEditTraining = (value: string, field: string) => {
        if(field === "title") setNewTraining({...newTraining!!, title: value})
        else setNewTraining({...newTraining!!, description: value});
    }

    const handleEditTrainingStatus = (value: string) => {
        const statusId = parseInt(value);
        const newTrainingStatus = TrainingUtils.getTrainingStatusById(statusId);
        setNewTraining({...newTraining!!, status: newTrainingStatus});
    }
    
    const handleEditTrainingLevel = (value: string) => {
        const parsedLevel = parseInt(value);
        setNewTraining({...newTraining!!, level: parsedLevel? parsedLevel : 1})
    }

    function handleRemoveUser(userId: string): void {
        if(selectedListName === EExhibitionLists.Aprendizes) {
            let apprenticeUser = removeAndGetUser(userId, apprenticeList);
            if(apprenticeUser.operation === EOperation.Create){
                apprenticeUser.operation = EOperation.None;
                setNotApprenticeList([...notApprenticeList, apprenticeUser]);
            } else {
                apprenticeUser.operation = EOperation.Delete;
                setHasDeleteUserOperation(true);
                setApprenticeList([...apprenticeList, apprenticeUser]);
            };
        }else{
            let managerUser = removeAndGetUser(userId, managerList);
            if(managerUser.operation === EOperation.Create){
                managerUser.operation = EOperation.None;
                setNotManagerList([...notManagerList, managerUser]);
            } else {
                managerUser.operation = EOperation.Delete;
                setManagerList([...managerList, managerUser]);
            };
        }
    }

    const handleSaveChanges = async () => {
        const apprenticesToCreate :string[] = [];
        const apprenticesToRemove :string[] = [];
        const managersToCreate :string[] = [];
        const managersToRemove :string[] = [];

        if(newTraining){
            if(trainingId){
                await TrainingService.updateTraining(userContext.token, newTraining);
            }else{
                const newTrainingId = await TrainingService.createTraining(userContext.token, newTraining);
                navigate('/trainingManagement/'+newTrainingId);
                return;
            }
        }

        apprenticeList.forEach(userOperation => {
            if(userOperation.operation === EOperation.Create) apprenticesToCreate.push(userOperation.user.userId!!);
            if(userOperation.operation === EOperation.Delete) apprenticesToRemove.push(userOperation.user.userId!!);
        });

        managerList.forEach(userOperation => {
            if(userOperation.operation === EOperation.Create) managersToCreate.push(userOperation.user.userId!!);
            if(userOperation.operation === EOperation.Delete) managersToRemove.push(userOperation.user.userId!!);
        });

        await UserService.addNewTrainingApprentice(userContext.token, trainingId!!, apprenticesToCreate);
        await UserService.removeTrainingApprentice(userContext.token, trainingId!!, apprenticesToRemove);
        await UserService.addNewTrainingManager(userContext.token, trainingId!!, managersToCreate);
        await UserService.removeTrainingManager(userContext.token, trainingId!!, managersToRemove);

        navigate(0);
    }

    const populateUserOperationState = (list: IUser[], setMethod: (userOperationList: IUserOperations[]) => void) => {
        const newUserOperationsList: IUserOperations[] = list.map(user => {
            return {
                user: user,
                operation: EOperation.None
            }
        });
        setMethod(newUserOperationsList);
    }

    const removeAndGetUser = (userId: string, list: IUserOperations[]) => {
        return list.filter((user, index, arr) => {
            if(user.user.userId === userId) {
                arr.splice(index, 1);
                return true;
            } return false;
        })[0];
    } 

    useEffect(() => {
        const getTraining = async () => {
            if(trainingId) {
                const trainingResponse = await TrainingService.getTrainingByTrainingId(userContext.token, trainingId);
                setNewTraining(trainingResponse[0]);

                const managerUserResponse = await TrainingService.getManagerUsersByTrainingId(userContext.token, trainingId);
                const apprenticesResponse = await TrainingService.getApprenticeUsersByTrainingId(userContext.token, trainingId);
                const notApprenticesResponse = await UserService.getAllUsersNotAssignedByTrainingId(userContext.token, trainingId);
                const notManagerUserResponse = await UserService.getNotManagersUsersByTrainingId(userContext.token, trainingId);
                
                populateUserOperationState(managerUserResponse, setManagerList);
                populateUserOperationState(apprenticesResponse, setApprenticeList);
                populateUserOperationState(notApprenticesResponse, setNotApprenticeList);
                populateUserOperationState(notManagerUserResponse, setNotManagerList);
            } else {setDisableButton(true)}
        }
        getTraining();
    }, [userContext.token, trainingId]);

    return(
        <Background
            style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}
            type={EBackground.SimpleBackgroundFrame}>
            {showConfirmPopUp && <PopUp 
                type={hasDeleteUserOperation? EPopUpType.WarnRemoveUserFromTraining : EPopUpType.WarnSaveConfirmation}
                onConfirm={handleSaveChanges}
                onClose={() => setShowConfirmPopUp(false)}/>
            }
            
            <TopSideContainer>
                <Typograph type={ETypographType.PageTitle}>Gerenciar Treinamento</Typograph>
                <ButtonContainer>
                    <Button
                        onClick={() => setShowConfirmPopUp(true)}
                        type={EButton.SecondaryButton}>SALVAR</Button>
                    <Button type={EButton.SecondaryButton} onClick={goToWorkshop}>VOLTAR</Button>
                    <Button type={disableButton?EButton.Disable:EButton.MainButtonVariation}
                            icon={"/img/icons/arrowForward.svg"}
                            onClick={goToModuleManagement}>GERENCIAR MÓDULOS</Button>
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
                            {TrainingUtils.TrainingStatusList.map(trainingStatus => {
                                let id = trainingStatus.trainingStatusId;
                                let selected = newTraining?.status?.trainingStatusId ? newTraining?.status?.trainingStatusId === id : false;
                                return (<>
                                    <option selected={selected} value={`${id}`}>{trainingStatus.description}</option>
                                </>)
                            })}
                        </SelectInput>

                        <Typograph style={{color:"#000000", marginTop: '8%'}} type={ETypographType.MediumText}>Nível do treinamento</Typograph>
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
                        <DropDown>
                            <SelectInput onClick={e=> setSelectedUser(e.currentTarget.value)} style={{width: "90%", height: "90%", marginTop: "2%", marginBottom: "1%"}}>
                                {selectedListName === EExhibitionLists.Aprendizes ? 
                                    notApprenticeList.map(user => {
                                        return <option value={user.user.userId}>{user.user.email}</option>
                                    }) : 
                                    notManagerList.map(user => {
                                        return <option value={user.user.userId}>{user.user.email}</option>
                                    }) 
                                }
                            </SelectInput>
                            <AddIcon onClick={() => handleAddUser()} src="/img/icons/addIcon.svg"></AddIcon>
                        </DropDown>
                        
                        {selectedListName === EExhibitionLists.Aprendizes ? 
                            <List users={apprenticeList.filter(x=> EOperation.Delete !== x.operation ).map(x=> x.user)} onRemove={handleRemoveUser} /> :
                            <List users={managerList.filter(x=> EOperation.Delete !== x.operation ).map(x => x.user)} onRemove={handleRemoveUser} />
                        }
                        
                    </Card>
                    
                </UsersManagerContainer>
            </CardContainer>

        </Background>
    )
}