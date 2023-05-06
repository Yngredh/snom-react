import styled from "styled-components";

export const TestContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 98%;
    height: 95%;
    margin-top: 1%;

    overflow-x: hidden;
    overflow-y: visible;

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