import { Button, EButton } from "../../../../components/Button";
import { ETypograghType, Typograph } from "../../../../components/Typograph";
import { UserIcon } from "../../../../components/UserIcon";
import { User } from "../../../../interfaces/User";
import { ProfileContainer, UserDataCotainer } from "./styles";

interface IUserProfileProps {
    height: string
    width: string
    user: User
    style? : React.CSSProperties
    onDelete : () => void
}

export const UserProfileView = (props : IUserProfileProps) => {
  return (
    <>
      <ProfileContainer style={{height: props.height, width: props.width}}>
        <UserIcon userImg={props.user.icon} />
        <UserDataCotainer>
          <div>
            <Typograph type={ETypograghType.MainTitle}>
                {props.user.name}
            </Typograph>
            <Typograph type={ETypograghType.Text}>
                {props.user.email}
            </Typograph>
          </div>

          <Button
            onClick={props.onDelete} 
            style={{ marginTop: "8%" }} 
            type={EButton.AlertButton} 
            width='60%'>
            APAGAR USUÁRIO
          </Button>
        </UserDataCotainer>
      </ProfileContainer>
    </>
  );
};
