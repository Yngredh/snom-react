import styled from "styled-components";

export const PopUpDiv = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10;
    background-color: rgba(0,0,0,0.25);
    
    display: flex;
    align-items: center;
    justify-content: center;
`

export const TitleAuxiliar = styled.div`
    width: 80%;
    margin-top: 12px;
    margin-bottom: 4%;
    display: flex;
    justify-content: space-between;
`;

export const TextAuxiliar = styled.div`
    width: 80%;
    margin-bottom: 24px;

    text-align: center;
`;