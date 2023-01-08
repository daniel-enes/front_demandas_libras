import { postApi, updateAPI } from '../../funcoes/formulario.js';
import {toogleLoading} from "../../funcoes/efeitos.js"

// Hooks do React
import { useState } from 'react';

// Componentes para compor o formulário
import Orientacao from "../form/Orientacao";
import Input from "../form/Input"
import Select from "../form/Select";
import Button from "../form/Button";
import Loading from '../layot/Loading.jsx';

function Responsavel ({dadosResponsavel, responsavelCPF, setIdResponsavel}) {

    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [dados, setDados] = useState(dadosResponsavel ? dadosResponsavel.data.attributes : {})
    //const [id, setId] = useState(false) 

    /*
    * Função handleChange
    * Função de manipulação dos dados advindos do formulário
    * @campo = recebe o campo do formulário que terá suas propridades name e value acessadas
    */
    const handleChange = (campo) => {
        const nome = campo.name
        const valor = campo.value
        setDados({ ...dados , [nome] : valor})
    }

    // dados: estrutura de dados a ser enviado par ao backend
    const responsavel = {
        data: {
            types: "responsaveis",
            attributes: {
                nome: dados.nome,
                telefone: dados.telefone,
                email: dados.email,
                ocupacao: dados.ocupacao,
                registro: dados.registro,
                cpf: responsavelCPF ? responsavelCPF : dados.cpf
            }
        }
    }
    if(dadosResponsavel) {
        responsavel.data.id = dadosResponsavel.data.id
    }

    /*
    * Função de envio de formulário
    */
    const submit = (e) => {
        e.preventDefault()
        toogleLoading(true)
        if(responsavelCPF) {
        postApi(setIdResponsavel, responsavel, "/responsaveis")

        }
        if(responsavel.data.id) {
            updateAPI(responsavel, "/responsaveis/"+ responsavel.data.id)
            setIdResponsavel(responsavel.data.id)
        }
    }

    return(
        <>
            <Loading />
            <Orientacao />
            <h1 tabIndex="0">Responsável</h1>
            <div className="container_form">
                <form onSubmit={(e) => submit(e)}>
                    {!dadosResponsavel &&   
                        <Input
                        label="Nome"
                        descricao=""
                        idDescricao=""
                        type="text"
                        name="nome"
                        id="nome"
                        maxlength="150"
                        required={true}
                        handleChange={handleChange}
                        />
                    }
                <Input
                label="Telefone"
                descricao="Apenas  dígitos numéricos. Os dois primeiros dígitos devem ser o código de área seguido
                pelo número de telefone.  Exemplo: 21988222594."
                idDescricao="desc_telefone"
                type="number"
                name="telefone"
                id="telefone"
                maxlength="11"
                required={true}
                value={dados.telefone ? dados.telefone : '' }
                handleChange={handleChange}
                />

                <Input
                label="Email"
                descricao=""
                idDescricao=""
                type="email"
                name="email"
                id="email"
                maxlength="150"
                required={true}
                value={dados.email ? dados.email : ''}
                handleChange={handleChange}
                />

                <Select
                label="Ocupação"
                descricao=''
                idDescricao=""
                type=""
                name="ocupacao"
                id="ocupacao"
                required={true}
                value={dados.ocupacao ? dados.ocupacao : ''}
                valores={['estudante', 'técnico', 'docente']}
                handleChange={handleChange}
                />

                <Input
                label="Siape ou DRE"
                descricao='Apenas dígitos numéricos. Digite seu Siape caso no campo anterior tenha selecionado
                “docente” ou "técnico"; ou o DRE caso seja "estudante".'
                idDescricao="desc_registro"
                type="number"
                name="registro"
                id="registro"
                maxlength="9"
                required={false}
                value={dados.registro ? dados.registro : ''}
                handleChange={handleChange}
                />
                <Button />
                </form>
            </div>
        </>
    ) 
}

export default Responsavel