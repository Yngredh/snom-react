import { BackgroundContainer } from "./style"


export enum EBackground {
    LoginBackgroundFrame = 0,
    MainBackgroundFrame = 1,
    SimpleBackgroundFrame = 2
}

interface IBackground {
    type: EBackground,
    children: any,
    style?: React.CSSProperties 
}

export const Background = (props : IBackground) => {

    const loginBackGround = 'url("/img/background/loginBackgroundFrame.svg")'
    const mainBackground = 'url("/img/background/mainBackgroundFrame.svg")'
    const simpleBackground = 'url("/img/background/simpleBackgroundFrame.svg")'

    const setBackgroundType = () => {
        if(props.type === EBackground.LoginBackgroundFrame) return loginBackGround
        if(props.type === EBackground.MainBackgroundFrame) return mainBackground
        return simpleBackground
    }

    return(
        <BackgroundContainer 
            backgroundImage = {setBackgroundType()}
            backgroundSize = 'cover'
            style={props.style}>
                {props.children}
        </BackgroundContainer>
    )

}