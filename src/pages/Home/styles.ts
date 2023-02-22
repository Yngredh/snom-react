import styled from "styled-components";

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    height: 50%;
    width: 80%;
    margin: 0;
    margin-top: 6%;
    margin-bottom: 0%;
`

export const ProfileTitles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 60%;
`

export const DetailedInfoCard = styled.div`
    display: flex;

    margin: 5%;
`

export const DetailedInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    width: 80%;
`

export const EmblemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    height: 54%;
    width: 100%;
    margin-bottom: 0%;
`

export const TrainingLevelsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    margin: 0% 5% 0 5%;
`
export const TrainingGridView = styled.div`
    width: 45%;
    height: 80%;
    display: flex;
    flex-direction: column;
    margin-left: 4%;
`

export const RecentlyAccessed = styled.div`
    height: 42%;
    width: 100%;
    margin-top: 2%;
`

export const FinishedTrainings = styled.div`
    height: 42%;
    width: 100%;
    margin-top: 10%
`
export const TrainingList = styled.div`
    width: 100%;
    margin-top: 2%;

    display: grid;
    grid-auto-flow: column;
    gap: 1%;

    overflow-x: auto;
    overflow-y: hidden;

    ::-webkit-scrollbar{
       height: 10px;
       margin: 0;
       padding: 0;
    }
    ::-webkit-scrollbar-track{
        box-shadow: inset 0 0 4px ${props => props.theme.pallete.blueViolet.dark}; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background: ${props => props.theme.pallete.blueViolet.dark};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover{
        background: ${props => props.theme.pallete.blueViolet.light};
    }
`
export const TrainingDiv = styled.div`
    width: 260px;
    height: 300px;
    display: grid;
    gap: 0.5%;
    justify-items: center;
    text-align: center;
`