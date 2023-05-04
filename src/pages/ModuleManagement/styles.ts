import styled from "styled-components";

export const TopSideContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 90%;
    height: 10%;
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    width: 25%;
    height: 100%;
`

export const ModuleList = styled.div`
    display: flex;
    flex-direction: column;
    width: 92%;
    height: 80%;
    margin: 4%;
`

export const Module = styled.div`
    display: flex;
    width: 100%;
    height: 7%;
    padding: 2%;
    cursor: pointer;

    :hover {
        border-style: solid;
        border-width: 2px;
        border-radius: ${props => props.theme.shape.borderRadius};
        border-color: ${props => props.theme.pallete.blueViolet.dark};
        background-color: ${props => props.theme.pallete.cyanGreen.light};
    }
`

export const ModuleTitle = styled.div`
    display: flex;
    align-items: center;
    
    width: 80%;
`

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 96%;
    height: 86%;
`

export const ModuleSelectBar = styled.div`
    display: flex;
    justify-content: center;

    position: fixed;
    top: 150px;
    right: 55px;
    width: 16%; 
    height: 8%;
`

export const ModuleSelectButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    
    width: 16%; 
    height: 70%;
    cursor: pointer;
    font-size: 30px;
    font-weight: 900;
    color: ${props => props.theme.pallete.blueViolet.dark};

    border-width: ${props => props.theme.shape.borderSize};
    border-style: solid;
    border-color: ${props => props.theme.pallete.blueViolet.dark};
    background: ${props => props.theme.pallete.assistant.blueIce};
    box-shadow: ${props => props.theme.shape.boxShadow};
    border-radius: 30px;

    :hover {
        background-color: ${props => props.theme.pallete.blueViolet.dark};
        color: ${props => props.theme.pallete.assistant.white};
    }
`

export const ModuleSelect = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 24%;
    height: 90%;
    padding: 2%;
    cursor: pointer;

    :hover {
        border-style: solid;
        border-width: 2px;
        border-radius: ${props => props.theme.shape.borderRadius};
        border-color: ${props => props.theme.pallete.blueViolet.dark};
        background-color: ${props => props.theme.pallete.cyanGreen.light};
    }
`
