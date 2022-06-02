import { useEffect, useState } from "react";
import { Button, EButton } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { DivLine } from "../../../../components/DivLine";
import { Input } from "../../../../components/Input";
import { ETypographType, Typograph } from "../../../../components/Typograph";
import { defaultPermission } from "../../../../interfaces/Permission";
import { User } from "../../../../interfaces/User";
import { theme } from "../../../../themes/theme";
import { DisplayFlex, FormContainer, InputFieldContainer } from "./styles";

interface IEditForm {
  newEmail: string,
  newPassword: string,
  confirmPassword: string,
  selectedPermission: number,
}
interface IEditUserProps {
  user: User,
  onFinish : (newUserData : Partial<User>) => void
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

  const handleSaveEditClick = () => {
    if(showError.email || showError.password || showError.confirmPassword) {}
    else{
      const newDataUser: Partial<User> = {
        id: props.user.id,
        permission: props.user.permission,
      }

      if(editForm.newEmail !== '') newDataUser.email = editForm.newEmail;
      if(editForm.newPassword !== '') newDataUser.password = editForm.newPassword;
      newDataUser.permission!!.id = editForm.selectedPermission;

      props.onFinish(newDataUser);
    }
  }
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

  useEffect(() => {
    setEditForm({
      newEmail: '',
      newPassword: '',
      confirmPassword: '',
      selectedPermission: props.user.permission.id
    })
  },[props.user])

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
        height="fit-content"
        borderColor={theme.pallete.blue.second}
        borderWidth="5px"
      >
        <Typograph style={{ marginTop: "3%" }} type={ETypographType.MainTitle}>
          EDITAR USUÁRIO
        </Typograph>
        <DivLine size="100%" color={theme.pallete.assistant.black} />
        <FormContainer>
          <InputFieldContainer>
            <Typograph
              style={{ marginTop: "3%" }}
              type={ETypographType.AuxiliarTitle}
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
            <Typograph type={ETypographType.AuxiliarText} style= {{ color: theme.pallete.status.borderRed}}>
              Por favor, preencha o formulário corretamente!
            </Typograph>): <></>}
          </InputFieldContainer>
          <InputFieldContainer>
            <Typograph
              style={{ marginTop: "3%", marginBottom: "5%" }}
              type={ETypographType.AuxiliarTitle}
            >
              PERMISSÕES
            </Typograph>
            <DisplayFlex>
              <input 
                checked={editForm.selectedPermission === defaultPermission[0].id} 
                onClick={(e) => handleSelect(e.currentTarget.name)} 
                type="radio"
                name="total" />
              <Typograph type={ETypographType.AuxiliarTitle}>
                Gerenciamento total de treinamentos
              </Typograph>
            </DisplayFlex>
            <Typograph
              style={{ marginLeft: "7%", marginTop: "1%", marginBottom: "2%" }}
              type={ETypographType.AuxiliarText}
            >
              Permissão de criação e edição de todos os treinamentos ativos.
            </Typograph>
            <DisplayFlex>
              <input
                checked={editForm.selectedPermission === defaultPermission[1].id} 
                onClick={(e) => handleSelect(e.currentTarget.name)} 
                type="radio"
                name="partial"  />
              <Typograph type={ETypographType.AuxiliarTitle}>
                Gerenciamento parcial de treinamentos
              </Typograph>
            </DisplayFlex>
            <Typograph
              style={{ marginLeft: "7%", marginTop: "1%" }}
              type={ETypographType.AuxiliarText}
            >
              Permissão de criação e edição dos treinamentos que o usuário
              criar.
            </Typograph>
          </InputFieldContainer>
        </FormContainer>
        <Button
          style={{ alignSelf: "flex-end", marginTop: '3%', marginBottom: '3%' }}
          onClick={handleSaveEditClick}
          type={EButton.MainButton}
        >
          SALVAR ALTERAÇÕES
        </Button>
      </Card>
    </>
  );
};
