import { TitleAuxiliar, TextAuxiliar } from "./styles";
import { theme } from "../../themes/theme";
import { Card } from "../Card";
import { Input } from "../Input";
import { Button, EButton } from "../Button";
import { ETypographType, Typograph } from "../Typograph";
import { IUser } from "../../interfaces/IUser";
import { useState } from "react";

interface ILoginCardProps {
  authenticateUser: (loginUser: Partial<IUser>) => void
}

export const LoginCard = (props: ILoginCardProps) => {

  const [showError, setShowError] = useState({
    email : false,
    password: false,
  });
  const [loginForm, setEditForm] = useState({
    email: '',
    password: '',
  });


  const handleEmailInput = (email: string) => {
    if(email.includes('@')){
      setEditForm({
        ...loginForm,
        email: email,
      });

      setShowError({
        ...showError,
        email: false
      });
    }else{
      setShowError({
        ...showError,
        email: true
      });
    }
  };

  const handlePasswordInput = (password: string) => {
    if(password){
      setEditForm({
        ...loginForm,
        password: password,
      });
      setShowError({
        ...showError,
        password: false
      });
    }else{
      setShowError({
        ...showError,
        password: true
      });
    }
  };

  const handleAuthenticateUser = async () => {
    if(showError.email || showError.password) return;

    props.authenticateUser({ email: loginForm.email, password: loginForm.password});
  }

  return (
    <>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2%",
            }}
            width="480px"
            height="500px"
            borderColor={theme.pallete.blueViolet.dark}
            borderWidth="3px"
            backgroundColor="linear-gradient(180deg, #DBE5FB 0%, #9FBAF3 100%)"
          >
            <TitleAuxiliar>
              <Typograph
                style={{ textAlign: "start" , marginTop: "5%"}}
                type={ETypographType.ConstrastVioletText}
              >
                ENTRAR
              </Typograph>
            </TitleAuxiliar>

            <TextAuxiliar>
              <Typograph 
                style={{ textAlign: "start", marginTop: "5%"}}
                type={ETypographType.AuxiliarText}>
                Faça seu login e bora treinar!
              </Typograph>
            </TextAuxiliar>

            <Input
            style={{marginBottom: '8%'}}
              hint="Email"
              isPassword={false}
              width="80%"
              borderColor={theme.pallete.blueViolet.dark}
              onChange={e => handleEmailInput(e.value)}
            ></Input>
            <Input
              style={{marginBottom: '5%'}}
              hint="Senha"
              isPassword={true}
              width="80%"
              borderColor={theme.pallete.blueViolet.dark}
              onChange={e => handlePasswordInput(e.value)}
            ></Input>
            
            {showError.email || showError.password ? (
            <Typograph type={ETypographType.AuxiliarText} style= {{ color: theme.pallete.status.borderRed}}>
              Por favor, preencha suas informações corretamente!
            </Typograph>): <></>}

            <Button
              style={{ marginTop: "6%" }}
              onClick={handleAuthenticateUser}
              width="50%"
              type={EButton.MainButton}
            >
              ENTRAR
            </Button>
          </Card>
    </>
  );
};
