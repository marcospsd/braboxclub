import React, {useState} from 'react'
import {Container, Container2, Row} from './styles'
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { api } from '../../services/api'
import { cpf as CPFValidated } from 'cpf-cnpj-validator';
import AlertText from '../Alerts'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const statecli = {
    nome: "",
    apelido: "",
    cpf: "",
    celular: "",
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: ""
}


const Cadastro = ({ state, setState, opencreate, setOpenCreate}) => {
    const [data, setData] = useState(statecli)
    const [alert, setAlert] = useState({ open: false, texto: "", tipoalert: "warning"})
    const [buttonblock, setButtonBlock] = useState(false)
    console.log(data)
    const BuscarCEP = (cep) => {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => {
            setData({...data, 
            rua: res.data.logradouro,
            bairro: res.data.bairro,
            cidade: res.data.localidade,
            estado: res.data.uf
            
            })
        })
    }

    return (
        <Modal
        open={opencreate}
        onClose={() => setOpenCreate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box id='box-modal-create-user' sx={{ textAlign: 'center'}}>
                <Container2>
                        <AlertText data={alert} close={() => setAlert({...alert, open: !alert.open})} />
                        <h1> Cadastro do Cliente </h1>
                       
                        <TextField 
                                variant='outlined'
                                label='Nome Completo'
                                value={data.nome}
                                onChange={(e) => setData({...data, nome: e.target.value})}
                                size="small"
                                />

                            <TextField 
                                variant='outlined'
                                label='Apelido'
                                value={data.apelido}
                                onChange={(e) => setData({...data, apelido: e.target.value})}
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
                                    onChange={(e) => setData({...data, celular: (e.target.value).replace(/[^0-9]/g, '')})}
                                    value={data.celular}
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
                                value={data.rua}
                                onChange={(e) => setData({...data, rua: e.target.value})}
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
                        <InputMask
                        mask="999.999.999-99"
                        onChange={ (e) => setData({...data, cpf: (e.target.value).replace(/[^0-9]/g, '')}) }
                        onBlur={() => {
                            if (!data.cpf) return 
                            if (CPFValidated.isValid(data.cpf) == false) return setAlert({...alert, open: true, texto: "CPF Inválido ou Incompleto"})
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
                        <br/>
                        <br/>
                        <Button sx={{ color: 'white', background: 'black' }} disabled={buttonblock}
                                            onClick={() => {
                                                setButtonBlock(true)
                                                api.post('/clientes/clientes/', data)
                                                .then((res) => {
                                                    setData(statecli)
                                                    setState({...state, clientedados: res.data, cliente: res.data.id})
                                                    setOpenCreate(!opencreate)
                                                })
                                                .catch((err) => {
                                                    setAlert({ texto: JSON.stringify(err.response.data), tipoalert: 'warning', open: true })
                                                })
                                                .finally((fin) => {
                                                    setButtonBlock(false)
                                                })
                                                
                                            }}
                        >Criar</Button>
                        <br/>
                </Container2>
            </Box>
        </Modal>
    )
}

export default Cadastro;