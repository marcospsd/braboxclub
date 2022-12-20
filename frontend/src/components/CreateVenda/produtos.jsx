import React, { useState } from 'react'
import { Container, Row } from './styles'
import { api } from '../../services/api'
import { IconButton, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import PercentIcon from '@mui/icons-material/Percent';


const Produtos = () => {
    const [ keyautocomplete, setKeyAutocomplete] = useState(false)
    const [ pesquisa, setPesquisa] = useState("")
    const [ resultado, setResultado] = useState([])
    const [ data, setData ] = useState({ codigo: "", valor_venda: 0, valor_produto: 0, descricao: "", desconto: 0}) 

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
                    setData({...data, valor_venda: Math.round((data.valor_produto*produto))})
                } catch { 
                    setData({...data, valor_venda: 0, desconto: 0})
                }
        }
        }
    
        const ValuetoDesc = (id) => {
            if (id !== "") {
                try {
                const porcento = (1 - (data.valor_venda / data.valor_produto )) * 100
                setData({...data, desconto: Math.round(porcento)})
                } catch {
                setData({...data, valor_venda: 0, desconto: 0})
            }
        }
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
                                setData({
                                    codigo: newResultado.codigo,
                                    valor_produto: newResultado.valor_venda,
                                    valor_venda: newResultado.valor_venda,
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
                    <IconButton>
                        <AddIcon/>
                    </IconButton>
            </Row>
            
            <Row>
                <TextField value={data.descricao} label='Descricão' size="small" disabled/>
                <TextField value={parseInt(data.valor_produto)} label="Valor do Sistema" size="small" disabled
                                        InputProps={{
                                            startAdornment: (
                                                    <InputAdornment sx={{ paddingRight: '3px'}}>R$ </InputAdornment>
                                            )}}
                />
            </Row>
            <Row>
                <TextField value={data.desconto} onBlur={(e) => DesctoValue(e.target.value)} size="small" label="Desconto"
                    onChange={(e) => setData({...data, desconto: e.target.value})}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                            <PercentIcon />
                            </InputAdornment>
                        )}}
                />
                <TextField value={parseInt(data.valor_venda)} label="Valor da Venda" size="small" 
                            onChange={(e) => setData({...data, valor_venda: e.target.value})}
                                        onBlur={(e) => ValuetoDesc(e.target.value)} 
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment sx={{ paddingRight: '3px'}}>R$ </InputAdornment>
                                            )}}
                />
            </Row>
            <hr/>
        </Container>
    )
}

export default Produtos