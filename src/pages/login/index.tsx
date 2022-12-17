import { 
    SideContainer, Presentation, LoginContainer
} from './styles';
import { ETypographType, Typograph } from '../../components/Typograph';
import { LoginCard } from '../../components/LoginCard';
import { UserService } from '../../services/UserService';
import { IUser } from '../../interfaces/IUser';

interface ILoginProps {
    onSucessufullyLogin: (token: string) => void
    onFailureLogin: () => void
}

export const Login = (props: ILoginProps) => {

    const getUserToken = async (user: Partial<IUser>) => {
        const token = await UserService.authenticate(user);

        if(token === "") {
            console.log("Usuário invalido")
            props.onFailureLogin();
            return;
        }
        props.onSucessufullyLogin(token);
    }

    return(
        <div style={{display: 'flex', width: '100vw', height: '100vh', justifyContent: 'right'}}>
            <LoginContainer style={{backgroundImage: 'url("img/background/loginBackgroundFrame.svg")'
            , backgroundSize: 'cover'}}>
                <LoginCard authenticateUser={getUserToken} />
            </LoginContainer>
            <SideContainer>
                <Presentation>
                    <img alt="Background shapes" src="/img/logotypes/logoWithBackgroundShadowPNG.png"/>
                    <Typograph
                        style={{ textAlign: "center", marginTop: "5%", marginBottom: "5%"}}
                        type={ETypographType.VioletText}>
                        Automatize os treinamentos da sua empresa!
                    </Typograph>
                    <img alt="Girl in a computer" src="/img/figures/computerGirlStarBaloon.svg"/>
                </Presentation>
            </SideContainer>
        </div>
    )
}