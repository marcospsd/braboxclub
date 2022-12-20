import { IconButton } from '@mui/material';
import React from 'react'
import {Container, Row} from './styles'
import DeleteIcon from '@mui/icons-material/Delete';
import {FormatReal} from '../Functions'

const CardProducts = ({ card, deleteCard }) => {
    


    return (
        <Container>
            <IconButton id='closebutton' onClick={() => deleteCard(card.id)}>
                <DeleteIcon/>
            </IconButton>
            <Row>
                <p><b>Codigo:</b></p>
                <p>{card.id}</p>
            </Row>
            <Row>
                <p><b>Descrição:</b></p>
                <p>{card.descricao}</p>
            </Row>
            <Row>
                <p><b>Valor:</b></p>
                <p>{FormatReal(card.valor_venda)}</p>
            </Row>
            <Row>
                <p><b>Desconto:</b></p>
                <p>{card.desconto} %</p>
            </Row>
        </Container>
    )
}

export default CardProducts;