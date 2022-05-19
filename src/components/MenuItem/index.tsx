import { Icon, Title, Container} from './styles';

type Props = {
    title: string;
    icon: string;
}
const MenuItem = ({title, icon}: Props) => {
    return(    
        <Container>
            <Icon src={icon}></Icon>
            <Title>{title}</Title>
        </Container>
    );
}
export default MenuItem;