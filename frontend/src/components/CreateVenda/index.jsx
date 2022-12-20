import React, {useState} from 'react'
import Cadastro from './cadastro'
import Produtos from './produtos'
import FormPag from './formapag'
import { BigConteiner } from './styles'


const state = {
        id: 1,
        corpovenda: [],
        formapag: [],
        clientedados: {
            id: "",
            nome: "",
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
            <Cadastro state={data} setState={setData}/>
            <Produtos state={data} setState={setData}/>
            <FormPag state={data} setState={setData}/> 
        </BigConteiner>
    )
}

export default CreateVenda