import { useState } from 'react';
import * as Styled from './styles';
import { theme } from "../../themes/theme";
import { Card } from "../Card";
import { ETypographType, Typograph } from "../Typograph";
import { DivLine } from '../DivLine';
import { EOperation } from '../../interfaces/IUserOperations';
import { IModuleOperations } from '../../interfaces/IModuleOperations';
import { IModuleClass } from '../../interfaces/IModuleClass';
import { IModuleTest } from '../../interfaces/IModuleTest';

export interface IModuleManagementList {
    trainingId: string,
    moduleOperationList : IModuleOperations[],
    addNewModuleToList : (module: Partial<IModuleClass> | Partial<IModuleTest>) => void
    selectModule : (module: IModuleOperations) => void
}

export const ModuleManagementList = (props :IModuleManagementList) => {
    const [showNewModuleSelectBar, setShowNewModuleSelectBar] = useState(false);
    
    const handleAddModule = (moduleType : string) => {
        if(moduleType.includes("CLASS")) {
            let newClassModule: Partial<IModuleClass> = {
                module: {
                    moduleId: `TEMPORARY-ID-${props.moduleOperationList.length}`,
                    trainingId: props.trainingId,
                    moduleType: moduleType,
                    title: "Novo Módulo de Aula",
                    position: props.moduleOperationList.length + 1
                },
                content: ""
            }
            props.addNewModuleToList(newClassModule);
            setShowNewModuleSelectBar(false);
        } else{
            let newTestModule: Partial<IModuleTest> = {
                module: {
                    moduleId: `TEMPORARY-ID-${props.moduleOperationList.length}`,
                    trainingId: props.trainingId,
                    moduleType: moduleType,
                    title: "Novo Módulo de Teste",
                    position: props.moduleOperationList.length + 1
                }
            }
            props.addNewModuleToList(newTestModule);
            setShowNewModuleSelectBar(false);
        }
    }

    return(
        <Card
            style={{display: "flex", flexDirection: "column", alignItems: "center", boxShadow:"0px"}}
            width="20%" height="100%" 
            borderColor={theme.pallete.cyanGreen.dark}
            borderWidth={"1"}
            backgroundColor={theme.pallete.assistant.white}>
                <Card
                    style={{display: "flex", alignItems: "center", justifyContent: "space-between", 
                            paddingLeft: "10%", paddingRight: "10%", borderRadius: "5px"}}
                    width="100%" height="6%" 
                    borderColor={theme.pallete.cyanGreen.dark}
                    borderWidth={"0"}
                    backgroundColor={theme.pallete.cyanGreen.dark}>
                        <Typograph style={{fontSize: "24px"}} type={ETypographType.ButtonTitle}>Lista de Módulos</Typograph>
                        <Styled.ModuleSelectButton onClick={() => setShowNewModuleSelectBar(!showNewModuleSelectBar)}>+</Styled.ModuleSelectButton>
                        {showNewModuleSelectBar && 
                            <Styled.ModuleSelectBar>
                                <Card
                                    style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",boxShadow:"0px"}}
                                    width="100%" height="100%" 
                                    borderColor={theme.pallete.cyanGreen.dark}
                                    borderWidth={"1"}
                                    backgroundColor={theme.pallete.assistant.white}>
                                        <Styled.ModuleSelect onClick={() => handleAddModule("CLASS|Video")}>
                                            <img alt="" style={{width: "70%"}} src={`/img/modules/videoYouTube.svg`}></img>
                                            <Typograph style={{fontSize: "12px", textAlign: "center"}} type={ETypographType.ButtonTitle}>Vídeo</Typograph>
                                        </Styled.ModuleSelect>
                                        <Styled.ModuleSelect onClick={() => handleAddModule("CLASS|Text")}>
                                            <img alt="" style={{width: "70%"}} src={`/img/modules/textTinyMCE.svg`}></img>
                                            <Typograph style={{fontSize: "12px", textAlign: "center"}} type={ETypographType.ButtonTitle}>Texto</Typograph>
                                        </Styled.ModuleSelect>
                                        <Styled.ModuleSelect onClick={() => handleAddModule("TEST|True or False")}>
                                            <img alt="" style={{width: "60%"}} src={`/img/modules/testTrueOrDare.svg`}></img>
                                            <Typograph style={{fontSize: "12px", textAlign: "center"}} type={ETypographType.ButtonTitle}>Verdadeiro ou Falso</Typograph>
                                        </Styled.ModuleSelect>
                                        <Styled.ModuleSelect onClick={() => handleAddModule("TEST|Alternative")}>
                                            <img alt="" style={{width: "70%"}} src={`/img/modules/testAlternativeQuestion.svg`}></img>
                                            <Typograph style={{fontSize: "12px", textAlign: "center"}} type={ETypographType.ButtonTitle}>Alternativa</Typograph>
                                        </Styled.ModuleSelect>
                                </Card>
                            </Styled.ModuleSelectBar>
                        }
                </Card>
            <Styled.ModuleList>
                {props.moduleOperationList.filter((m) => m.operation !== EOperation.Delete)
                    .map((module) => {
                    let type = "text";
                    if(module.module.module?.moduleType === "TEST|Alternative") type = "test";
                    if(module.module.module?.moduleType === "TEST|True or False") type = "true";
                    if(module.module.module?.moduleType === "CLASS|Text") type = "text";
                    if(module.module.module?.moduleType === "CLASS|Video") type = "video"
                    return(<>
                        <Styled.Module onClick={() => props.selectModule(module)}>
                            <img alt="" style={{width: "10%"}} src={`/img/modules/${type}.svg`}></img>
                            <Typograph style={{paddingLeft: "3%"}} type={ETypographType.AuxiliarText}>{module.module.module?.title}</Typograph>    
                        </Styled.Module>
                        <DivLine size={"100%"} color={theme.pallete.assistant.blueIce}></DivLine>
                    </>)
                })}
            </Styled.ModuleList>
        </Card>
    )
}