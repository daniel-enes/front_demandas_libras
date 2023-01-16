import { postApi, updateAPI } from '../../funcoes/formulario.js';
import { toogleLoading, toFocus, show } from '../../funcoes/efeitos.js'

import {dicionarioValidacao} from '../../config.js'

// Navageção
import { useNavigate } from 'react-router-dom'

// Par avalidar formulário
import Schema from 'async-validator'

// Hooks do React
import { useState } from 'react';

// Componentes para compor o formulário
import Orientacao from "../form/Orientacao";
import Input from "../form/Input"
import Select from "../form/Select";
import Button from "../form/Button";
import Loading from '../layot/Loading.jsx';

function Responsavel ({dadosResponsavel, responsavelCPF, setIdResponsavel}) {

    // Determina o navigate (para redirecionar o usuário)
    const navigate = useNavigate()

    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [dados, setDados] = useState(dadosResponsavel ? dadosResponsavel.data.attributes : {})

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
        nome: {rotulo: 'Nome', mensagem: []}, 
        telefone: {rotulo: 'Telefone', mensagem: []}, 
        email: {rotulo: 'Email', mensagem: []}, 
        ocupacao: {rotulo: 'Ocupação', mensagem: []}, 
        registro: {rotulo: 'Siape ou DRE', mensagem: []},
    }
     
    const manipulaErros = (erros, campos) => {
        for(let erro of erros) {
            campos[erro.field].mensagem.push(erro.message)
        }
        return mensagemErro(campos)
    }

    const mensagemErro = (campos) => {
        let erros = []
        for(let campo in campos) {
            if(campos[campo].mensagem) {
                for(let mensagem of campos[campo].mensagem) {
                    erros.push(<li key={campo}><a href={'#'+campo}><b>{campos[campo].rotulo}</b>: {mensagem}</a></li>)
                }
            }
        }
        return erros
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

        // Descrição da validação de dados
        const descriptor = {
            nome: {
                type: 'string',
                required: true,
            },
            telefone: {
                type: 'number',
                required: true,
            },
            email: {
                type: 'email',
                required: true,
            },
            ocupacao: {
                type: 'enum',
                enum: ['estudante', 'docente', 'técnico']
            },
            registro: {
                required: false,
                type: 'number'
            }
        }

        // Descrição é atribuida a um validador
        const validator = new Schema(descriptor)
        validator.messages(dicionarioValidacao)

        dados.telefone = parseInt(dados.telefone)
        dados.registro = parseInt(dados.registro)

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
            setErros(manipulaErros(errors, campos))
            //let element = document.querySelector('#focus')
            //element.focus()
        })

    }

    return(
        <>
            <Loading />
            <Orientacao />
            <h1 id="focus" tabIndex="0" autofocus="autofocus">Responsável: etapa 2 de 4</h1>

            <div id="erro" className='alert_erro display_none' role="alert">
                <h3 tabIndex="0">Erro ao preencher o formulário</h3>
                <ul>{erros}</ul>
            </div>
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
                //type="number"
                type="text"
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
                //type="email"
                type="text"
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
        </>
    ) 
}

export default Responsavel