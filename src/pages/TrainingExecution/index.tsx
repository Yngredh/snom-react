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

export const TrainingExecution = () => {

    const { trainingId ,moduleId } = useParams();
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [moduleList, setModuleList] = useState<IModule[]>([]);
    const [selectedModule, setSelectedModule] = useState<IModule>();

    useEffect(() => {
        const getModules = async () => {
            if(trainingId) {
                const moduleListResponse = await ModuleService.getModulesByTrainingId(userContext.token, trainingId);
                setModuleList(moduleListResponse);
            }
        }
        getModules();
        
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
                    {selectedModule?.moduleType === "TEST|True or False" && 
                        <MultipleQuestionTest isOnEditPage={false} moduleId={selectedModule.moduleId} type={1} /> }
                    {selectedModule?.moduleType === "TEST|Alternative" && 
                        <MultipleQuestionTest isOnEditPage={false} moduleId={selectedModule.moduleId} type={2} /> }
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
                        let type = "text";
                        if(module.moduleType === "TEST|Alternative" || "TEST|True or False") type = "test";
                        if(module.moduleType === "CLASS|Text") type = "text";
                        if(module.moduleType === "CLASS|Video") type = "video"
                        return(
                            <>
                            <Styled.Module 
                                style={{cursor: 'pointer'}}
                                isSelected={isSelected}
                                onClick={() => {
                                if(!isSelected) navigate(`/trainingExecution/${module.trainingId}/${module.moduleId}`);
                                }}
                            >
                                <img alt="Ícone de modulo" style={{ width: "10%"}} src={`/img/modules/${type}.svg`}></img>
                                <Typograph style={{paddingLeft: "3%"}} type={ETypographType.AuxiliarText}>{module.title}</Typograph>    
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