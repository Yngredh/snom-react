import styled from "styled-components";

export const VideoContainer = styled.div`
    width: 80%;
    height: 60%;
    margin-top: 1%;
    display: flex;
    justify-content: center;
    position: relative;
`;

export const DescriptionContainer = styled.div`
    width: 90%;
    height: 30%;
    margin-top: 2%;
    border-style: solid;
    border-width: ${props => props.theme.shape.borderSize};
    border-color: ${props => props.theme.pallete.blueViolet.dark};
    border-radius: ${props => props.theme.shape.borderRadius};
    box-shadow: ${props => props.theme.shape.boxShadow};
`;