import styled from 'styled-components';

export const Name = styled.p`
    font-weight: ${props => props.theme.typography.mainTitleWeight};
    font-size: ${props => props.theme.typography.secondaryTitleSize};
    font-family: ${props => props.theme.typography.fontFamily};
`
export const Email = styled.p`
    font-weight: ${props => props.theme.typography.standardWeight};
    font-size: ${props => props.theme.typography.standardTextSize};
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
    margin-bottom: 8%;
`
export const BlockContainer = styled.div`
    margin-left: 8px;
    display: flex;
    flex-direction: column;
`