import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { Background, EBackground } from "../../components/Background";
import { Button, EButton } from "../../components/Button";
import { Card } from "../../components/Card";
import { DivLine } from "../../components/DivLine";
import { MultipleQuestionTest } from "../../components/MultipleQuestionTest";
import { ETypographType, Typograph } from "../../components/Typograph";
import { IModule } from "../../interfaces/IModule";
import { theme } from "../../themes/theme"
import * as Styled from "./styles"
import { VideoClass } from "../../components/VideoClass";
import { ModuleTextClass } from "../../components/ModuleTextClass";
import { ModuleService } from "../../services/ModuleService";
import { ITrainingProgress } from "../../interfaces/ITrainingProgress";
import { TrainingService } from "../../services/TrainingService";

export const TrainingExecution = () => {

    const { trainingId ,moduleId } = useParams();
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [trainingProgress, setTrainingProgress] = useState<ITrainingProgress>();
    const [moduleList, setModuleList] = useState<IModule[]>([]);
    const [selectedModule, setSelectedModule] = useState<IModule>();

    useEffect(() => {
        const getTrainingData = async () => {
            if(trainingId) {
                const moduleListResponse = await ModuleService.getModulesByTrainingId(userContext.token, trainingId);
                const trainingProgressResponse = await TrainingService.getTrainingProgressByUserToken(userContext.token, trainingId);

                setModuleList(moduleListResponse);
                setTrainingProgress(trainingProgressResponse[0]);
            }
        }
        getTrainingData();
        
    },[trainingId, userContext.token]);

    useEffect(() => {
        moduleList.forEach(module => {
            if(module.moduleId === moduleId) setSelectedModule(module);
        });
    }, [moduleList, moduleId]);
    
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
                        <img style={{width: "4%"}} alt="" src="/img/icons/arrowBackward.svg"></img>
                        <Typograph type={ETypographType.ConstrastVioletText} 
                            style={{color: "white", paddingLeft: "2%"}}>{selectedModule?.title}</Typograph>
                    </Styled.ShowModuleTitle>
                </Card>
                <Styled.ModuleContent>
                    {selectedModule?.moduleType.includes("TEST") &&
                    <MultipleQuestionTest questionOperationList={[]} 
                        isOnEditPage={true} moduleId={selectedModule?.moduleId} 
                        type={selectedModule?.moduleType === "TEST|Alternative" ? 2 : 1} /> }
                    {selectedModule?.moduleType === "CLASS|Video" && <VideoClass /> }
                    {selectedModule?.moduleType === "CLASS|Text" && <ModuleTextClass />}
                </Styled.ModuleContent>
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
                            <Typograph style={{width: '100%',textAlign: 'center'}} type={ETypographType.ConstrastVioletText}>LISTA DE MÓDULOS</Typograph>
                    </Card>
                <Styled.ModuleList>
                    {moduleList?.map((module) => {
                        let isSelected = module.moduleId === moduleId;
                        let isEnabled = module.position <= trainingProgress!!.currentPosition;
                        const imageDeactivatedFilterId = !isEnabled ? "deactivated-icon-module" : '';
                        const titleDeactivadedColorId = !isEnabled? "deactivated-title-module" : '';
                        let type = "text";
                        if(module.moduleType === "TEST|Alternative" || "TEST|True or False") type = "test";
                        if(module.moduleType === "CLASS|Text") type = "text";
                        if(module.moduleType === "CLASS|Video") type = "video"
                        return(
                            <>
                            <Styled.Module 
                                style={{cursor: isEnabled ? 'pointer' : undefined}}
                                isSelected={isSelected}
                                isEnabled={isEnabled}
                                onClick={() => {
                                if(isEnabled && !isSelected) navigate(`/trainingExecution/${module.trainingId}/${module.moduleId}`);
                                }}
                            >
                                <img id={imageDeactivatedFilterId} alt="Ícone de modulo" style={{ width: "10%"}} src={`/img/modules/${type}.svg`}></img>
                                <Typograph id={titleDeactivadedColorId} style={{paddingLeft: "3%"}} type={ETypographType.AuxiliarText}> {module.title} </Typograph>    
                            </Styled.Module>
                            <DivLine size={"100%"} color={theme.pallete.assistant.blueIce}></DivLine>
                            </>
                        )
                    })}
                </Styled.ModuleList>

                <Button style={{width:"40%", marginBottom: "3%"}} type={EButton.MainButtonVariation}>CONCLUIR MÓDULO</Button>
                
            </Card>
        </Background>
    )
}