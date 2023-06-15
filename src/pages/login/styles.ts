import styled from 'styled-components';

export const SideContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-self: center;

    width: 30%;
    height: 100%;
    margin-left: 0%;
    margin-right: 0%;
    background-color: ${props => props.theme.pallete.cyanGreen.light}
`;

export const Presentation = styled.div`
    margin: auto;
    height: 80%;
    width: 80%;  

`;