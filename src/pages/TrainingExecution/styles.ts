import styled from "styled-components";


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

export const Module = styled.div`
    display: flex;
    width: 100%;
    height: 7%;
    padding: 2%;
    // Selected
    //border-radius: ${props => props.theme.shape.borderRadius};
    //background-color: ${props => props.theme.pallete.blueViolet.light};

`