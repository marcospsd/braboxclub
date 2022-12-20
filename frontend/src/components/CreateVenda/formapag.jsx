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
import { Container, Bloco, Row } from './styles'


const FormPag = () => {
    const [forma, setForma] = useState("DH")
    const [parcela, setParcela]= useState(1)
    const [valor, setValor] = useState(0)

    return (
        <Container>
            <h1>Forma de Pagamento</h1>
            <Row>
                <Bloco>
                    <p>Total Venda</p>
                    <p>R$ 500,00</p>
                </Bloco>
                <Bloco>
                    <p>Saldo a Receber</p>
                    <p>R$ 500,00</p>
                </Bloco>
                <Bloco>
                    <p>Quantidade de Prod.</p>
                    <p>5</p>
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
                <IconButton>
                    <AddCardIcon/>
                </IconButton> 
            </Row>

            
        </Container>
    )
}

export default FormPag