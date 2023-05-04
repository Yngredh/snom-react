import styled from "styled-components";

export const CheckboxTrueOrFalse = styled.div<{isTrue: boolean}>`
    -webkit-appearance: none;
    appearance: none;
    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 2em;
    width: 2em;
    border: 1px solid ${props => props.isTrue ? props.theme.pallete.cyanGreen.dark : props.theme.pallete.assistant.darkRed};
    border-radius: 0.20em;
    cursor: pointer;

`