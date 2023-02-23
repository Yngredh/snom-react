import Styled from 'styled-components';

export const Title = Styled.p`
    display: flex;
    justify-content: center;
    
    font-size: ${props => props.theme.typography.auxiliarText.size};
    font-weight: ${props => props.theme.typography.auxiliarText.weight};
    font-style: normal;
    font-family: ${props => props.theme.typography.fontFamily};
    text-align: center;
    color: white;
`;

export const Icon = Styled.img`
    filter: invert(99%) sepia(3%) saturate(0%) hue-rotate(244deg) brightness(113%) contrast(100%);
    width: 40px;
    height: 40px;
`;

export const Container = Styled.div`
    width: 90%;
    margin-bottom: 24px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    
    &:hover {
        ${Title} {
            cursor: pointer;
            color: ${props => props.theme.pallete.blueViolet.light};
        }

        ${Icon} {
            cursor: pointer;
            filter: invert(66%) sepia(86%) saturate(2248%) hue-rotate(198deg) brightness(99%) contrast(85%);
        }
    }

`;

