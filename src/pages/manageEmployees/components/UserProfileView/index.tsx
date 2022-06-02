import { Button, EButton } from "../../../../components/Button";
import { ETypographType, Typograph } from "../../../../components/Typograph";
import { UserIcon } from "../../../../components/UserIcon";
import { User } from "../../../../interfaces/User";
import { ProfileContainer, UserDataCotainer } from "./styles";

interface IUserProfileProps {
    height: string
    width: string
    user: User
    style? : React.CSSProperties
    onDelete : (userId: number) => void
}

export const UserProfileView = (props : IUserProfileProps) => {
  return (
    <>
      <ProfileContainer style={{height: props.height, width: props.width}}>
        <UserIcon userImg={props.user.icon} />
        <UserDataCotainer>
          <div>
            <Typograph type={ETypographType.MainTitle}>
                {props.user.name}
            </Typograph>
            <Typograph style={{marginLeft: '2%'}} type={ETypographType.Text}>
                {props.user.email}
            </Typograph>
          </div>

          <Button
            onClick={() => props.onDelete(props.user.id)} 
            style={{ marginTop: "8%" }} 
            type={EButton.AlertButton} 
            width='80%'>
            APAGAR USUÁRIO
          </Button>
        </UserDataCotainer>
      </ProfileContainer>
    </>
  );
};
