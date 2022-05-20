import styled from 'styled-components';

interface Props {
    width: string
    color: string
}

export const Line = styled.hr <Props>`
    height: 0px;
    border: 1px solid;
    width: ${props => props.width};
    border-color: ${props => props.color};
`;