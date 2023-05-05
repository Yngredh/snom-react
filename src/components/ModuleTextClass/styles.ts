import styled from "styled-components";

export const ModuleTextContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-right: 0.5%;
    margin-top: 1%;
    margin-bottom: 1%;
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