import styled from "styled-components";

export const PopUp = styled.div`
    z-index: 99;
    border-style: solid;
    border-width: 5px;
    border-radius: ${props => props.theme.shape.borderRadius};
    border-color: ${props => props.theme.pallete.blueViolet.dark};
    background: #FFFFFF;

    width: 24%;
    height: 24%;
`

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    background: ${props => props.theme.pallete.blueViolet.dark};
    padding-left: 5%;
    padding-right: 2%;
    width: 100%;
    height: 20%;
`

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 3% 8%;
    width: 100%;
    height: 80%;
`

export const Background = styled.div`
    position: absolute;
    z-index: 99;
    margin: 0 auto;
    width: 93.5%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(0, 0, 0, 0.4);
`