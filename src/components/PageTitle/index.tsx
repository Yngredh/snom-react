import { DivLine } from '../DivLine';
import { Title, Container } from './styles';

interface Props {
    title: string;
}

export const PageTitle = ({title}: Props) => {
    return(
        <Title>{title}</Title>
    );
}