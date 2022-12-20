import React, { useState, useContext } from 'react'
import { Container, ContainerLogin, ImgLogo, Helper } from './styles'
import { Button, IconButton, TextField } from '@mui/material'
import IMGBrabox from '../../assets/brabox.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import AlertText from '../../components/Alerts'
import { AuthContext } from '../../contexts/auth'

const schema = yup.object({
    username: yup.string().required("Usuário não informado"),
    password: yup.string().required("Senha não informada")
})



const LoginPage = () => {
    const { login } = useContext(AuthContext)
    const [viewpass, setViewPass] = useState(false)
    const { control, handleSubmit,  formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: "", password: ""
        }
    })
    const [blockbutton, setBlockButton] = useState(false)
    const [ alert, setAlert ] = useState({ open: false, texto: "", tipoalert: "warning"})
    

    const Entrar = async(data) => {
        setBlockButton(true)
        const x = await login(data)
        console.log(x)
        if (x?.non_field_errors){
            setAlert({
                open: true,
                texto: x.non_field_errors[0],
                tipoalert: 'warning'
            })
            setBlockButton(false)
        }
        setBlockButton(false)
    }

    return (
        <Container>
            <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open})} />
            <ImgLogo src={IMGBrabox} />
            <form className="form" onSubmit={handleSubmit(Entrar)}>
                <ContainerLogin>
                    <h1>Painel Administrativo</h1><br/>
                        <Controller
                                    name="username"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                    <TextField 
                                        variant='outlined'
                                        label='Usuário'
                                        value={value}
                                        onChange={onChange}
                                        />
                                        )}/> { errors.username ? <Helper>{errors.username.message}</Helper> : null}
                        <br/>
                        <Controller
                                    name="password"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                    <TextField 
                                        variant='outlined'
                                        label="Senha"
                                        value={value}
                                        onChange={onChange}
                                        type={viewpass ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton onClick={() => setViewPass(!viewpass)}>
                                                    { viewpass ? <VisibilityOff/> : <Visibility/> }
                                                </IconButton>
                                            )
                                        }}
                                        />
                                        )}/> { errors.password ? <Helper>{errors.password.message}</Helper> : null}
                        <br/>
                        <Button variant='contained' onClick={handleSubmit((data) => Entrar(data))} disabled={blockbutton}>Entrar</Button>
                    </ContainerLogin>
                </form>
        </Container>
    )
}

export default LoginPage