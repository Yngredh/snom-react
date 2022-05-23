import styled from "styled-components";

interface IContainerProps {
    width :string,
    height: string,
    borderColor: string,
    borderWidth: string,
    backgroundColor: string
}

export const Container = styled.div<IContainerProps>`
    width: ${props => props.width};
    height: ${props => props.height};
    margin: 2%;

    border-width: ${props => props.borderWidth};
    border-style: solid;
    border-color: ${props => props.borderColor};
    background: ${props => props.backgroundColor};
    box-shadow: ${props => props.theme.shape};
    border-radius: ${props => props.theme.shape.borderRadius};
`