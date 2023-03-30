import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Background, EBackground } from "../../components/Background";
import { Button, EButton } from "../../components/Button";
import { Card } from "../../components/Card";
import { DivLine } from "../../components/DivLine";
import { Input } from "../../components/Input";
import { Typograph, ETypographType } from "../../components/Typograph";
import { IUser } from "../../interfaces/IUser";
import { UserService } from "../../services/UserService";
import { theme } from "../../themes/theme";
import * as Styled from './styles'

export const ChangePassword = () => {
    
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordForm, setPasswordForm] = useState({
        password: "",
        newPassword: "",
        newPasswordConfirmation: ""
    });

    const handleSaveNewPassword = async () => {
        if(passwordForm.newPassword != "" && passwordForm.newPasswordConfirmation != "" && 
            passwordForm.newPassword === passwordForm.newPasswordConfirmation){

            if(passwordForm.password === userContext.user?.password) {
                const userResponse = await UserService.editUser(
                    [{...userContext.user!!, password: passwordForm.newPassword}], 
                    userContext.token);
                if(userResponse === 200){
                    localStorage.clear();
                    navigate(0);
                }
            } else {setErrorMessage("Senha atual incorreta!")}
            
        } else {setErrorMessage("Nova senha inválida!")}

    }
    
    
    return(
        <Background
            style={{display: "flex", flexDirection:"column", alignItems:"center"}}
            type={EBackground.SimpleBackgroundFrame}>
                <Styled.Header>
                    <Typograph type={ETypographType.PageTitle}>Alterar Senha</Typograph>
                    <DivLine size="100%" color="#000000"/>
                </Styled.Header> 
    
            <Card
                style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "4%", padding: "2%"}}
                width="30%" height="60%" 
                borderColor={theme.pallete.blueViolet.dark}
                borderWidth={"1"}
                backgroundColor={theme.pallete.cyanGreen.light}>
                
                <Typograph type={ETypographType.AuxiliarTitle}>Preencha o formulário</Typograph>
                <DivLine size="60%" color="#000000"/>
                <Styled.Form>
                    <Typograph type={ETypographType.MenuText}>Digite a senha atual</Typograph>
                    <Input 
                        style={{marginBottom: '8%', marginTop: '2%'}} hint={"Senha atual"}
                        isPassword={true} width="100%" borderColor={theme.pallete.blueViolet.dark}
                        onChange={e => setPasswordForm({
                            ...passwordForm,
                            password: e.value
                        })}/>
                    
                    <Typograph type={ETypographType.MenuText}>Digite a nova senha</Typograph>
                    <Input 
                        style={{marginBottom: '8%', marginTop: '2%'}} hint={"Nova senha"}
                        isPassword={true} width="100%" borderColor={theme.pallete.blueViolet.dark}
                        onChange={e => setPasswordForm({
                            ...passwordForm,
                            newPassword: e.value
                        })}/>
                    
                    <Typograph type={ETypographType.MenuText}>Confirme a nova senha</Typograph>
                    <Input 
                        style={{ marginTop: '2%'}} hint={"Confirmar senha"}
                        isPassword={true} width="100%" borderColor={theme.pallete.blueViolet.dark}
                        onChange={e => setPasswordForm({
                            ...passwordForm,
                            newPasswordConfirmation: e.value
                        })}/>
                </Styled.Form>
                <Typograph 
                    style={{color: "#EF3B3B", marginBottom: "6%", marginTop: "4%"}}
                    type={ETypographType.AuxiliarText}>{errorMessage}</Typograph>
                <Button type={EButton.SecondaryButton} onClick={handleSaveNewPassword}>SALVAR</Button>
                
            </Card>
        </Background>
    )
}