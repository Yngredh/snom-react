import styled from "styled-components";

interface IBackgroundContainerProps {
    backgroundImage : string,
    backgroundSize : string
}

export const BackgroundContainer = styled.div<IBackgroundContainerProps>`
    width: 93.5%;
    height: 100%;
    margin: 0%;
    background-image: ${props => props.backgroundImage};
    background-size: ${props => props.backgroundSize};
`