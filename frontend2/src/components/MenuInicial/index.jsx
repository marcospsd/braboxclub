import React from 'react'
import {Container, Bloco, FunctionsPage} from './styles'
import IMGLogo from '../../assets/brabin.png'
import { IconButton } from '@mui/material'


import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import InventoryIcon from '@mui/icons-material/Inventory';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

const HeaderPrincipal = ({ name, page, setPage }) => {

    return (
        <Container>
            <img src={IMGLogo} onClick={() => setPage(0)}/>
            {/* <Bloco>
                <p>Operador:</p>
                <p>{name}</p>
            </Bloco> */}
            <FunctionsPage>
                <IconButton onClick={() => setPage(1)}>
                    <AddShoppingCartIcon sx={{ fontSize: 40, color: 'white' }}/>
                    <p>Vender</p>
                </IconButton>
                <IconButton onClick={() => setPage(2)}>
                    <ShoppingCartCheckoutIcon sx={{ fontSize: 40, color: 'white' }}/>
                    <p>Listar Vendas</p>
                </IconButton>
                <IconButton onClick={() => setPage(3)}>
                    <InventoryIcon sx={{ fontSize: 40, color: 'white' }}/>
                    <p>Produtos</p>
                </IconButton>
                <IconButton onClick={() => setPage(4)}>
                    <PriceCheckIcon sx={{ fontSize: 40, color: 'white' }}/>
                    <p>Recebimentos</p>
                </IconButton>
            </FunctionsPage>
        </Container>
    )
}

export default HeaderPrincipal