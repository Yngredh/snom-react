import styled from "styled-components";

export const UpHeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${props => props.theme.pallete.cyanGreen.light};
    height: 30%;
`

export const TrainingInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-self: center;
    align-items: center;
    justify-content: space-between;

    height: 60%;
    width: 70%;
`

export const ModulesListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 90%;
    width: 50%;
`

export const TrainingPreview = styled.div`
    height: 90%;
    width: 40%;
`

export const ContentContainer = styled.div`
    display: flex;
    justify-content: space-around;
    
    height: 70%;
    width: 100%;

`