import { Line } from './styles';

type Props = {
    size: string;
    color: string;
}

export const DivLine = ({size, color}: Props) => {
    return(
        <Line color={color} width={size}></Line>
    );
}