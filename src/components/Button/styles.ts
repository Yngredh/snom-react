import styled from "styled-components";

interface IButtonProps {
    color: string
}

export const ContainerButton = styled.div<IButtonProps>`
    cursor: pointer;

    height: fit-content;
    margin: 5%;
    padding: 25px;
    
    background: ${props => props.color};
    border-radius: ${props => props.theme.shape.borderRadius};

    color: ${props => props.theme.pallete.assistant.white};
    font-family: ${props => props.theme.typography.fontFamily};
    font-size: ${props => props.theme.typography.buttonTextSize};
    font-weight: ${props => props.theme.typography.buttonTextWeight};
    text-align: center;
`