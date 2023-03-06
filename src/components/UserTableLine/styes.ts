import styled from "styled-components";

export const LineContainer = styled.div`
    width: 100%;
    height: 12%;
    display: grid;
    grid-template-columns: 15% 35% 30% 10% 10%;
    box-shadow: 0px 2px 2px rgba(138, 154, 233, 0.3);
`

export const IconContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const NameContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`
export const EmailContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`
export const PermissionContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ActionContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Icon = styled.img`
    border-radius: 5px;
`

export const Checkbox = styled.input`
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    

    height: 2em;
    width: 2em;
    border: 0.15em solid ${props => props.theme.pallete.cyanGreen.dark};
    border-radius: 0.15em;
    cursor: pointer;

    &::before{
        content: "";
        width: 1.1em;
        height: 1.1em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1.2em 1.2em ${props => props.theme.pallete.cyanGreen.dark};
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }
    &:checked {
        display: grid;
        place-content: center;
        
        &::before {
            transform: scale(1);
        }
    }
`