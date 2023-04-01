import styled from "styled-components";

export const Question = styled.div`
    width: 90%;
    margin-top: 1%;
    border-width: 1px;
    border-top: 0px;
    border-style: solid;
    border-radius: ${props => props.theme.shape.borderRadius};
    border-color: ${props => props.theme.pallete.blueViolet.dark};
    
    box-shadow: ${props => props.theme.shape};

`

export const TitleContainer = styled.div<{ isSelected: boolean}>`
    width: 100%;
    height: 4.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    background-color: ${props => props.isSelected ? props.theme.pallete.assistant.blueIce : undefined};
    border-radius: ${props => props.theme.shape.borderRadius};
    border-width: 2px;
    border-style: solid;
    border-color: ${props => props.theme.pallete.blueViolet.dark};

    cursor: pointer;
    user-select: none
`

export const DropDownContainer = styled.div<{ isSelected: boolean}>`
    display: ${props => props.isSelected? 'flex' : 'none'};
    flex-direction: column;
    padding: 2%;
    width: 100%;
    transition: display 0.2s ease-out;
`

export const OptionContainer = styled.div`
    width: 100%;
    margin-bottom: 1%;
    display: flex;
    align-items: center;
    user-select: none
`

export const OptionDescriptionContainer = styled.div`
    width: 70%;
    margin-left: 1%;
    padding: 0.2em;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.theme.pallete.blueViolet.dark};
    
`

export const CustomRadioInput = styled.input`
    appearance: none;
    margin: 0;
    width: 1.20em;
    height: 1.20em;
    display: grid;
    place-content: center;
    cursor: pointer;
    border: 0.10em solid ${props => props.theme.pallete.blueViolet.dark};
    border-radius: 50%;


    &::before {
        content: "";
        width: 0.75em;
        height: 0.75em;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em ${props => props.theme.pallete.blueViolet.dark};
        backgroud-color: ${props => props.theme.pallete.blueViolet.dark};
    }

    &:checked {

        &::before{
            transform: scale(1);
        }
    }
`

