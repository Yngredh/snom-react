import { useState } from "react";
import { Button, EButton } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { DivLine } from "../../../../components/DivLine";
import { Input } from "../../../../components/Input";
import { ETypograghType, Typograph } from "../../../../components/Typograph";
import { defaultPermission } from "../../../../interfaces/Permission";
import { theme } from "../../../../themes/theme";
import { DisplayFlex, FormContainer, InputFieldContainer } from "./styles";

interface IEditForm {
  newEmail: string,
  newPassword: string,
  confirmPassword: string,
  selectedPermission: number,
}
interface IEditUserProps {
  onFinish : () => void
}

export const UserEditCard = (props: IEditUserProps) => {
  const [showError, setShowError] = useState({
    email : false,
    password: false,
    confirmPassword: false
  });
  const [editForm, setEditForm] = useState<IEditForm>({
    newEmail: '',
    newPassword: '',
    confirmPassword: '',
    selectedPermission: defaultPermission[2].id
  });

  const handleSelect = (selectedOption: string) => {
    var newValue = 0;
    if(selectedOption === 'partial') {
      newValue = editForm.selectedPermission === defaultPermission[1].id ?  
      defaultPermission[2].id 
      : defaultPermission[1].id;
      setEditForm({
        ...editForm,
        selectedPermission: newValue
      });
    } else if(selectedOption === 'total'){
      newValue = editForm.selectedPermission === defaultPermission[0].id ?  
        defaultPermission[2].id 
        : defaultPermission[0].id;

      setEditForm({
        ...editForm,
        selectedPermission: newValue
      });
    }
  };

  const handleEmaiInput = (email: string) => {
    if(email.includes('@')){
      setEditForm({
        ...editForm,
        newEmail: email,
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
        ...editForm,
        newPassword: password,
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
  const handleConfirmPasswordInput = (confirmPassword :string) => {
    if(confirmPassword === editForm.newPassword){
      setEditForm({
        ...editForm,
        confirmPassword: confirmPassword,
      });
      setShowError({
        ...showError,
        confirmPassword: false
      });
    }else{
      setShowError({
        ...showError,
        confirmPassword: true
      });
    }
  }

  return (
    <>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
        width="94%"
        height="50%"
        borderColor={theme.pallete.blue.second}
        borderWidth="5px"
      >
        <Typograph style={{ marginTop: "3%" }} type={ETypograghType.MainTitle}>
          EDITAR USUÁRIO
        </Typograph>
        <DivLine size="100%" color={theme.pallete.assistant.black} />
        <FormContainer>
          <InputFieldContainer>
            <Typograph
              style={{ marginTop: "3%" }}
              type={ETypograghType.AuxiliarTitle}
            >
              INFORMAÇÕES DO USUÁRIO
            </Typograph>
            <Input
              style={
                showError.email ? 
                {
                  borderColor: theme.pallete.status.borderRed,
                  marginTop: "5%",
                  marginBottom: "3%",
                } : 
                {
                  marginTop: "5%",
                  marginBottom: "3%",
                }
              }
              hint="novo email"
              width="90%"
              isPassword={false}
              onChange={(e) => handleEmaiInput(e.value)}
            />
            <Input
              style={
                showError.password ?
                {
                  borderColor: theme.pallete.status.borderRed,
                  marginBottom: "3%",
                }:
                {
                  marginBottom: "3%",
                }
              }
              hint="nova senha"
              width="90%"
              isPassword={true}
              onChange={(e) => handlePasswordInput(e.value)}
            />
            <Input
              style={
                showError.confirmPassword ? 
                {
                  marginBottom: "2%",
                  borderColor: theme.pallete.status.borderRed,
                }: {
                  marginBottom: "2%",
                }
              }
              hint="confirmar senha"
              width="90%"
              isPassword={true}
              onChange={(e) => handleConfirmPasswordInput(e.value)}
            />
            {showError.email || showError.password || showError.confirmPassword ? (
            <Typograph type={ETypograghType.AuxiliarText} style= {{ color: theme.pallete.status.borderRed}}>
              Por favor, preencha o formulário corretamente!
            </Typograph>): <></>}
          </InputFieldContainer>
          <InputFieldContainer>
            <Typograph
              style={{ marginTop: "3%", marginBottom: "5%" }}
              type={ETypograghType.AuxiliarTitle}
            >
              PERMISSÕES
            </Typograph>
            <DisplayFlex>
              <input 
                checked={editForm.selectedPermission === defaultPermission[0].id} 
                onClick={(e) => handleSelect(e.currentTarget.name)} 
                type="radio"
                name="total" />
              <Typograph type={ETypograghType.AuxiliarTitle}>
                Gerenciamento total de treinamentos
              </Typograph>
            </DisplayFlex>
            <Typograph
              style={{ marginLeft: "7%", marginTop: "1%", marginBottom: "2%" }}
              type={ETypograghType.AuxiliarText}
            >
              Permissão de criação e edição de todos os treinamentos ativos.
            </Typograph>
            <DisplayFlex>
              <input
                checked={editForm.selectedPermission === defaultPermission[1].id} 
                onClick={(e) => handleSelect(e.currentTarget.name)} 
                type="radio"
                name="partial"  />
              <Typograph type={ETypograghType.AuxiliarTitle}>
                Gerenciamento parcial de treinamentos
              </Typograph>
            </DisplayFlex>
            <Typograph
              style={{ marginLeft: "7%", marginTop: "1%" }}
              type={ETypograghType.AuxiliarText}
            >
              Permissão de criação e edição dos treinamentos que o usuário
              criar.
            </Typograph>
          </InputFieldContainer>
        </FormContainer>
        <Button
          style={{ alignSelf: "flex-end" }}
          width="28%"
          type={EButton.MainButton}
        >
          SALVAR ALTERAÇÕES
        </Button>
      </Card>
    </>
  );
};
