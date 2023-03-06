import styled from "styled-components";

export const TableContainer = styled.div`
    width: 90%;
    height: 70%;
    margin-top: 2%;
    
    border-style: solid;
    border-width: 6px;
    border-radius: 15px;
    border-color: ${props => props.theme.pallete.blueViolet.dark};
    background-color: ${props => props.theme.pallete.assistant.white};
`

export const HeaderContainer = styled.div`
    width: 100%;
    height: 8%;
    display: grid;
    grid-template-columns: 15% 35% 30% 10% 10%;
    box-shadow: 0px 3px 4px rgba(138, 154, 233, 0.7);
`

export const HeaderCell = styled.div`
    display: flex;
    align-items: center;
`

export const ContentContainer = styled.div`
    width: 100%;
    height: 92%;
    overflow-y: overlay;

    ::-webkit-scrollbar{
       width : 8px;
    }
    ::-webkit-scrollbar-track{
        box-shadow: inset 0 0 5px ${props => props.theme.pallete.cyanGreen.light}; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background: ${props => props.theme.pallete.cyanGreen.light};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover{
        background: ${props => props.theme.pallete.cyanGreen.dark};
    }
`