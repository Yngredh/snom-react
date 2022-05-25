import styled from "styled-components";

export const Container = styled.div`
    width: 200px;   
    height: 200px;

    border-radius: ${props => props.theme.shape.borderRadius};
    box-shadow: ${props => props.theme.shape.boxShadow};
`

export const Icon = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 5px solid;
    border-color: ${props => props.theme.pallete.yellow.main};
    border-radius: ${props => props.theme.shape.borderRadius};
`