import { TitleAuxiliar, TextAuxiliar, PopUpDiv } from "./styles";
import { theme } from "../../themes/theme";
import { Card } from "../Card";
import { Input } from "../Input";
import { Button, EButton } from "../Button";
import { ETypographType, Typograph } from "../Typograph";
import { User } from "../../interfaces/User";
import { useState } from "react";

interface ILoginCardProps {
  onFinishCreate: (newUser: Partial<User>) => void,
  onClose: () => void
}

export const LoginCard = (props: ILoginCardProps) => {

  const [showError, setShowError] = useState({
    name: false,
    email : false,
    password: false,
  });
  const [createForm, setEditForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleCreateUser = () => {
    if(createForm.email !== '' && createForm.password !== '' && createForm.name !== ''){
      const user :Partial<User> = {
        email : createForm.email,
        password : createForm.password,
        name: createForm.name
      };

      props.onFinishCreate(user);
    }
  }

  const handleNameInput = (name :string) => {
    if(name !== ''){
      setEditForm({
        ...createForm,
        name: name,
      });
      setShowError({
        ...showError,
        name: false
      });
    }else{
      setShowError({
        ...showError,
        name: true
      });
    }
  };

  const handleEmailInput = (email: string) => {
    if(email.includes('@')){
      setEditForm({
        ...createForm,
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
    if(password.length >= 8){
      setEditForm({
        ...createForm,
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
            
            {showError.email || showError.password || showError.name ? (
            <Typograph type={ETypographType.AuxiliarText} style= {{ color: theme.pallete.status.borderRed}}>
              Por favor, preencha o formulário corretamente!
            </Typograph>): <></>}

            <Button
              style={{ marginTop: "6%" }}
              onClick={handleCreateUser}
              width="50%"
              type={EButton.MainButton}
            >
              ENTRAR
            </Button>
          </Card>
    </>
  );
};
