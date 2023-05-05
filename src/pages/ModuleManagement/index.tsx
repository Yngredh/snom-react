import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TrainingProgressContext, UserContext } from "../../App";
import { Background, EBackground } from "../../components/Background";
import { Button, EButton } from "../../components/Button";
import { Card } from "../../components/Card";
import { DivLine } from "../../components/DivLine";
import { ETypographType, Typograph } from "../../components/Typograph";
import { EPopUpType, PopUp } from "../../components/PopUp";
import { IModule } from "../../interfaces/IModule";
import { ITraining } from "../../interfaces/ITraining";
import { TrainingService } from "../../services/TrainingService";
import { theme } from "../../themes/theme";
import * as Styled from "./styles"
import { Input } from "../../components/Input";
import { IModuleOperations, EOperation } from "../../interfaces/IModuleOperations";
import { IModuleTest } from "../../interfaces/IModuleTest";
import { IModuleClass } from "../../interfaces/IModuleClass";
import { ModuleService } from "../../services/ModuleService";
import { BundleEditor } from "../../components/BundleEditor";
import { MultipleQuestionTest } from "../../components/MultipleQuestionTest";

export const ModuleManagement = () => {
    
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const { trainingId } = useParams();
    const [moduleList, setModuleList] = useState<IModuleOperations[]>([]);
    const [training, setTraining] = useState<ITraining>();
    const [selectedModule, setSelectedModule] = useState<Partial<IModuleClass> | Partial<IModuleTest>>();
    const [showConfirmPopUp, setShowConfirmPopUp] = useState(false);
    const [showModuleSelectBar, setShowModuleSelectBar] = useState(false);

    const goToTrainingManagement = () => {
        navigate(`/trainingManagement/${training?.trainingId}`);
    }

    const goToWorkshop = () => {
        navigate(`/workshop`);
    }

    const alterTitle = (e: HTMLInputElement) => { 
        
        const newModuleList = moduleList.map(module => {
            if(module.module.module?.moduleId === selectedModule?.module?.moduleId) {
                module.module.module!!.title = e.value;
                setSelectedModule(module.module);
            }
            return module;
        })

        setModuleList(newModuleList);
    }

    const handleModuleType = () => {
        if(selectedModule?.module?.moduleType === "TEST|Alternative") return "test"
        if(selectedModule?.module?.moduleType === "TEST|True or False") return "true"
        if(selectedModule?.module?.moduleType === "CLASS|Text") return "text"
        if(selectedModule?.module?.moduleType === "CLASS|Video") return "video"
    }

    const handleSaveChanges = async () => {

        const classModulesToCreate: Partial<IModuleClass>[] = [];
        const classModulesToUpdate: Partial<IModuleClass>[] = [];
        const classModulesToDelete: Partial<{moduleId: string, moduleType: string}>[] = [];
        const testModulesToCreate: Partial<IModuleTest>[] = [];
        const testModulesToUpdate: Partial<IModuleTest>[] = [];
        const testModulesToDelete: Partial<{moduleId: string, moduleType: string}>[] = [];
 
        moduleList.forEach((moduleOperation) => {

            if (moduleOperation.module.module?.moduleType.includes("CLASS")){
                if (moduleOperation.operation === EOperation.Create) 
                        classModulesToCreate.push(moduleOperation.module as IModuleClass)
                if (moduleOperation.operation === EOperation.Update) 
                        classModulesToUpdate.push(moduleOperation.module as IModuleClass)
                if (moduleOperation.operation === EOperation.Delete) 
                        classModulesToDelete.push({
                            moduleId: moduleOperation.module.module?.moduleId, 
                            moduleType: moduleOperation.module.module?.moduleType})
            } else {
                if (moduleOperation.operation === EOperation.Create) 
                        testModulesToCreate.push(moduleOperation.module as IModuleTest)
                if (moduleOperation.operation === EOperation.Update) 
                        testModulesToUpdate.push(moduleOperation.module as IModuleTest)
                if (moduleOperation.operation === EOperation.Delete) 
                        testModulesToDelete.push({
                            moduleId: moduleOperation.module.module?.moduleId, 
                            moduleType: moduleOperation.module.module?.moduleType})
            }
        })

        await ModuleService.createClassModule(userContext.token, classModulesToCreate);
        await ModuleService.updateClassModule(userContext.token, classModulesToUpdate);
        await ModuleService.deleteClassModule(userContext.token, classModulesToDelete);

        await ModuleService.createTestModule(userContext.token, testModulesToCreate);
        await ModuleService.updateClassModule(userContext.token, testModulesToUpdate);
        await ModuleService.deleteTestModule(userContext.token, testModulesToDelete);

    }
 

    const handleAddModule = (moduleType : String) => {

        if(moduleType === "VIDEO") {
            let newModule: Partial<IModuleClass> = {
                module: {
                    moduleId: `TEMPORARY-ID-${moduleList.length}`,
                    trainingId: training?.trainingId!,
                    moduleType: "CLASS|Video",
                    title: "Novo Módulo de Aula em Vídeo",
                    position: moduleList.length + 1
                }
            }
            moduleList.push({
                module: newModule,
                operation: 1
            })
            setSelectedModule(newModule)
        } else if (moduleType === "TEXT") {
            let newModule: Partial<IModuleClass> = {
                module: {
                    moduleId: `TEMPORARY-ID-${moduleList.length}`,
                    trainingId: training?.trainingId!,
                    moduleType: "CLASS|Text",
                    title: "Novo Módulo de Aula em Texto",
                    position: moduleList.length + 1
                }
            }
            moduleList.push({
                module: newModule,
                operation: 1
            })
            setSelectedModule(newModule)
        } else if (moduleType === "ALTERNATIVE") {
            let newModule: Partial<IModuleTest> = {
                module: {
                    moduleId: `TEMPORARY-ID-${moduleList.length}`,
                    trainingId: training?.trainingId!,
                    moduleType: "TEST|Alternative",
                    title: "Novo Módulo de Teste de Alternativa",
                    position: moduleList.length + 1
                }
            }
            moduleList.push({
                module: newModule,
                operation: 1
            })
            setSelectedModule(newModule)
        } else {
            let newModule: Partial<IModuleTest> = {
                module: {
                    moduleId: `TEMPORARY-ID-${moduleList.length}`,
                    trainingId: training?.trainingId!,
                    moduleType: "TEST|True or False",
                    title: "Novo Módulo de Teste Verdadeiro ou Falso",
                    position: moduleList.length + 1
                }
            }
            moduleList.push({
                module: newModule,
                operation: 1
            })
            setSelectedModule(newModule)
        }
    }

    const handleDeleteModule = () => {
        // Mudar o módulo selecionado
        // Adicionar o módulo excluído na lista de moduleOperation com DELETE
        // :c
    }

    const generateModuleList = (module : IModule[]) => {

        const temporaryModuleList: IModuleOperations[] = []
        
        module.forEach((m) => {
            if(m.moduleType.includes("TEST")) {
                let testModule: Partial<IModuleTest> = {
                    module: m
                }
                temporaryModuleList.push({
                    module: testModule,
                    operation: 0
                })

            } else {
                let classModule: Partial<IModuleClass> = {
                    module: m
                }
                temporaryModuleList.push({
                    module: classModule,
                    operation: 0
                })
            }
        })
        setModuleList(temporaryModuleList);
    }

    useEffect(() => {
        const getTraining = async () => {
            if(trainingId) {
                const trainingResponse = await TrainingService.getTrainingByTrainingId(userContext.token, trainingId);
                setTraining(trainingResponse[0]);
                generateModuleList(trainingResponse[0].modules);
            }
        }
        getTraining();
    }, [userContext.token, trainingId]);

    useEffect(() => {
        if(moduleList.length !== 0) {
            setSelectedModule(moduleList[0].module)
        }
    }, [training]);

    return(
        <Background style={{display:"flex", flexDirection: "column", alignItems: "center"}}
                    type={EBackground.SimpleBackgroundFrame}>
            {showConfirmPopUp && <PopUp 
                type={EPopUpType.WarnSaveConfirmation}
                onConfirm={handleSaveChanges} onClose={() => setShowConfirmPopUp(false)}/>
            }
            <Styled.TopSideContainer>
                <Typograph type={ETypographType.PageTitle}>Gerenciar Módulos</Typograph>
                <Styled.ButtonContainer>
                    <Button
                        onClick={() => setShowConfirmPopUp(true)}
                        type={EButton.SecondaryButton}>SALVAR</Button>
                    <Button type={EButton.SecondaryButton} onClick={goToWorkshop}>VOLTAR</Button>
                    <Button type={EButton.MainButtonVariation}
                            icon={"/img/icons/arrowForward.svg"}
                            onClick={goToTrainingManagement}>GERENCIAR TREINAMENTO</Button>
                </Styled.ButtonContainer>
            </Styled.TopSideContainer>

            <Styled.Content>
                <Card
                    style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "1%"}}
                    width="79%" height="100%" 
                    borderColor={theme.pallete.blueViolet.dark}
                    borderWidth={"1"}
                    backgroundColor={theme.pallete.cyanGreen.light}>
                        <Styled.TopSideContainer>
                            <Styled.ModuleTitle>
                                <img style={{width: "8%", marginRight: "2%"}} src={`/img/modules/${handleModuleType()}.svg`}></img>
                                <Input hint="Título do Módulo" isPassword={false} defaultValue={selectedModule?.module?.title} 
                                        onChange={alterTitle} width="60%" borderColor={theme.pallete.blueViolet.dark}/>
                            </Styled.ModuleTitle>
                            <Button type={EButton.DeleteButton} onClick={() => handleDeleteModule}>EXCLUIR</Button>
                        </Styled.TopSideContainer>
                        <DivLine size={"90%"} color={theme.pallete.blueViolet.dark}></DivLine>
                        {selectedModule?.module?.moduleType === "CLASS|Text" && <BundleEditor/>}
                        {selectedModule?.module?.moduleType === "CLASS|Video" && 
                            <>
                                <Typograph style={{fontSize: "20px", textAlign: "center"}} type={ETypographType.ButtonTitle}>Link do Vídeo</Typograph>
                                <Input hint="Insira a url do vídeo" isPassword={false} defaultValue={selectedModule?.module?.title} 
                                    onChange={alterTitle} width="60%" borderColor={theme.pallete.blueViolet.dark}/>
                            </>}

                        {selectedModule?.module?.moduleType === "TEST|True or False" &&
                            <MultipleQuestionTest type={1}></MultipleQuestionTest> 
                        }
                        {selectedModule?.module?.moduleType === "TEST|Alternative" &&
                            <MultipleQuestionTest type={2}></MultipleQuestionTest>
                        }

                </Card>

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
                                <Styled.ModuleSelectButton onClick={() => setShowModuleSelectBar(!showModuleSelectBar)}>+</Styled.ModuleSelectButton>
                                {showModuleSelectBar && 
                                    <Styled.ModuleSelectBar>
                                        <Card
                                            style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",boxShadow:"0px"}}
                                            width="100%" height="100%" 
                                            borderColor={theme.pallete.cyanGreen.dark}
                                            borderWidth={"1"}
                                            backgroundColor={theme.pallete.assistant.white}>
                                                <Styled.ModuleSelect onClick={() => handleAddModule("VIDEO")}>
                                                    <img style={{width: "70%"}} src={`/img/modules/videoYouTube.svg`}></img>
                                                    <Typograph style={{fontSize: "12px", textAlign: "center"}} type={ETypographType.ButtonTitle}>Vídeo</Typograph>
                                                </Styled.ModuleSelect>
                                                <Styled.ModuleSelect onClick={() => handleAddModule("TEXT")}>
                                                    <img style={{width: "70%"}} src={`/img/modules/textTinyMCE.svg`}></img>
                                                    <Typograph style={{fontSize: "12px", textAlign: "center"}} type={ETypographType.ButtonTitle}>Texto</Typograph>
                                                </Styled.ModuleSelect>
                                                <Styled.ModuleSelect onClick={() => handleAddModule("TRUE")}>
                                                    <img style={{width: "60%"}} src={`/img/modules/testTrueOrDare.svg`}></img>
                                                    <Typograph style={{fontSize: "12px", textAlign: "center"}} type={ETypographType.ButtonTitle}>Verdadeiro ou Falso</Typograph>
                                                </Styled.ModuleSelect>
                                                <Styled.ModuleSelect onClick={() => handleAddModule("ALTERNATIVE")}>
                                                    <img style={{width: "70%"}} src={`/img/modules/testAlternativeQuestion.svg`}></img>
                                                    <Typograph style={{fontSize: "12px", textAlign: "center"}} type={ETypographType.ButtonTitle}>Alternativa</Typograph>
                                                </Styled.ModuleSelect>
                                        </Card>
                                    </Styled.ModuleSelectBar>
                                }
                        </Card>
                    <Styled.ModuleList>
                        {moduleList.map((module) => {
                            let type = "text";
                            if(module.module.module?.moduleType === "TEST|Alternative") type = "test";
                            if(module.module.module?.moduleType === "TEST|True or False") type = "true";
                            if(module.module.module?.moduleType === "CLASS|Text") type = "text";
                            if(module.module.module?.moduleType === "CLASS|Video") type = "video"
                            return(<>
                                <Styled.Module onClick={() => setSelectedModule(module.module)}>
                                    <img style={{width: "10%"}} src={`/img/modules/${type}.svg`}></img>
                                    <Typograph style={{paddingLeft: "3%"}} type={ETypographType.AuxiliarText}>{module.module.module?.title}</Typograph>    
                                </Styled.Module>
                                <DivLine size={"100%"} color={theme.pallete.assistant.blueIce}></DivLine>
                            </>)
                        })}
                    </Styled.ModuleList>

                </Card>
            </Styled.Content>
                
        </Background>
    )
}