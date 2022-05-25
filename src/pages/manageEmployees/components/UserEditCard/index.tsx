import { Button, EButton } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { DivLine } from "../../../../components/DivLine";
import { Input } from "../../../../components/Input";
import { ETypograghType, Typograph } from "../../../../components/Typograph";
import { theme } from "../../../../themes/theme";
import { DisplayFlex, FormContainer, InputFieldContainer } from "./styles";

export const UserEditCard = () => {
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
              style={{
                marginTop: "5%",
                marginBottom: "3%",
              }}
              hint="novo email"
              width="90%"
              isPassword={false}
              onChange={(e) => console.log(e.value)}
            />
            <Input
              style={{
                marginBottom: "3%",
              }}
              hint="nova senha"
              width="90%"
              isPassword={true}
              onChange={(e) => console.log(e.value)}
            />
            <Input
              hint="confirmar senha"
              width="90%"
              isPassword={true}
              onChange={(e) => console.log(e.value)}
            />
          </InputFieldContainer>
          <InputFieldContainer>
            <Typograph
              style={{ marginTop: "3%", marginBottom: "5%" }}
              type={ETypograghType.AuxiliarTitle}
            >
              PERMISSÕES
            </Typograph>
            <DisplayFlex>
              <input type={"radio"} id={""} name={"permission"} />
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
              <input type={"radio"} id={""} name={"permission"} />
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
