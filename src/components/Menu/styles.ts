import styled from 'styled-components';

export const Styled = styled.div`
    background-color: ${props => props.theme.pallete.blueViolet.dark};
    padding: 20px;
    width: 7%;
    height: 100%;

    display: flex ;
    flex-direction: column;
    justify-content: space-between;
`;

export const Container = styled.div`
    display: flex ;
    flex-direction: column;
    align-items: center;
`
