import styled from "styled-components";

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;

    width: 90%;
    height: 65%;
    box-sizing: border-box;

    margin-top: 2%;

    overflow-y: auto;
    overflow-x: hidden;

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

export const TrainingDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;
    margin: 1%;
    
    text-align: center;
`