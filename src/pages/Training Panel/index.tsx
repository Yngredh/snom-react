import { useState } from 'react';
import { BackgroundContainer, TopSideContainer, InputContainer } from './styles'
import { theme } from "../../themes/theme";

import { ETypographType, Typograph } from '../../components/Typograph';
import { TrainingGridView } from '../../components/TrainingGridView';
import { DivLine } from '../../components/DivLine';
import { Input } from '../../components/Input';

export const TrainingPanel = () => {

    const [valueField, setValueField] = useState(0);

    return(
        <>
            <BackgroundContainer style={{backgroundImage: 'url("img/background/simpleBackgroundFrame.svg")'
            , backgroundSize: 'cover'}}>
                <TopSideContainer>
                    <Typograph
                        style={{marginLeft: '4%'}}
                        type={ETypographType.PageTitle}>
                            Painel de Treinamento
                    </Typograph>
                    <DivLine  size="97%" color="#000000"/>
                    <InputContainer>
                        <Input 
                            icon={"img/icons/filterIcon.svg"}
                            hint={"Filtrar"}
                            width={"300px"}
                            isPassword={false}
                            style={{marginRight: '2%', color: '#000'}}
                            borderColor={theme.pallete.assistant.black}
                            onChange={e => setValueField(valueField)}/>
                        <Input 
                            icon={"img/icons/searchIcon.svg"}
                            hint={"Pesquisar"}
                            width={"500px"}
                            isPassword={false}
                            borderColor={theme.pallete.assistant.black}
                            onChange={e => setValueField(valueField)}/>
                    </InputContainer>
                </TopSideContainer>
                <TrainingGridView></TrainingGridView>
            </BackgroundContainer>
        </>
    )
}