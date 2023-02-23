import styled from "styled-components";

export const SelectionInput = styled.select`
    margin: 0;
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
export const SelectionOption = styled.option`
    
`

export const SelectionIcon = styled.img`
    width: 30px;
    height: 30px;
`