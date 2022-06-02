import styled from 'styled-components';

interface IContainerProps{
    backgroundColor: string
}

export const Icon = styled.img`
    border-radius: 5px;
    object-fit: cover;
    width: 85px;
    height: 85px;
`
export const Container = styled.div<IContainerProps>`
    display: flex;
    align-items: center;
    height: 100px;
    padding: 2%;

    cursor: pointer;
    background-color: ${props => props.backgroundColor};
    border-radius: ${props => props.theme.shape.borderRadius};
`
export const BlockContainer = styled.div`
    margin-left: 4%;
    display: flex;
    flex-direction: column;
`