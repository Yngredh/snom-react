import { theme } from "../../themes/theme";
import { GridContainer, TrainingDiv } from "./styles"
import { Card } from "../Card"
import { Typograph, ETypographType } from "../Typograph";
import { ITraining } from "../../interfaces/ITraining";
import { useNavigate } from "react-router-dom";

export interface ITrainingGridViewProps {
    trainingList: ITraining[],
    filter: { tittle: string, status : string },
    route: string
}

export const TrainingGridView = (props: ITrainingGridViewProps) => {
    const navigate = useNavigate();
    
    const goToTrainingView = (training : ITraining) => {
        navigate(`/${props.route}/${training.trainingId}`);
    }

    return(
        <>
        <GridContainer>
            {props.trainingList
            .filter(training => training.title.includes(props.filter.tittle))
            .filter(training => {
                const statusId =  props.filter.status ? parseInt(props.filter.status) : undefined;
                
                if(statusId) return training.status.trainingStatusId === statusId;
                return training;
            })
            .map((training, key) => {
                return(
                <>
                    <TrainingDiv onClick={e => goToTrainingView(training)} key={`training-${key}`}>
                        <Card
                            width={"300px"}
                            height={"200px"}
                            style={{marginBottom: '4%',cursor: 'pointer', overflow: 'hidden'}}
                            borderColor={theme.pallete.assistant.black}
                            borderWidth={"1px"}>
                                <img style={{objectFit: 'cover'}} width={"100%"} height={"100%"} src={training.icon} alt=""/>
                        </Card>
                        <Typograph style={{width: "280px", cursor: 'pointer'}} type={ETypographType.AuxiliarText}> {training.title} </Typograph>
                    </TrainingDiv>
                </>)
            })}
        </GridContainer>
        </>
    )
}