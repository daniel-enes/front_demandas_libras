import { postApi, updateAPI } from '../../funcoes/formulario.js';
import { toogleLoading, toFocus, show } from '../../funcoes/efeitos.js'

// Importa estrutura de dados com a tradução das mensagens de erro na validação dos dados
import { dicionarioValidacao } from '../../validacao_formulario/dicionarioValidacao.js'

// Importa estrutura de dados com os requisitos para validação dos dados do responsável
import { validacaoResponsavel } from '../../validacao_formulario/validacao/validacaoResponsavel.js'

// Importa a função que constrói as mensagens de erros da validação do formulário
import { errosValidacao } from '../../validacao_formulario/errosValidacao.js'

// Importa estrutura de dados contendo o nome do campo de formulário e respectivo rótulo
import { rotulosResponsavel } from '../../validacao_formulario/rotulos/rotulosResponsavel.js'

// Pacote de terceiro para validar os dados advindos do formulário
import Schema from 'async-validator'

// Hooks do React
import { useState } from 'react';

// Componentes para compor o formulário
import Orientacao from "../form/Orientacao";
import Input from "../form/Input"
import Select from "../form/Select";
import Button from "../form/Button";

// Componentes de layot
import Loading from '../layot/Loading.jsx';
import ErroContainer from '../layot/ErroContainer.jsx'

function FormularioResponsavel ({dadosResponsavel, responsavelCPF, setIdResponsavel}) {

    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [dados, setDados] = useState(dadosResponsavel ? dadosResponsavel.data.attributes : {})

    // Define a variavel e o state que armazenarão os erros detectados na validação do formulário
    const [erros, setErros] = useState(false)

    /*
    * Função handleChange
    * Função que captura os dados advindos de campos do formulário
    * @campo = recebe o campo do formulário que terá suas propridades name e value acessadas
    */
    const handleChange = (campo) => {
        const nome = campo.name
        const valor = campo.value
        setDados({ ...dados , [nome] : valor})
    }

    // responsavel: estrutura de dados a ser enviado par ao backend
    // na função postAPI
    const responsavel = {
        data: {
            type: "responsaveis",
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
    // inclui o id à estrutura de dados na hipótese de haver uma atualização dos dados
    if(dadosResponsavel) {
        responsavel.data.id = dadosResponsavel.data.id
    }

    /*
    * Função de envio de formulário
    */
    const submit = (e) => {
        e.preventDefault()

        // const validacoResponsavel é atribuida a um validador
        const validator = new Schema(validacaoResponsavel)

        // dicionário com a tradução dos erros é passado ao validador
        validator.messages(dicionarioValidacao)

        dados.telefone = parseInt(dados.telefone)
        if(dados.registro) {
            dados.registro = parseInt(dados.registro)
        }
        
        // dados são validados
        // se aprovados, são enviados ao servidor/
        // caso contrário, uma mensagem de erro é exibia acima do formulário
        validator.validate(dados)
        .then(() => {
            toogleLoading(true)
            if(responsavelCPF) {
                postApi(setIdResponsavel, responsavel, "/responsaveis")
            }
            if(responsavel.data.id) {
                updateAPI(setIdResponsavel, responsavel, "/responsaveis/"+ responsavel.data.id)
            }
        })
        .catch(({errors, fields}) => {
            show('#erro')
            toFocus('#focus')
            setErros(errosValidacao(errors, rotulosResponsavel))
        })

    }

    return(
        <>
            <Loading />
            <Orientacao />
            <div className='container'>
                <h1 id="focus" tabIndex="0" autofocus="autofocus">Responsável: etapa 2 de 4</h1>
                <ErroContainer titulo="Erro ao preencher o formulário" erros={erros} />

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
                            //required={true}
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
                    min="1100000000"
                    max="99999999999"
                    maxlength="11"
                    //required={true}
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
                    //required={true}
                    value={dados.email ? dados.email : ''}
                    handleChange={handleChange}
                    />

                    <Select
                    label="Ocupação"
                    descricao=''
                    idDescricao=""
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
                    //type="number"
                    type="text"
                    name="registro"
                    id="registro"
                    maxlength="9"
                    required={false}
                    value={dados.registro ? dados.registro : ''}
                    handleChange={handleChange}
                    />
                    <Button className="botao">Enviar</Button>
                    </form>
                </div>
            </div>
        </>
    ) 
}

export default FormularioResponsavel