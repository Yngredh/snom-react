import { useContext } from "react";
import { Background, EBackground } from "../../components/Background";
import { Button, EButton } from "../../components/Button";
import { Card } from "../../components/Card";
import { DivLine } from "../../components/DivLine";
import { Input } from "../../components/Input";
import { Typograph, ETypographType } from "../../components/Typograph";
import { theme } from "../../themes/theme";
import * as Styled from './styles'

export const ChangePassword = () => {

    const fun = () => {
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
                        isPassword={false} width="100%" borderColor={theme.pallete.blueViolet.dark}
                        onChange={fun}/>
                    
                    <Typograph type={ETypographType.MenuText}>Digite a nova senha</Typograph>
                    <Input 
                        style={{marginBottom: '8%', marginTop: '2%'}} hint={"Nova senha"}
                        isPassword={false} width="100%" borderColor={theme.pallete.blueViolet.dark}
                        onChange={fun}/>
                    
                    <Typograph type={ETypographType.MenuText}>Confirme a nova senha</Typograph>
                    <Input 
                        style={{marginBottom: '8%', marginTop: '2%'}} hint={"Confirmar senha"}
                        isPassword={false} width="100%" borderColor={theme.pallete.blueViolet.dark}
                        onChange={fun}/>
                </Styled.Form>
                <Button type={EButton.SecondaryButton}>SALVAR</Button>
                
            </Card>
        </Background>
    )
}