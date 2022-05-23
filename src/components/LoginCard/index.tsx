import { TitleAuxiliar, TextAuxiliar } from './styles';
import { theme } from "../../themes/theme"
import { Card } from '../Card'
import { Input } from '../Input'
import { Button, EButton } from '../Button';
import { ETypograghType, Typograph } from '../Typograph';



export const LoginCard = () => {
    
    const onChangeEmail = () => {
        console.log("implement onChangeEmail here!")
    }

    const onChangePassword = () => {
        console.log("implement onChangePassword here!")
    }
    
    return(
        <>
            <Card 
                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2% 1% 2% 1%'}}

                width='480px' 
                height='500px' 
                borderColor={theme.pallete.blue.main} 
                borderWidth='3px'
                backgroundColor='linear-gradient(180deg, #DBE5FB 0%, #9FBAF3 100%)'
            >
                <TitleAuxiliar>
                    <Typograph style={{textAlign: 'start'}} type={ETypograghType.MainTitle}>CRIAR USUÁRIO</Typograph>
                </TitleAuxiliar>

                <TextAuxiliar>
                    <Typograph type={ETypograghType.AuxiliarText}>
                        Lembre-se que essa senha será temporária, o usuário poderá alterá-la mais tarde.
                    </Typograph>
                </TextAuxiliar>  

                <Input hint='Email' isPassword={false} width='80%' onChange={onChangeEmail}></Input>
                <Input hint='Senha' isPassword={true} width='80%' onChange={onChangePassword}></Input>
                <Input hint='Confirmar senha' isPassword={true} width='80%' onChange={onChangePassword}></Input>

                <Button style={{marginTop: '7.5%'}} width='50%' type={EButton.MainButton}>CRIAR USUÁRIO</Button>
            </Card>
        </>
    )
}