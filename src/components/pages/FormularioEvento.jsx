import { postApi, manipulaErros } from '../../funcoes/formulario.js'
import { toogleLoading, toFocus, show } from '../../funcoes/efeitos.js'

// Importa estrutura de dados com a tradução das mensagens de erro na validação dos dados
import { dicionarioValidacao } from '../../validacao_formulario/dicionarioValidacao.js'

// Importa estrutura de dados com os requisitos para validação dos dados do responsável
import { errosValidacao } from '../../validacao_formulario/errosValidacao.js'

// Imporata estrutura de dados com os requisitos para validação dos dados do responsável
import { validacaoEvento } from '../../validacao_formulario/validacao/validacaoEvento.js'

// Importa estrutura de dados contendo o nome do campo de formulário e respectivo rótulo
import { rotulosEvento } from '../../validacao_formulario/rotulos/rotulosEvento.js'

// Pacote de terceiro para validar os dados advindos do formulário
import Schema from 'async-validator'

// Hooks do React
import { useState } from 'react';

// Componentes para compor o formulário
import Orientacao from "../form/Orientacao";
import Input from "../form/Input"
import Textarea from "../form/Textarea"
import Button from "../form/Button";

// Componentes de layot
import Loading from '../layot/Loading.jsx';
import ErroContainer from '../layot/ErroContainer.jsx'

function FormularioEvento({idResponsavel, setEvento}) {

    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [dados, setDados] = useState({})

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

    // evento: estrutura de dados a ser enviado par ao backend
    // na função postAPI
    const evento = {
        data: {
            type: "eventos",
            attributes: {
                titulo: dados.titulo,
                sobre: dados.sobre,
                informacoes: dados.informacoes,
            },
            relationships: {
                responsaveis: {
                    data: {
                        type: "responsaveis",
                        id: idResponsavel.data.id,    
                    }
                }
            },

        }
    }

    /*
    * Função de envio de formulário
    */
    const submit = (e) => {
        e.preventDefault()

        // const validacaoEvento é atribuida a um validador
        const validator = new Schema(validacaoEvento)

        // dicionário com a tradução dos erros é passado ao validador
        validator.messages(dicionarioValidacao)

        // dados são validados
        // se aprovados, são enviados ao servidor/
        // caso contrário, uma mensagem de erro é exibia acima do formulário
        validator.validate(dados)
        .then(() => {
            toogleLoading(true)
            postApi(setEvento, evento, "/eventos")
        })
        .catch(({errors, fields}) => {
            show('#erro')
            toFocus('#focus')
            setErros(errosValidacao(errors, rotulosEvento))
        })
    }

    return(
        <>
            <Loading />
            <Orientacao />
            <div className='container'>
            <h1 id="focus" tabIndex="0" autoFocus>Eventos: etapa 3 de 4</h1>
                <ErroContainer titulo="Erro ao preencher o formulário" erros={erros} /> 
                <div className="container_form">
                    <form  onSubmit={(e) => submit(e)}>
                        <Input
                        label="Título do evento"
                        descricao="Exemplos: V Seminário de Pesquisas Educacionais; Reunião Pedagógica; Cerimônia de 
                        Posse do Novo Diretor da Unidade... Até 200 caracteres."
                        idDescricao="desc_titulo"
                        type="text"
                        name="titulo"
                        id="titulo"
                        maxlength="200"
                        //required={true}
                        handleChange={handleChange}
                        />

                        <Textarea
                        label="Sobre o evento"
                        descricao="Um resumo e descrição do que se trata o evento. Até 5000 caracteres."
                        idDescricao="desc_sobre"
                        name="sobre"
                        id="sobre"
                        maxlength="5000"
                        //required={true}
                        handleChange={handleChange} 
                        />

                        <Input
                        label="Mais informações"
                        descricao="Sítio eletrônico onde podem ser encontradas mais informações pertinentes ao evento. 
                        Até 255 caracteres. Exemplo: https://seusite.com.br"
                        idDescricao="desc_informacoes"
                        type="url"
                        name="informacoes"
                        id="informacoes"
                        maxlength="255"
                        handleChange={handleChange}
                        />

                        <Button className="botao">Enviar</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormularioEvento