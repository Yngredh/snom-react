import styled from 'styled-components';

interface Props {
    width: string
    color: string
}

export const Line = styled.hr <Props>`
    width: ${props => props.width};
    color: ${props => props.color};
    height: 0px;
    border: 1px solid #000000;
`;