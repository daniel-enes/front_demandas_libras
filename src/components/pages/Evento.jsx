import { postApi, manipulaErros } from '../../funcoes/formulario.js'
import { toogleLoading, toFocus, show } from '../../funcoes/efeitos.js'

// Par avalidar formulário
import Schema from 'async-validator'
import {dicionarioValidacao} from '../../config.js'

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

function Evento({idResponsavel, setEvento}) {

    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [dados, setDados] = useState({})

    // Define a variavel e o state que armazenarão os erros detectados na validação do formulário
    const [erros, setErros] = useState(false)

    /* 
    * Manipulador de erros 
    * const campo: contém os campos que receberão as  mensagens de erro
    * 
    * manipularError: função que manipula os erros advindos da vlidação do formulário
    * @erros: objeto que contém erros detectados na validação dos campos do formulário
    * @ campos: objeto que contém os campos do formulário correspondente que armazena
    * os erros detectados
    */
    const campos = {
        titulo: {rotulo: 'Título do evento', mensagem: []}, 
        sobre: {rotulo: 'Sobre o evento', mensagem: []}, 
        informacoes: {rotulo: 'Mais informações', mensagem: []}, 

    }

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
    const evento = {
        data: {
            types: "eventos",
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

        // Descrição da validação de dados
        const descriptor = {
            titulo: {
                type: 'string',
                required: true,
            },
            sobre: {
                type: 'string',
                required: true,
            },
            informacoes: {
                type: 'url',
                required: false,
            },
        }

        // Descrição é atribuida a um validador
        const validator = new Schema(descriptor)
        validator.messages(dicionarioValidacao)

        validator.validate(dados)
        .then(() => {
            toogleLoading(true)
            postApi(setEvento, evento, "/eventos")
        })
        .catch(({errors, fields}) => {
            show('#erro')
            toFocus('#focus')
            setErros(manipulaErros(errors, campos))
        })
    }

    return(
        <>
            <Loading />
            <Orientacao />
            <h1 id="focus" tabIndex="0" autofocus="autofocus">Eventos: etapa 3 de 4</h1>
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
                    required={true}
                    handleChange={handleChange}
                    />

                    <Textarea
                    label="Sobre o evento"
                    descricao="Um resumo e descrição do que se trata o evento. Até 5000 caracteres."
                    idDescricao="desc_sobre"
                    name="sobre"
                    id="sobre"
                    maxlength="5000"
                    required={true}
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
        </>
    )
}

export default Evento