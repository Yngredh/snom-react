import styled from "styled-components";
import { Dropdown } from "../../components/Dropdown";

export const TopSideContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 90%;
    height: 10%;
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    width: 25%;
    height: 100%;
`

export const Form = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;

    width: 90%;
    height: 90%;
    margin: 6%;
    margin-top: 6%;
`
export const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    width: 90%;
    height: 90%;
`

export const SelectInput = styled.select`
    width: 50%;
    height: 6%;
    
    outline: none;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${props => props.theme.pallete.blueViolet.dark};
`

export const PartitionContainer = styled.div`
    display: flex;
    width: 100%;
    height: 8%;
`

export const UsersManagerContainer = styled.div`
    width: 45%;
    height: 96%;
`

export const DropDown = styled.div`
    display: flex;
    width: 94%;
    height: 7%;
    align-items: center;
    justify-content: space-between;
`

export const AddIcon = styled.img`
    width: 5%;
    margin-top: 1%;
    margin-right: 2%;
    cursor: pointer;
`