import styled from 'styled-components';

export const Name = styled.p`
    font-weight: ${props => props.theme.typography.auxiliarTitle.weight};
    font-size: ${props => props.theme.typography.auxiliarTitle.size};
    font-family: ${props => props.theme.typography.fontFamily};
`
export const Email = styled.p`
    font-weight: ${props => props.theme.typography.text.weight};
    font-size: ${props => props.theme.typography.text.size};
`

export const Icon = styled.img`
    border-radius: 5px;
    object-fit: cover;
    width: 110px;
    height: 100%;
`
export const Container = styled.div`
    display: flex;
    height: 80px;
    cursor: pointer;
    margin-bottom: 4%;
`
export const BlockContainer = styled.div`
    margin-left: 8px;
    display: flex;
    flex-direction: column;
`