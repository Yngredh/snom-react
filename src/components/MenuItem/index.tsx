import { theme } from '../../themes/theme';
import { Icon, Title, Container} from './styles';

type Props = {
    title: string;
    icon: string;
    isActive: boolean;
    onClick?: () => void
}

const MenuItem = ({title, icon, isActive, onClick}: Props) => {
    const iconActiveStyle : React.CSSProperties = 
        isActive ? {filter: "invert(66%) sepia(86%) saturate(2248%) hue-rotate(198deg) brightness(99%) contrast(85%)"} : {};
    const titleActiveStyle: React.CSSProperties = isActive ? {color: theme.pallete.blueViolet.light} : {};
    return(    
        <Container onClick={onClick}>
            <Icon style={iconActiveStyle} className="icon-menu" src={icon}></Icon>
            <Title style={titleActiveStyle} className="title-menu">{title}</Title>
        </Container>
    );
}
export default MenuItem;