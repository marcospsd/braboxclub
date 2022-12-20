import { IconButton } from '@mui/material';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { FormatFormaPag } from '../Functions';
import { Container, Row } from './styles';


const CardFormaPag = ({ card, deleteCard }) => {
    


    return (
        <Container>
            <IconButton id='closebutton' onClick={() => deleteCard(card.key)}>
                <DeleteIcon/>
            </IconButton>
            <Row>
                <p><b>Forma:</b></p>
                <p>{FormatFormaPag(card.forma)}</p>
            </Row>
            <Row>
                <p><b>Valor:</b></p>
                <p>{card.valor}</p>
            </Row>
            <Row>
                <p><b>Parcelas:</b></p>
                <p>{card.parcela}</p>
            </Row>
        </Container>
    )
}

export default CardFormaPag;