import React, { useState } from 'react'
import Cadastro from './cadastro'
import EditCadastro from './editcadastro';
import { CardCliente, Container, Row } from './styles';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton, TextField } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import { api } from '../../services/api';




const Cliente = ({data, setData}) => {
    const [keyautocomplete, setKeyAutocomplete] = useState(false)
    const [resultado, setResultado] = useState([])
    const [pesquisa, setPesquisa] = useState("")
    const [opencreate, setOpenCreate] = useState(false)
    const [openedit, setOpenEdit] = useState(false)

    const BuscarCliente = (ndata) => {
        api.get(`/clientes/clientes/`)
        .then((res)=>{
            setResultado(res.data)
        })
    }


    return (
        <Container>
            <h1>Cliente</h1>
            <Autocomplete
                        sx={{ width: '100%'}}
                        disablePortal
                        size="small"
                        id="combo-box-demo"
                        key={keyautocomplete}
                        getOptionLabel={(resultados) => `${resultados.id} | ${resultados.nome} - ${resultados.apelido}`}
                        onChange = {(resultado, newResultado) => {
                            if (newResultado) {
                                setData({
                                    ...data,
                                    clientedados: newResultado,
                                    cliente: newResultado.id
                                })
                                setResultado([])
                                setPesquisa("")
                                setKeyAutocomplete(true)
                            }
                            else { setPesquisa("") }
                            
                        }}
                        
                        options={resultado}
                        renderInput={(params) => <TextField {...params} label="Pesquise o nome do Cliente" onChange={(e) => BuscarCliente(e.target.value)} value={pesquisa}/>}
                        />
                    <Row>
                        <IconButton onClick={() => setOpenCreate(!opencreate)}>
                            <PersonAddIcon/>
                        </IconButton>
                        {opencreate && <Cadastro opencreate={opencreate} setOpenCreate={setOpenCreate} state={data} setState={setData} />}
                        {data.clientedados.nome && 
                        <IconButton onClick={() => setOpenEdit(!openedit)}>
                            <EditIcon/>
                        </IconButton>
                        }
                        {openedit && <EditCadastro opencreate={openedit} setOpenCreate={setOpenEdit} state={data} setState={setData} />}
                    </Row>
                    {
                        data.clientedados.nome && 
                            <CardCliente>
                                <Row>
                                    <p><b>Nome:</b></p>
                                    <p> {data?.clientedados.nome}</p>
                                </Row>
                                <Row>
                                    <p><b>Apelido:</b></p>
                                    <p>{data?.clientedados.apelido}</p>
                                </Row>
                                <Row>
                                    <p><b>Telefone:</b></p>
                                    <p>{data?.clientedados.telefone ? data.clientedados.telefone : "Não possui"}</p>
                                </Row>
                            </CardCliente>
                    }
                    <br/>
        </Container>
        )
}


export default Cliente;