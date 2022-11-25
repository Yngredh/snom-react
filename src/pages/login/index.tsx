import { 
    SideContainer, Presentation, LoginContainer
} from './styles';
import { theme } from "../../themes/theme";
import {UserMockTypeOne as user} from '../../mock/UserMock';
import { Button, EButton } from '../../components/Button';
import { List } from '../../components/List';
import { DivLine } from '../../components/DivLine';
import { ETypographType, Typograph } from '../../components/Typograph';
import { Input } from '../../components/Input';
import { LoginCard } from '../../components/LoginCard';
import { User } from '../../interfaces/User';
import { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';
import { Card } from '../../components/Card';


export const Login = () => {

    return(
        <div style={{display: 'flex', width: '100vw', height: '100vh', justifyContent: 'right'}}>
            <LoginContainer style={{backgroundImage: 'url("img/background/loginBackgroundFrame.svg")'
            , backgroundSize: 'cover'}}>
                <LoginCard onClose={() => console.log("vish")}  onFinishCreate={(user) => console.log(user)} />
            </LoginContainer>
            <SideContainer>
                <Presentation>
                    <img src="/img/logotypes/logoWithBackgroundShadowPNG.png"/>
                    <Typograph
                        style={{ textAlign: "center", marginTop: "5%", marginBottom: "5%"}}
                        type={ETypographType.VioletText}>
                        Automatize os treinamentos da sua empresa!
                    </Typograph>
                    <img src="/img/figures/computerGirlStarBaloon.svg"/>
                </Presentation>
            </SideContainer>
        </div>
    )
}