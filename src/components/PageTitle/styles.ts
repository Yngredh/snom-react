import styled from 'styled-components';

export const Title = styled.h1`
    margin-left: 2.5%;
    width: 100%;

    font-family: ${props => props.theme.typography.fontFamily};
    font-weight: ${props => props.theme.typography.pagetitleWeight};
    font-size: ${props => props.theme.typography.pageTitleSize};
`;

export const Container = styled.div`
    display: flex ;
    flex-direction: column;
`;