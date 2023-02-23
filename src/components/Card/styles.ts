import styled from "styled-components";
import { Paragraph } from "../Typograph/styles";

interface IContainerProps {
    width :string,
    height: string,
    borderColor: string,
    borderWidth?: string,
    backgroundColor: string,
    hoverStyle?: React.CSSProperties
}

export const Container = styled.div<IContainerProps>`
    width: ${props => props.width};
    height: ${props => props.height};

    border-width: ${props => props.borderWidth? props.borderWidth: props.theme.shape.borderSize};
    border-style: solid;
    border-color: ${props => props.borderColor};
    background: ${props => props.backgroundColor};
    box-shadow: ${props => props.theme.shape};
    border-radius: ${props => props.theme.shape.borderRadius};

    :hover {
        background-color: ${props => props.hoverStyle? props.hoverStyle.backgroundColor : props.backgroundColor};
        border-color: ${props => props.hoverStyle? props.hoverStyle.borderColor : props.borderColor};
    }

    :hover ~${Paragraph} {
        color: #FFFFFF;
    }
`