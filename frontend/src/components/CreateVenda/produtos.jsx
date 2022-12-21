import React, { useState } from 'react'
import { Container, Row, ContainerCards } from './styles'
import { api } from '../../services/api'
import { IconButton, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import PercentIcon from '@mui/icons-material/Percent';
import CardProducts from '../CardProducts';


const stado1 = {
    codigo: "", 
    valor_final: 0, 
    valor_unit: 0, 
    descricao: "", 
    desconto: 0
}



const Produtos = ({ data, setData }) => {
    const [ keyautocomplete, setKeyAutocomplete] = useState(false)
    const [ pesquisa, setPesquisa] = useState("")
    const [ resultado, setResultado] = useState([])
    const [ state, setState ] = useState(stado1)
    const [ id, setId] = useState(1)

    const BuscarProduto = (x) => {
        setPesquisa(x)
        if (x !== "") {
            api.get(`/produtos/produtos/${x}`)
            .then((res) => {
                if (Array.isArray(res.data)){
                    setResultado(res.data) 
                } else {
                    setResultado([])
                }   
            })}}
            
        const DesctoValue = (id) => {
            if (id !== "") {
                try {
                    const porcento = id/100
                    const produto = 1-porcento
                    setState({...state, valor_final: Math.round((state.valor_unit*produto))})
                } catch { 
                    setState({...state, valor_final: 0, desconto: 0})
                }
        }
        }
    
        const ValuetoDesc = (id) => {
            if (id !== "") {
                try {
                const porcento = (1 - (state.valor_final / state.valor_unit )) * 100
                setState({...state, desconto: Math.round(porcento)})
                } catch {
                    setState({...state, valor_final: 0, desconto: 0})
            }
        }
    }


    const AddItem = () => {
        if (state.descricao) {
        setData({...data, corpovenda : [...data.corpovenda, {
                                        id: id,     
                                        produto: state.produto, 
                                        valor_final: state.valor_final, 
                                        valor_unit: state.valor_unit, 
                                        descricao: state.descricao, 
                                        desconto: state.desconto }]})
        setState(stado1)
        setKeyAutocomplete(!keyautocomplete)
        setId(id+1)
        }
    } 

    const deleteCard = (id) => {
        const newData = data.corpovenda.filter((res) => res.id !== id)
        setData({...data, corpovenda: newData})
    }


    return (
        <Container>
            <h1>Produtos</h1>
            <Row>
                <Autocomplete
                        sx={{ width: '100%'}}
                        disablePortal
                        size="small"
                        id="combo-box-demo"
                        key={keyautocomplete}
                        getOptionLabel={(resultados) => `${resultados.descricao} - R$ ${resultados.valor_venda}`}
                        onChange = {(resultado, newResultado) => {
                            if (newResultado) {
                               
                                setState({
                                    produto: newResultado.id,
                                    valor_unit: newResultado.valor_venda,
                                    valor_final: newResultado.valor_venda,
                                    descricao: newResultado.descricao
                                })
                                setResultado([])
                                setPesquisa("")
                                setKeyAutocomplete(true)
                            }
                            else { setPesquisa("") }
                            
                        }}
                        
                        options={resultado}
                        renderInput={(params) => <TextField {...params} label="Pesquise pela Descrição do Produto" onChange={(e) => BuscarProduto(e.target.value)} value={pesquisa}/>}
                        />
                    <IconButton onClick={() => AddItem()}>
                        <AddIcon/>
                    </IconButton>
            </Row>
            
            <Row>
                <TextField value={state.descricao} label='Descricão' size="small" disabled/>
                <TextField value={parseInt(state.valor_unit)} label="Valor do Sistema" size="small" disabled
                                        InputProps={{
                                            startAdornment: (
                                                    <InputAdornment sx={{ paddingRight: '3px'}}>R$ </InputAdornment>
                                            )}}
                />
            </Row>
            <Row>
                <TextField value={state.desconto ? parseInt(state.desconto) : 0} onBlur={(e) => DesctoValue(e.target.value)} size="small" label="Desconto"  type="number"
                    onChange={(e) => setState({...state, desconto: e.target.value})}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                            <PercentIcon />
                            </InputAdornment>
                        )}}
                />
                <TextField value={parseInt(state.valor_final)} label="Valor da Venda" size="small" type="number"
                            onChange={(e) => setState({...state, valor_final: e.target.value})}
                                        onBlur={(e) => ValuetoDesc(e.target.value)} 
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment sx={{ paddingRight: '3px'}}>R$ </InputAdornment>
                                            )}}
                />
            </Row>
            <hr/>
            <br/>
            <ContainerCards>
            {data.corpovenda && 
                data.corpovenda.map((res) =>(
                    <CardProducts key={res.id} card={res} deleteCard={deleteCard}/>
                ))}
            </ContainerCards>
        </Container>
    )
}

export default Produtos