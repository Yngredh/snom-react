import styled from 'styled-components';

interface IContainerProps{
    backgroundColor: string
}

export const Icon = styled.img`
    border-radius: 5px;
    object-fit: cover;
    width: 60px;
    height: 60px;
`
export const Container = styled.div<IContainerProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding-left: 2%;

    cursor: pointer;
    background-color: ${props => props.backgroundColor};
    border-radius: ${props => props.theme.shape.borderRadius};
`
export const BlockContainer = styled.div`
    margin-left: 4%;
    display: flex;
    flex-direction: column;
`

export const UserInfoContainer  = styled.div`
    display:  flex;
    align-items: center;
    width: 90%;
    height: 100%;
`

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 10%;
    height: 100%;
`

export const DeleteIcon = styled.img`
    width: 30px;
    height: 30px;

    cursor: pointer;
`
