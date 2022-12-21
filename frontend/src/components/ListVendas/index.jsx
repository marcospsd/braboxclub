import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useAxios } from '../../services/api';
import {FormatReal, FormatTel} from '../Functions'
import { BigConteiner } from './styles'

 
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


    return (
        <BigConteiner>
        
        { data && 
          <DataGrid rows={data} columns={columns} />
        }
        </BigConteiner>
    )
}

export default VendasViewList