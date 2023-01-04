//Arquivo de configuração
import { postApi } from '../../funcoes/formulario.js';

// Hooks do React
import { useState } from 'react';

// Componentes para compor o formulário
import Orientacao from "../form/Orientacao";
import Input from "../form/Input"
import Select from "../form/Select";
import Button from "../form/Button";

function Responsavel ({dadosResponsavel, responsavelCPF}) {

    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [dados, setDados] = useState({})

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
                cpf: dados.cpf
            }
        }
    }

    /*
    * Função de envio de formulário
    */
    const submit = (e) => {
        e.preventDefault()
        if(responsavelCPF) {
            postApi(responsavel, "/responsaveis")
        }
    }

    return(
        <>
            <Orientacao />
            <h1 tabIndex="0">Responsável</h1>
            <div className="container_form">
                <form onSubmit={(e) => submit(e)}>
                <Input
                label="Nome"
                descricao=""
                idDescricao=""
                type="text"
                name="nome"
                id="nome"
                maxlength="150"
                required={true}
                value={dadosResponsavel ? dadosResponsavel.data.attributes.nome : ''}
                handleChange={handleChange}
                />
                <Input
                label="Telefone"
                descricao="Apenas  dígitos numéricos. Os dois primeiros dígitos devem ser o código de área seguido
                pelo número de telefone.  Exemplo: 21988222594."
                idDescricao="desc_telefone"
                type="tel"
                name="telefone"
                id="telefone"
                maxlength="11"
                required={true}
                value={dadosResponsavel ? dadosResponsavel.data.attributes.telefone : ''}
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
                value={dadosResponsavel ? dadosResponsavel.data.attributes.email : ''}
                handleChange={handleChange}
                />

                Falta fazer as opções
                <Select
                label="Ocupação"
                descricao=''
                idDescricao=""
                type=""
                name="ocupacao"
                id="ocupacao"
                required={true}
                value={dadosResponsavel ? dadosResponsavel.data.attributes.ocupacao : ''}
                handleChange={handleChange}
                />

                <Input
                label="Siape ou DRE"
                descricao='Apenas dígitos numéricos. Digite seu Siape caso no campo anterior tenha selecionado
                “docente” ou "técnico"; ou o DRE caso seja "estudante".'
                idDescricao="desc_registro"
                type="text"
                name="registro"
                id="registro"
                maxlength="9"
                required={false}
                value={dadosResponsavel ? dadosResponsavel.data.attributes.registro : ''}
                handleChange={handleChange}
                />

                <Input
                label="CPF"
                descricao="Apenas dígitos numéricos, sem pontos e traço. "
                idDescricao="desc_cpf"
                type="text"
                name="cpf"
                id="cpf"
                maxlength="11"
                required={true}
                value={responsavelCPF ? responsavelCPF : dadosResponsavel.data.attributes.cpf}
                disabled={true}
                handleChange={handleChange}
                />

                <Button />
                </form>
            </div>
        </>
    ) 
}

export default Responsavel