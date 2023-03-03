import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TopSideContainer, InputContainer, Header } from './styles'
import { theme } from "../../themes/theme";
import { ETypographType, Typograph } from '../../components/Typograph';
import { TrainingGridView } from '../../components/TrainingGridView';
import { DivLine } from '../../components/DivLine';
import { Input } from '../../components/Input';
import { Background, EBackground } from '../../components/Background';
import { TrainingService } from '../../services/TrainingService';
import { UserContext } from '../../App';
import { ITraining, ITrainingStatus } from '../../interfaces/ITraining';
import { Dropdown } from '../../components/Dropdown';
import { Button, EButton} from "../../components/Button";

export const Workshop = () => {
    const [userTrainingList, setUserTrainingList] = useState<ITraining[]>([])
    const [filterParams, setFilterListParams] = useState({
        tittle: "",
        status: "0"
    })
    const userContext = useContext(UserContext);

    const options: ITrainingStatus[] = [
        {trainingStatusId: 0, description: "Sem filtro"}, 
        {trainingStatusId: 1, description: "Disponível"}, 
        {trainingStatusId: 2, description: "Manutenção"}, 
        {trainingStatusId: 3, description: "Inativo"}
    ]
    const displayEnumOptions = (item: ITrainingStatus, index: number) => {
        return(<> {item.description} </>)
    }

    useEffect(() => {
        const getTrainingList = async () => {
            const trainingList = await TrainingService.getTrainingByManagerUserToken(userContext.token);
            setUserTrainingList(trainingList);
        }
        getTrainingList();
    },[userContext.token])

    const navigate = useNavigate();

    const goToTrainingManagement = () => {
        navigate(`/trainingManagement/`);
    }

    return(
        <>
            <Background style={{display: "flex", flexDirection:"column", alignItems:"center"}} type={EBackground.SimpleBackgroundFrame}>
                <TopSideContainer>
                    <Header>
                        <Typograph
                             type={ETypographType.PageTitle}>
                                Oficina de Treinamento</Typograph>
                        <Button type={EButton.MainButtonVariation} onClick={goToTrainingManagement}
                                icon={"/img/icons/arrowForward.svg"}>CRIAR TREINAMENTO</Button>
                    </Header>
                    <DivLine size="100%" color="#000000"/>
                    <InputContainer>
                        <Dropdown<ITrainingStatus> 
                            width={"300px"}
                            borderColor={theme.pallete.assistant.black}
                            options={options}
                            icon={"img/icons/filterIcon.svg"}
                            style={{marginRight: '2%', color: '#000'}}
                            diplayData={displayEnumOptions}
                            onChange={selectedStatus => setFilterListParams({...filterParams, status: selectedStatus})}/>
                        <Input 
                            icon={"img/icons/searchIcon.svg"}
                            hint={"Pesquisar"}
                            width={"500px"}
                            isPassword={false}
                            borderColor={theme.pallete.assistant.black}
                            onChange={eventTittleChange => setFilterListParams({...filterParams, tittle: eventTittleChange.value})}/>
                    </InputContainer>
                </TopSideContainer>
                <TrainingGridView trainingList={userTrainingList} filter={filterParams} route={"trainingManagement"}/>
            </Background>
        </>
    )
}