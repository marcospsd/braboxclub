import React, { useState } from 'react'
import { DataGrid, ptBR } from '@mui/x-data-grid';
import {Button} from '@mui/material'
import { useAxios } from '../../services/api';
import {FormatReal, FormatTel} from '../Functions'
import { BigContainer, Container, Bloco, Painel } from './styles'

 
const columns = [
  { field: 'id', headerName: 'Ordem', width: 80 },
  { field: 'cliente', headerName: 'Cliente', width: 80 },
  { field: 'clientedadosNome', headerName: 'Nome Completo', width: 250, 
      valueGetter: (params) => { return params.getValue(params.id, "clientedados").nome}
  },
  { field: 'valor_total', headerName: 'Total da Venda', width: 150,
      valueGetter: (params) => {return FormatReal(params.row.valor_total)}
  },
  { field: 'emissao', headerName: 'Emissão', width: 150 },
  { field: 'clientedadosTel', headerName: 'Telefone', width: 150,
      valueGetter: (params) => { return FormatTel(params.getValue(params.id, "clientedados").celular)}
},
];


const VendasViewList = () => {
    const { data } = useAxios('/vendas/vendas')
    const [ row, setRow ] = useState({})

    console.log(row)
    return (
        <BigContainer>
          <DataGrid initialState={{ pagination: { pageSize: 20 }}}
                    loading={data ? false : true}
                    style={{ width: '100%'}} 
                    rows={data ? data : []} 
                    columns={columns} 
                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                    getRowId={row => row.id}
                    onSelectionModelChange={itm => setRow(itm[0])}
                    />
          <Container>
            <Painel>
              <Bloco>
                <b>Faturamento</b>
                <b>R$ 500,00</b>
              </Bloco>
              <Bloco>
                <b>Quantidade de Vendas</b>
                <b>50</b>
              </Bloco>
            </Painel>
            <hr/>
          </Container>
        </BigContainer>
    )
}

export default VendasViewList