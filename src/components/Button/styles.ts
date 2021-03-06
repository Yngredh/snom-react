import styled from "styled-components";

interface IButtonProps {
    color: string
    hoverColor: string
    fontHoverColor: string
    width: string
}

export const ContainerButton = styled.div<IButtonProps>`
    cursor: pointer;

    height: fit-content;
    width: ${props => props.width};
    padding: 10px 15px;
    
    background: ${props => props.color};
    border: 2px solid; 
    border-radius: ${props => props.theme.shape.borderRadius};
    border-color: ${props => props.color};

    color: ${props => props.theme.typography.buttonTitle.color};
    font-family: ${props => props.theme.typography.fontFamily};
    font-size: ${props => props.theme.typography.buttonTitle.size};
    font-weight: ${props => props.theme.typography.buttonTitle.weight};
    text-align: center;

    &:hover {
        background: ${props => props.hoverColor};
        color:  ${props => props.fontHoverColor}
    }
`