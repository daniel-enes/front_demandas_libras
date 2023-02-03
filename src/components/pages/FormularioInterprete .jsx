import { postApi, updateAPI } from '../../funcoes/formulario.js';
import { toogleLoading, toFocus, show } from '../../funcoes/efeitos.js'

// Importa estrutura de dados com a tradução das mensagens de erro na validação dos dados
import { dicionarioValidacao } from '../../validacao_formulario/dicionarioValidacao.js'

// Importa estrutura de dados com os requisitos para validação dos dados do responsável
import { validacaoInterprete } from '../../validacao_formulario/validacao/validacaoInterprete.js'

// Importa a função que constrói as mensagens de erros da validação do formulário
import { errosValidacao } from '../../validacao_formulario/errosValidacao.js'

// Importa estrutura de dados contendo o nome do campo de formulário e respectivo rótulo
import { rotulosInterprete } from '../../validacao_formulario/rotulos/rotulosInterprete.js'

// Pacote de terceiro para validar os dados advindos do formulário
import Schema from 'async-validator'

// Hooks do React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes para compor o formulário
import Orientacao from "../form/Orientacao";
import Input from "../form/Input"
import Select from "../form/Select";
import Button from "../form/Button";

// Componentes de layot
import Loading from '../layot/Loading.jsx';
import ErroContainer from '../layot/ErroContainer.jsx'

function FormularioInterprete () {

    // Determina o navigate (para redirecionar o usuário)
    const navigate = useNavigate()

    // Define a variavel e o state que armazenarão os dados salvos dos intérprete
    const [interpretes, setInterpretes] = useState(false)

    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [dados, setDados] = useState(interpretes ? interpretes.data.attributes : {})

    // Define a variavel e o state que armazenarão os erros detectados na validação do formulário
    const [erros, setErros] = useState(false)

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
    const interprete = {
        data: {
            type: "interpretes",
            attributes: {
                nome: dados.nome,
                telefone: dados.telefone,
                email: dados.email,
                status: "ativo",
            }
        }
    }

    // Ações ao enviar o formulário
    const submit = (e) => {
        e.preventDefault()

        // validacaoInterprete é atribuida a um validador
        const validator = new Schema(validacaoInterprete)
        validator.messages(dicionarioValidacao)

        // Converte o valor de Telefone para um número inteiro e realiza a validação
        dados.telefone = parseInt(dados.telefone)

        validator.validate(dados)
        .then(() => {
            toogleLoading(true)
            postApi(setInterpretes, interprete, "/interpretes")
            navigate('/')
        })
        .catch(({errors, fields}) => {
            show('#erro')
            toFocus('#focus')
            setErros(errosValidacao(errors, rotulosInterprete))

        })

    }

    return(
        <>
            <Loading />
            <div className="container_form">

                <h1 id="focus" tabIndex="0" autoFocus="autoFocus">Intérprete de Libras</h1>
                <ErroContainer titulo="Erro ao preencher o formulário" erros={erros} />
                
                <form onSubmit={(e) => submit(e)}>

                <Input
                label="Nome completo"
                descricao=""
                idDescricao=""
                type="text"
                name="nome"
                id="nome"
                maxlength="150"
                //required={true}
                handleChange={handleChange}
                />

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

                <Button className="botao">Enviar</Button>

                </form>
            </div>
        </>
    )
}

export default FormularioInterprete 