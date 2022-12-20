import React, {useState} from 'react'
import {Container, Row} from './styles'
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { api } from '../../services/api'
import { cpf as CPFValidated } from 'cpf-cnpj-validator';
import AlertText from '../Alerts'


const statecli = {
    nome: "",
    cpf: "",
    telefone: "",
    cep: "",
    endereco: "",
    bairro: "",
    cidade: "",
    estado: ""
}


const Cadastro = ({ state, setState}) => {
    const [data, setData] = useState(statecli)
    const [alert, setAlert] = useState({ open: false, texto: "", tipoalert: "warning"})
    const [cpfexists, setCPFExists] = useState(false)
    const [buttonblock, setButtonBlock] = useState(false)

    const BuscarCEP = (cep) => {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => {
            setData({...data, 
            endereco: res.data.logradouro,
            bairro: res.data.bairro,
            cidade: res.data.localidade,
            estado: res.data.uf
            
            })
        })
    }

    console.log(state)

    const BuscarCPF = () => {
        if ( data.cpf.length !== 11) {
            return setAlert({...alert, open: true, texto: "CPF Incompleto, favor verificar"})
        } else {
            api.get(`/clientes/clientes/${data.cpf}/`)
            .then((res) => {
                setData(res.data)
                setState({...state, cliente: res.data.id})
                setCPFExists(true)
            })
            .catch((error) => {
                setCPFExists(false)
                return;
            })
        }

    }

    return (
        <Container>
                <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open})} />
                <h1> Cadastro do Cliente </h1>
                <InputMask
                mask="999.999.999-99"
                onChange={ (e) => setData({...data, cpf: (e.target.value).replace(/[^0-9]/g, '')}) }
                onBlur={() => {
                    if (CPFValidated.isValid(data.cpf) == false) return setAlert({...alert, open: true, texto: "CPF Inválido ou Incompleto"})
                    else return BuscarCPF()
                }}
                value={data.cpf}
                maskChar=" "
                name="cpf"
                >
                    { () => <TextField
                    id="text-field-cpf" 
                    label="CPF" 
                    variant="outlined"
                    autoComplete='off'
                    name="cpf"
                    type="tel"
                    size="small"
                    required
                
                    /> }
                </InputMask>


                <TextField 
                        variant='outlined'
                        label='Nome Completo'
                        value={data.nome}
                        onChange={(e) => setData({...data, nome: e.target.value})}
                        size="small"
                        />
               
                <TextField 
                        variant='outlined'
                        label='E-mail'
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value})}
                        size="small"
                        />
                <Row>
                    <InputMask
                            mask="(99) 99999-9999"
                            onChange={(e) => setData({...data, telefone: e.target.value})}
                            value={data.telefone}
                            maskChar=" "
                            name="telefone"
                            >
                                { () => <TextField
                                id="text-field-telefone" 
                                label="Telefone" 
                                variant="outlined"
                                autoComplete='off'
                                size="small"
                                name="telefone"   
                                type="tel"           
                                /> }
                    </InputMask>

                    <TextField 
                            variant='outlined'
                            label='CEP'
                            value={data.cep}
                            onBlur={() => BuscarCEP(data.cep.replace(/[^0-9]/g, ''))}
                            onChange={(e) => setData({...data, cep: e.target.value})}
                            size="small"
                            />
                </Row>
                <Row>
                <TextField 
                        variant='outlined'
                        label='Endereço'
                        value={data.endereco}
                        onChange={(e) => setData({...data, endereco: e.target.value})}
                        size="small"
                        />
                
                    <TextField 
                            variant='outlined'
                            label='Bairro'
                            value={data.bairro}
                            onChange={(e) => setData({...data, bairro: e.target.value})}
                            size="small"
                            />
                </Row>
                <Row>
                    <TextField 
                            variant='outlined'
                            label='Cidade'
                            value={data.cidade}
                            onChange={(e) => setData({...data, cidade: e.target.value})}
                            size="small"
                            />

                    <TextField 
                            variant='outlined'
                            label='Estado'
                            value={data.estado}
                            onChange={(e) => setData({...data, estado: e.target.value})}
                            size="small"
                            sx={{ width: '20px'}}
                            />
                </Row>
                <br/>
                <Button sx={{ color: 'white', background: 'black' }} disabled={buttonblock}
                                    onClick={() => {
                                        setButtonBlock(true)
                                        if (cpfexists) {
                                            if( CPFValidated.isValid(data.cpf) == true){
                                                api.put(`/clientes/clientes/${data.cpf}/`, data)
                                                .then((res) => {
                                                    setCPFExists(false)
                                                    setState({...state, cliente: res.data.id})
                                                    setButtonBlock(false)
                                                })
                                                .catch((err) => {
                                                    setAlert({...alert, open: true, texto: JSON.stringify(err.response.data)})
                                                    setButtonBlock(false)
                                                })
                                            } else {
                                                setAlert({...alert, open: true, texto: "CPF Inválido ou Incompleto"})
                                                setButtonBlock(false)
                                            } 
                                        } else {
                                            if( CPFValidated.isValid(data.cpf) == true){
                                                api.post(`/clientes/clientes/`, data)
                                                .then((res) => {
                                                    setCPFExists(false)
                                                    setState({...state, cliente: res.data.id})
                                                    setButtonBlock(false)
                                                })                                    
                                                .catch((err) => {
                                                    setAlert({...alert, open: true, texto: JSON.stringify(err.response.data) })
                                                    setButtonBlock(false)
                                                })
                                            } else {
                                             setAlert({...alert, open: true, texto: "CPF Inválido ou Incompleto"})
                                             setButtonBlock(false)
                                            }  
                                        }
                                        
                                    }}
                >Atualizar</Button>
        </Container>
    
    )
}

export default Cadastro;