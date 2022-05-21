import styled from "styled-components";

interface IContainerProps {
    width :string
}

export const TextInput = styled.input`
    box-shadow: none;
    border: none;
    background: none;
    width: 100%;
    
    font-size: ${props => props.theme.typography.standardTitleSize};
    font-family: ${props => props.theme.typography.fontFamily};

    &:focus {
        outline: none;
    }
`
export const IconInput = styled.img`
    width: 30px;
    height: 30px;
`

export const Container = styled.div<IContainerProps>`
    margin: 2%;
    height: 40px;
    width: ${props => props.width};
    padding: 5px;
    display: flex;
    align-items: center;

    border-width: ${props => props.theme.shape.borderSize};
    border-style: solid;
    border-color: ${props => props.theme.pallete.assistant.darkGray} ;
    border-radius: ${props => props.theme.shape.borderRadius};

    box-shadow: ${props => props.theme.shape.boxShadow};
`