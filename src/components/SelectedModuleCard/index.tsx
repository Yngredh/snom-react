import * as Styled from "./styles"
import { IModuleOperations, EOperation } from "../../interfaces/IModuleOperations";
import { Card } from "../Card"
import { DivLine } from "../DivLine"
import { Input } from "../Input"
import { MultipleQuestionTest } from "../MultipleQuestionTest"
import { ETypographType, Typograph } from "../Typograph"
import { Button, EButton } from "../Button"
import { theme } from "../../themes/theme"
import { BundleEditor } from "../BundleEditor";
import { IModuleClass } from "../../interfaces/IModuleClass";

export interface SelectedModuleCardProps {
    selectedModuleOperation: IModuleOperations,
    handleUpdatedModule: (updatedModule: IModuleOperations) => void;
    handleDeleteModule: (deletedModule: IModuleOperations) => void;
} 

export const SelectedModuleCard = (props :SelectedModuleCardProps) => {
    
    const coreModule = props.selectedModuleOperation?.module?.module;

    const handleTitleUpdate = (e: HTMLInputElement) => {
        let newModule = props.selectedModuleOperation;
        newModule.operation = EOperation.Update;
        newModule.module.module!!.title = e.value;
        props.handleUpdatedModule(newModule);
    };

    const handleContentUpdate = (e: HTMLInputElement) => {
        let newModule = props.selectedModuleOperation;
        let classNewModule: Partial<IModuleClass> = newModule.module;

        classNewModule.content = e.value;
        newModule.operation = EOperation.Update;
        newModule.module = classNewModule;
        props.handleUpdatedModule(newModule);
    };

    const handleContentDefaultValue = () => {
        let module = props.selectedModuleOperation;
        let classModule: Partial<IModuleClass> = module.module;
        return classModule.content as string;
    }

    const handleModuleType = () => {
        if(coreModule?.moduleType === "TEST|Alternative") return "test"
        if(coreModule?.moduleType === "TEST|True or False") return "true"
        if(coreModule?.moduleType === "CLASS|Text") return "text"
        return "video"
    }

    const handleDeleteModule = () => {
        props.handleDeleteModule(props.selectedModuleOperation);    
    }

    return(
        <Card
            style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "1%"}}
            width="79%" height="100%" 
            borderColor={theme.pallete.blueViolet.dark}
            borderWidth={"1"}
            backgroundColor={theme.pallete.cyanGreen.light}>
                <Styled.TopSideContainer>
                <Styled.ModuleTitle>
                    <img style={{width: "8%", marginRight: "2%"}} src={`/img/modules/${handleModuleType()}.svg`}></img>
                    <Input hint="Título do Módulo" isPassword={false} defaultValue={coreModule?.title} 
                        onChange={handleTitleUpdate} width="60%" borderColor={theme.pallete.blueViolet.dark}/>
                </Styled.ModuleTitle>
                <Button type={EButton.DeleteButton} onClick={handleDeleteModule}>EXCLUIR</Button>
            </Styled.TopSideContainer>
            <DivLine size={"90%"} color={theme.pallete.blueViolet.dark}></DivLine>
            {props.selectedModuleOperation?.module?.module?.moduleType === "CLASS|Text" && <BundleEditor initialValue={handleContentDefaultValue()} />}
            {props.selectedModuleOperation?.module?.module?.moduleType === "CLASS|Video" && 
                <>
                    <Typograph style={{fontSize: "20px", textAlign: "center", marginTop: '3%'}} type={ETypographType.ButtonTitle}>Link do Vídeo</Typograph>
                    <Input hint="Insira a url do vídeo" isPassword={false} defaultValue={handleContentDefaultValue()} 
                        onChange={handleContentUpdate} width="60%" borderColor={theme.pallete.blueViolet.dark}
                        style={{marginTop: '1%'}}/>
                </>}

            {coreModule?.moduleType === "TEST|True or False" &&
                <MultipleQuestionTest isOnEditPage={true} moduleId={coreModule.moduleId} type={1}></MultipleQuestionTest> 
            }
            {coreModule?.moduleType === "TEST|Alternative" &&
                <MultipleQuestionTest isOnEditPage={true} moduleId={coreModule.moduleId} type={2}></MultipleQuestionTest>
            }
        </Card>
    )
}