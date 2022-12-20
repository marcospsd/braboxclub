import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCardIcon from '@mui/icons-material/AddCard';
import FormControl from '@mui/material/FormControl';
import CardFormaPag from '../CardFormaPag'
import { Container, Bloco, Row } from './styles'
import { FormatReal } from '../Functions';


const FormPag = ({ data, setData }) => {
    const [forma, setForma] = useState("DH")
    const [parcela, setParcela]= useState(1)
    const [valor, setValor] = useState(0)
    const quantidadevendas = data.corpovenda ? data.corpovenda.map(x => x).length : 0
    const total_venda = data.corpovenda ? data.corpovenda.map(x => x.valor_venda).reduce((a, b) => parseInt(a) + parseInt(b), 0) : 0
    // const saldo = data.corpovenda ? (data.corpovenda.map(x => x.valor_venda).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - (data.formpag.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)) : 0

    console.log(data)
    const AddCard = () => {
        return
    }

    const deleteCard = () => {
        return
    }
    return (
        <Container>
            <h1>Forma de Pagamento</h1>
            <Row>
                <Bloco>
                    <p>Total Venda</p>
                    <p>{FormatReal(total_venda)}</p>
                </Bloco>
                <Bloco>
                    <p>Saldo a Receber</p>
                    <p>{FormatReal(total_venda)}</p>
                </Bloco>
                <Bloco>
                    <p>Quantidade de Prod.</p>
                    <p>{quantidadevendas}</p>
                </Bloco>
            </Row>
            <br/>
            <FormControl sx={{ width: '90%'}}>
            <InputLabel id="forma1">Forma de Pagamento</InputLabel>
                <Select
                labelId="forma1"
                size="small"
                id="demo-simple-select"
                label="Forma de Pagamento"
                value={forma}
                onChange={(e) => {
                    setParcela(1)
                    setForma(e.target.value)
                }}
                >
                    <MenuItem value="DH">Dinheiro</MenuItem>
                    <MenuItem value="CC">Cartão de Crédito</MenuItem>
                    <MenuItem value="CD">Cartão de Débito</MenuItem>
                    <MenuItem value="DP">PIX</MenuItem>
                    <MenuItem value="FI">Financiado</MenuItem>
                </Select>
                </FormControl>
            <Row>
                <FormControl sx={{ width: '90%', m: 1}}>
                        <InputLabel id="Label1">Parcelas</InputLabel>
                        <Select
                        labelId="Label1"
                        size="small"
                        id="demo-simple-select"
                        value={parcela}
                        label= "Parcelas"
                        onChange={(e) => {
                            setParcela(e.target.value)
                        }}
                        >
                            
                            <MenuItem value="1">1</MenuItem>
                            
                            { forma === 'CC' || forma === 'FI' ?  <MenuItem value="2">2</MenuItem> : null}
                            { forma === 'CC' || forma === 'FI' ? <MenuItem value="3">3</MenuItem> : null}
                            { forma === 'CC' || forma === 'FI' ? <MenuItem value="4">4</MenuItem> : null}
                            { forma === 'CC' || forma === 'FI' ? <MenuItem value="5">5</MenuItem> : null}
                            { forma === 'CC' || forma === 'FI' ? <MenuItem value="6">6</MenuItem> : null}
                        
                        </Select>
                    </FormControl>
                <TextField label="Valor" size="small" value={valor} onChange={(e) => setValor(e.target.value)}/>  
                <IconButton onClick={() => AddCard()}>
                    <AddCardIcon/>
                </IconButton> 
            </Row>
            <hr/>
            { data?.formapag && 
                data.formapag.map((res) => (
                    <CardFormaPag card={res} deleteCard={deleteCard} />
                ))
            }
                
            
        </Container>
    )
}

export default FormPag