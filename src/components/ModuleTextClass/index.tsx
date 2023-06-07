import parse from 'html-react-parser';
import { ETypographType, Typograph } from "../Typograph"
import { ModuleTextContainer } from "./styles";

export interface IModuleTextClass {
    content?: string;
}

export const ModuleTextClass = (props : IModuleTextClass) => {
    const TextElement = props.content ? parse(props.content) : undefined;

    return(
        <ModuleTextContainer >
            <Typograph
             style={{marginRight: '2%', marginLeft: '2%'}}
             type={ETypographType.LightText}>
                {TextElement}
            </Typograph>
        </ModuleTextContainer>
    )
}