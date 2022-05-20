import { Icon, Title, Container} from './styles';

type Props = {
    title: string;
    icon: string;
}

const MenuItem = ({title, icon}: Props) => {
    return(    
        <Container>
            <Icon className="icon-menu" src={icon}></Icon>
            <Title className="title-menu">{title}</Title>
        </Container>
    );
}
export default MenuItem;