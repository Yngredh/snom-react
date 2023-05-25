import styled from "styled-components";
import { theme } from "../../themes/theme";


export const ShowModuleTitle = styled.div`
    display: flex;
    align-items: center;

    width: 90%;
    height: 50%;
    margin: 2%;
    
`

export const ModuleList = styled.div`
    display: flex;
    flex-direction: column;
    width: 96%;
    height: 80%;
    margin: 4%;

    overflow-y: auto;

    ::-webkit-scrollbar{
    width : 8px;
    }
    ::-webkit-scrollbar-track{
        box-shadow: inset 0 0 5px ${props => props.theme.pallete.cyanGreen.dark}; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background: ${props => props.theme.pallete.cyanGreen.dark};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover{
        background: ${props => props.theme.pallete.cyanGreen.dark};
    }
`

export const Module = styled.div<{ isSelected: boolean, isEnabled: boolean}>`
    display: flex;
    width: 98%;
    height: 7%;
    padding: 2%;

    // Selected
    border-style: ${props => props.isSelected ? 'solid' : undefined };
    border-color: ${props => props.isSelected ? props.theme.pallete.blueViolet.dark : undefined};
    border-width: ${props => props.isSelected ? props.theme.shape.borderSize : undefined};
    border-radius: ${props => props.isSelected ? props.theme.shape.borderRadius : undefined};
    background-color: ${props => props.isSelected ? props.theme.pallete.cyanGreen.light : undefined};


    #deactivated-title-module {
        color: ${theme.pallete.assistant.lightGray};
    }

    #deactivated-icon-module {
        filter: invert(98%) sepia(0%) saturate(0%) hue-rotate(162deg) brightness(86%) contrast(85%);
    }
`

export const ModuleContent = styled.div`
    width: 100%;
    height: 90%;

    display: flex;
    flex-direction: column;
    align-items: center;
`