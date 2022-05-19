import Styled from 'styled-components';

export const Icon = Styled.img`
    filter: invert(99%) sepia(3%) saturate(0%) hue-rotate(244deg) brightness(113%) contrast(100%);;
`;

export const Title = Styled.title`
    display: flex;
    justify-content: center;

    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    font-family: Roboto;
    text-align: center;
    color: white;
`;
export const Container = Styled.div`
    width: 100%;
    margin-bottom: 24px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;