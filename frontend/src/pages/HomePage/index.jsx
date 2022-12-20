import React, { useContext, useState } from 'react'
import { ContainerHome, Container } from './styles'
import { AuthContext } from '../../contexts/auth'
import HeaderPrincipal from '../../components/MenuInicial'
import VendasViewList from '../../components/ListVendas'
import CreateVenda from '../../components/CreateVenda'


const HomePage = () => {
    const { user } = useContext(AuthContext)
    const [page, setPage] = useState(0)

    if (!user) {
        return <p>Carregando ...</p>
    }

    const Page = () => {
        switch (page) {
            case 0: 
                return <p>Primeira Pagina</p>
            case 1:
                return <CreateVenda/>
        }

    }

    return (
        <Container>
            <ContainerHome>
                <HeaderPrincipal name={user.first_name} page={page} setPage={setPage}/>
                <hr/>
                {Page()}
            </ContainerHome>
        </Container>
        )
}

export default HomePage