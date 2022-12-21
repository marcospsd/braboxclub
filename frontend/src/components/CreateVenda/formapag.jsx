import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AlertText from '../Alerts'
import Select from '@mui/material/Select';
import IconButton  from '@mui/material/IconButton';
import AddCardIcon from '@mui/icons-material/AddCard';
import FormControl from '@mui/material/FormControl';
import { Container, Bloco, Row } from './styles'
import { FormatReal } from '../Functions';
import ListFormPag from '../ListFormPag';
import { Button } from '@mui/material';
import { api } from '../../services/api';



const FormPag = ({ data, setData, stateinit }) => {
    const [disablebutton, setDisableButton] = useState(false)
    const [alert, setAlert] = useState({open: false, texto: "", tipoalert: "warning"})
    const [forma, setForma] = useState("DH")
    const [parcela, setParcela]= useState(1)
    const [valor, setValor] = useState(0)
    const [key, setKey] = useState(1)
    const quantidadevendas = data.corpovenda ? data.corpovenda.map(x => x).length : 0
    const total_venda = data.corpovenda ? data.corpovenda.map(x => x.valor_final).reduce((a, b) => parseInt(a) + parseInt(b), 0) : 0
    const saldo = data.corpovenda ? (data.corpovenda.map(x => x.valor_final).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - (data.formapag ? data.formapag.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0) : 0) : 0

    const AddCard = () => {
        if (valor > 0){
        setData({...data, valor_total: total_venda, formapag: [...data.formapag, {
            formapag: forma,
            parcelas: parcela,
            valor: valor,
            id: key
        }]})
        setKey(key+1)
        setForma("DH")
        setParcela(1)
        setValor(0)
    } else {
        setAlert({open: true, texto: 'o Valor de pagamento não pode ser zerado', tipoalert: "warning"})
    }
}

    const deleteCard = (id) => {
        const NewData = data.formapag.filter((res) => res.id != id)
        setData({...data, formapag: NewData})
    }


    return (
        <Container>
            <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open})} />
            <h1>Forma de Pagamento</h1>
            <Row>
                <Bloco>
                    <p>Total Venda</p>
                    <p>{FormatReal(total_venda)}</p>
                </Bloco>
                <Bloco>
                    <p>Saldo a Receber</p>
                    <p>{FormatReal(saldo)}</p>
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
                <ListFormPag data={data.formapag} deleteCard={deleteCard}/>
            }
                
            <br/>
            <Button variant='contained' disabled={disablebutton} onClick={() => {
                if(saldo > 0) return setAlert({...alert, open: true, texto: "Falta saldo para finalização do pagameto"})
                if(saldo < 0) return setAlert({...alert, open: true, texto: "Forma de pagamento maior que o valor total da venda, favor verificar."})
                setDisableButton(true)
                api.post('/vendas/vendas/', data)
                .then((res) => {
                    setAlert({open: true, tipoalert: 'success', texto: `Venda gerada com sucesso, OS: ${res.id}`})
                    setData(stateinit)
                })
                .catch((err) => {
                    setAlert({open: true, tipoalert: 'warning', texto: JSON.stringify(err.response.data)})
                })
                .finally((x) => {
                    setDisableButton(false)
                })
                

            }}>Gerar Venda</Button>
        </Container>
    )
}

export default FormPag