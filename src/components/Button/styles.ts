import styled from "styled-components";

interface IButtonProps {
    backgroundColor: string
    borderColor: string
    fontColor: string
    hoverColor: string
    fontHoverColor: string
    borderHoverColor?: string
    width: string
}

export const ContainerButton = styled.div<IButtonProps>`
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 50px;
    width: ${props => props.width};
    padding: 10px;
    
    background: ${props => props.backgroundColor};
    border: 2px solid;
    border-color: ${props => props.borderColor};
    border-radius: ${props => props.theme.shape.borderRadius};

    color: ${props => props.fontColor};
    font-family: ${props => props.theme.typography.fontFamily};
    font-size: ${props => props.theme.typography.buttonTitle.size};
    font-weight: ${props => props.theme.typography.buttonTitle.weight};
    text-align: center;

    &:hover {
        background: ${props => props.hoverColor};
        color:  ${props => props.fontHoverColor};
        border-color: ${props => props.borderHoverColor};
    }
`

export const IconInput = styled.img`
    width: 20px;
    height: 20px;
`