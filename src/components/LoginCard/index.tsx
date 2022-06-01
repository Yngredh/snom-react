import { TitleAuxiliar, TextAuxiliar, PopUpDiv } from "./styles";
import { theme } from "../../themes/theme";
import { Card } from "../Card";
import { Input } from "../Input";
import { Button, EButton } from "../Button";
import { ETypographType, Typograph } from "../Typograph";

interface ILoginCardProps {
  open: boolean,
  onClose: () => void
}

export const LoginCard = (props: ILoginCardProps) => {

  const onChangeEmail = () => {
    console.log("implement onChangeEmail here!");
  };

  const onChangePassword = () => {
    console.log("implement onChangePassword here!");
  };

  return (
    <>
      {props.open && (
        <PopUpDiv>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2%",
            }}
            width="480px"
            height="500px"
            borderColor={theme.pallete.blue.main}
            borderWidth="3px"
            backgroundColor="linear-gradient(180deg, #DBE5FB 0%, #9FBAF3 100%)"
          >
            <img
              style={{
                alignSelf: "flex-end",
                cursor: 'pointer',
              }}
              width="30px"
              height="30px"
              onClick={e => props.onClose()}
              src="img/icons/fechar.svg"
              alt="Fechar pop-up"
            />
            <TitleAuxiliar>
              <Typograph
                style={{ textAlign: "start" }}
                type={ETypographType.MainTitle}
              >
                CRIAR USUÁRIO
              </Typograph>
            </TitleAuxiliar>

            <TextAuxiliar>
              <Typograph type={ETypographType.AuxiliarText}>
                Lembre-se que essa senha será temporária, o usuário poderá
                alterá-la mais tarde.
              </Typograph>
            </TextAuxiliar>

            <Input
              style={{marginBottom: '1%'}}
              hint="Email"
              isPassword={false}
              width="80%"
              onChange={onChangeEmail}
            ></Input>
            <Input
              hint="Senha"
              isPassword={true}
              width="80%"
              onChange={onChangePassword}
            ></Input>
            <Input
              hint="Confirmar senha"
              isPassword={true}
              width="80%"
              onChange={onChangePassword}
            ></Input>

            <Button
              style={{ marginTop: "7.5%" }}
              width="50%"
              type={EButton.MainButton}
            >
              CRIAR USUÁRIO
            </Button>
          </Card>
        </PopUpDiv>
      )}
    </>
  );
};
