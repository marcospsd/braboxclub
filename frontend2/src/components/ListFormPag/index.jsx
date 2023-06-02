import { IconButton } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from './styles'


import { FormatFormaPag, FormatReal } from '../Functions';

const ListFormPag = ({ data, deleteCard}) => {


    return (
        <Container>
            <table>
                <tbody>
                    <tr>
                        <td><strong>Forma Pag.</strong></td>
                        <td><strong>Parc.</strong></td>
                        <td><strong>Valor</strong></td>
                        <td><strong>Delete</strong></td>
                    </tr>
                { data.map((forma) => (
                    <tr key={forma.id}>
                        <td className='formaconteudo' >{FormatFormaPag(forma.formapag)}</td>
                        <td className='formaconteudo' >{forma.parcelas}</td>
                        <td className='formaconteudo' >{FormatReal(forma.valor)}</td>
                        <td className='formaconteudo'><IconButton id='delete' onClick={() => deleteCard(forma.id)}><DeleteIcon/></IconButton></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}

export default ListFormPag