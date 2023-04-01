import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TrainingProgressContext } from "../../App";
import { Background, EBackground } from "../../components/Background";
import { Button, EButton } from "../../components/Button";
import { Card } from "../../components/Card";
import { DivLine } from "../../components/DivLine";
import { EQuestionTestType, MultipleQuestionTest } from "../../components/MultipleQuestionTest";
import { ETypographType, Typograph } from "../../components/Typograph";
import { IModule } from "../../interfaces/IModule";
import { theme } from "../../themes/theme"
import * as Styled from "./styles"

export const TrainingExecution = () => {

    const trainingProgressContext = useContext(TrainingProgressContext);
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [selectedModule, setSelectedModule] = useState<IModule>();

    useEffect(() => {
        trainingProgressContext.trainingProgress?.training?.modules.forEach(module => {
            if(module.moduleId === moduleId) setSelectedModule(module);
        })
    })
    
    
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
                        <Typograph type={ETypographType.ConstrastVioletText} 
                            style={{color: "white", paddingLeft: "2%"}}>{selectedModule?.title}</Typograph>
                    </Styled.ShowModuleTitle>
                </Card>
                <Styled.ModuleContent>
                    {selectedModule?.moduleType.split('|')[0] === 'TEST' ? <MultipleQuestionTest type={EQuestionTestType.TrueOrFalse} /> : <></>}
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
                    {trainingProgressContext.trainingProgress?.training?.modules.map((module) => {
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
                                if(!isSelected) navigate(`/trainingExecution/${module.moduleId}`);
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