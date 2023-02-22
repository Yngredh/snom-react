import { useState } from "react";
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
import { ListedUsers } from "../../mock/UserMock";

export const TrainingManagement = () => {

    const [selectedListName, setSelectedListName] = useState("Aprendizes");
    const defineBackgroundColor = (listName : string) => selectedListName === listName ? 
        "rgba(138, 154, 233, 0.7)" : theme.pallete.assistant.blueIce

    const defineBorderBottom = (listName : string) => selectedListName === listName ? 
        "none" : "3px solid " + theme.pallete.blueViolet.dark;

    const [selectedList, setSelectedList] = useState();

    const onTrainingNameChange = () => {}


    return(
        <Background
            style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}
            type={EBackground.SimpleBackgroundFrame}>
            
            <TopSideContainer>
                <Typograph type={ETypographType.PageTitle}>Gerenciar Treinamento</Typograph>
                <ButtonContainer>
                    <Button type={EButton.SecondaryButton} width={"14%"} style={{padding: "1rem 1rem"}}>SALVAR</Button>
                    <Button type={EButton.SecondaryButton} width={"14%"} style={{padding: "1rem 1rem", marginLeft: "5%"}}>VOLTAR</Button>
                    <Button type={EButton.MainButtonVariation} width={"20%"} style={{padding: "0.5rem 1rem", marginLeft: "5%"}}>GERENCIAR MÓDULOS</Button>
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
                            style={{marginBottom: '8%'}} hint=""
                                isPassword={false} width="80%"
                                borderColor={theme.pallete.blueViolet.dark}
                                onChange={e => onTrainingNameChange()}/>

                        <Typograph style={{color:"#000000"}} type={ETypographType.MediumText}>Descrição</Typograph>
                        <Input
                            style={{marginBottom: '8%', height: "20%"}}
                            hint="Escreva uma breve descrição sobre o conteúdo desse treinamento"
                            isPassword={false} width="100%"
                            borderColor={theme.pallete.blueViolet.dark}
                            onChange={e => onTrainingNameChange()}/>
                            
                        <Typograph style={{color:"#000000"}} type={ETypographType.MediumText}>Status do Treinamento</Typograph>
                        <SelectInput>
                            <option value="2">Disponível</option>
                            <option value="1">Manutenção</option>
                            <option value="3">Inativo</option>
                        </SelectInput>

                        <Typograph style={{color:"#000000"}} type={ETypographType.MediumText}>Nível do treinamento</Typograph>
                        <SelectInput>
                            <option value="1">Nível 1</option>
                            <option value="2">Nível 2</option>
                            <option value="3">Nível 3</option>
                            <option value="4">Nível 4</option>
                            <option value="5">Nível 5</option>
                        </SelectInput>
                    </Form>
                </Card>

                <UsersManagerContainer>
                    <PartitionContainer>
                        <Card
                            onClick={() => setSelectedListName("Aprendizes")}
                            style={{display: "flex", justifyContent: "center", alignItems: "center", 
                                cursor: "pointer", borderBottom: defineBorderBottom("Aprendizes"), 
                                borderBottomLeftRadius: "0", borderBottomRightRadius: "0", boxShadow: "none"}}
                            hoverStyle={{backgroundColor: "rgba(138, 154, 233, 0.7)"}}
                            width="50%" height="100%" 
                            borderColor={theme.pallete.blueViolet.dark}
                            borderWidth={"1"}
                            backgroundColor={defineBackgroundColor("Aprendizes")}>
                            <Typograph type={ETypographType.AuxiliarTitle}>Aprendizes</Typograph>
                        </Card>
                        <Card
                            onClick={() => setSelectedListName("Coordenadores")}
                            style={{display: "flex", justifyContent: "center", alignItems: "center", 
                                cursor: "pointer", borderBottom: defineBorderBottom("Coordenadores"), 
                                borderBottomLeftRadius: "0", borderBottomRightRadius: "0", boxShadow: "none"}}
                            hoverStyle={{backgroundColor: "rgba(138, 154, 233, 0.7)"}}
                            width="50%" height="100%" 
                            borderColor={theme.pallete.blueViolet.dark}
                            borderWidth={"1"}
                            backgroundColor={defineBackgroundColor("Coordenadores")}>
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
                        <List users={ListedUsers} filterValue={""} setUserSelected={(user) => console.log(user)}/>
                    </Card>
                </UsersManagerContainer>
            </CardContainer>

        </Background>
    )
}