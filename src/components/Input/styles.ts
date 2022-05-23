import styled from "styled-components";

export const TextInput = styled.input`
    box-shadow: none;
    border: none;
    background: none;
    width: 100%;
    
    font-size: ${props => props.theme.typography.auxiliarText.size};
    font-family: ${props => props.theme.typography.fontFamily};

    &:focus {
        outline: none;
    }
`
export const IconInput = styled.img`
    width: 30px;
    height: 30px;
`