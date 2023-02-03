import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Styled = styled.div`
    background-color: ${props => props.theme.pallete.midnightBlue.dark};
    padding: 20px;
    width: 6.5%;
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

export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;
