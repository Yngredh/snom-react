import styled from "styled-components";

export const UpHeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${props => props.theme.pallete.cyanGreen.dark};
    width: 100%;
    height: 30%;
`

export const TrainingProfileGrid = styled.div`
    display: grid;
    column-gap: 50px;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: center;

    height: 60%;
    width: 80%;
`

export const TrainingInfo = styled.div`
    display: flex;
    justify-self: center;
    align-items: center;
    justify-content: space-between;

    height: 60%;
    width: 80%;
`

export const ModulesListContainer = styled.div`
    display: flex;
    justify-content: center;

    height: 92%;
    width: 50%;
    margin-top: 1%;
`
export const ScrollableListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    height: 100%;
    width: 60%;

    overflow-y: auto;

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

export const TrainingPreview = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5%;
    margin-left: 1%;
    height: 70%;
    width: 36%;
`

export const ContentContainer = styled.div`

    display: flex;
    justify-content: space-around;
    
    height: 70%;
    width: 100%;

`
export const UpsideContainer = styled.div`
    display: grid;
    column-gap: 50px;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: center;
    margin-top: 6%;

    width: 100%;
    height: 100%;
`

export const BottomSideContainer = styled.div`
    display: grid;
    column-gap: 30px;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
`