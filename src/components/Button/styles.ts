import styled from "styled-components";

interface IButtonProps {
    color: string
    hoverColor: string
    fontHoverColor: string
}

export const ContainerButton = styled.div<IButtonProps>`
    cursor: pointer;

    height: fit-content;
    margin: 5%;
    padding: 15px 20px;
    
    background: ${props => props.color};
    border: 2px solid; 
    border-radius: ${props => props.theme.shape.borderRadius};
    border-color: ${props => props.color};

    color: ${props => props.theme.pallete.assistant.white};
    font-family: ${props => props.theme.typography.fontFamily};
    font-size: ${props => props.theme.typography.buttonTextSize};
    font-weight: ${props => props.theme.typography.buttonTextWeight};
    text-align: center;

    &:hover {
        background: ${props => props.hoverColor};
        color:  ${props => props.fontHoverColor}
    }
`