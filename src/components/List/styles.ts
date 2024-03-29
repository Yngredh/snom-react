import styled from "styled-components";

export const Container = styled.div`
    height: 90%;
    width: 100%;
    margin-top: 1%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1%;

    ::-webkit-scrollbar{
       width : 8px;
    }
    ::-webkit-scrollbar-track{
        box-shadow: inset 0 0 5px ${props => props.theme.pallete.blueViolet.dark}; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background: ${props => props.theme.pallete.blueViolet.dark};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover{
        background: ${props => props.theme.pallete.blueViolet.dark};
    }
`