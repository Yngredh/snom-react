import styled from "styled-components";

interface IParagraphProps {
    weight : string,
    size: string,
    color: string,
}

export const Paragraph = styled.p<IParagraphProps>`
    margin: 0;
    font-family: ${props => props.theme.typography.fontFamily};
    font-weight: ${props => props.weight};
    font-size: ${props => props.size};

    color: ${props => props.color}
`