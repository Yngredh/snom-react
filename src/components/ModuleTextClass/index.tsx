import parse from 'html-react-parser';
import { ETypographType, Typograph } from "../Typograph"
import { ModuleTextContainer } from "./styles";


export const ModuleTextClass = () => {
    const string = `<h3 style="text-align: justify;">Benef&iacute;cios da Padroniza&ccedil;&atilde;o do c&oacute;digo</h3>
    <p style="text-align: justify;">Em resumo, a padroniza&ccedil;&atilde;o do c&oacute;digo &eacute; importante porque ajuda a garantir que o c&oacute;digo seja consistente, leg&iacute;vel, f&aacute;cil de manter, economiza tempo, reduz erros e melhora a comunica&ccedil;&atilde;o entre os desenvolvedores.</p>
    <ol style="text-align: justify;">
    <li><strong>Consist&ecirc;ncia</strong>: Quando todos os desenvolvedores seguem um padr&atilde;o comum, o c&oacute;digo se torna mais consistente e leg&iacute;vel. Isso torna mais f&aacute;cil para outros desenvolvedores lerem, entenderem e trabalharem com o c&oacute;digo.</li>
    <li><strong>Facilidade de manuten&ccedil;&atilde;o</strong>: Quando o c&oacute;digo &eacute; padronizado, ele se torna mais f&aacute;cil de ser mantido. Se um desenvolvedor precisar alterar o c&oacute;digo, ele saber&aacute; exatamente onde encontrar as informa&ccedil;&otilde;es que precisa.</li>
    <li><strong>Economia de tempo</strong>: A padroniza&ccedil;&atilde;o do c&oacute;digo economiza tempo. Se todos os desenvolvedores seguem as mesmas regras de codifica&ccedil;&atilde;o, n&atilde;o ser&aacute; necess&aacute;rio gastar tempo revisando o c&oacute;digo para garantir que ele esteja seguindo as pr&aacute;ticas recomendadas.</li>
    <li><strong>Redu&ccedil;&atilde;o de erros</strong>: Quando o c&oacute;digo &eacute; padronizado, h&aacute; menos chances de erros. Se todos os desenvolvedores seguem as mesmas regras de codifica&ccedil;&atilde;o, &eacute; menos prov&aacute;vel que cometam erros comuns que podem levar a bugs.</li>
    <li><strong>Melhor comunica&ccedil;&atilde;o</strong>: A padroniza&ccedil;&atilde;o do c&oacute;digo ajuda na comunica&ccedil;&atilde;o entre os desenvolvedores. Se todos seguem as mesmas regras, &eacute; mais f&aacute;cil para um desenvolvedor entender o que outro quis dizer com seu c&oacute;digo.</li>
    </ol>
    `

    const TextElement = parse(string);

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