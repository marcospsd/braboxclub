import React from 'react'
import { Container, ContainerLogin } from './styles'
import { Button, TextField } from '@mui/material'


const LoginPage = () => {
    
    
    return (
        <Container>
            <ContainerLogin>
                <h1>Painel Administrativo</h1><br/>
                <TextField variant='outlined'/><br/>
                <TextField variant='outlined'/><br/>
                <Button variant='contained' color='black'>Entrar</Button>
            </ContainerLogin>
        </Container>
    )
}

export default LoginPage