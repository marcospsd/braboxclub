import React, {useState} from 'react'
import Cliente from './cliente'
import Produtos from './produtos'
import FormPag from './formapag'
import { BigConteiner } from './styles'


const state = {
        corpovenda: [],
        formapag: [],
        clientedados: {
            id: "",
            nome: "",
            apelido: "",
            cpf: "",
            celular: "",
            email: "",
            cep: "",
            rua: "",
            bairro: "",
            cidade: "",
            estado: ""
        },
        valor_total: "",
        cliente: ""

}


const CreateVenda = () => {
    const [data, setData] = useState(state)


    return (
        <BigConteiner>
            <Cliente data={data} setData={setData}/><br/>
            <Produtos data={data} setData={setData}/><br/>
            <FormPag data={data} setData={setData} stateinit={state}/> 
        </BigConteiner>
    )
}

export default CreateVenda