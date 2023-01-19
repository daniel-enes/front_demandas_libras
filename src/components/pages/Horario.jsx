import { postApi, manipulaErros, cleanFields } from '../../funcoes/formulario.js'
import { toogleLoading, toFocus, show, close } from '../../funcoes/efeitos.js'

// Par avalidar formulário
import Schema from 'async-validator'
import {dicionarioValidacao} from '../../config.js'

import { useNavigate } from 'react-router-dom'

// Hooks do React
import { useState } from 'react'

// Componentes para compor o formulário
import Orientacao from "../form/Orientacao"
import Input from "../form/Input"
import Textarea from "../form/Textarea"
import Select from "../form/Select"

// Componentes de layot
import Loading from '../layot/Loading.jsx';
import ErroContainer from '../layot/ErroContainer.jsx'

function Horario({evento, setHorario}) {

    // Determina o navigate (para redirecionar o usuário)
    const navigate = useNavigate()

    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [dados, setDados] = useState({})
    
    const [maisHorarios, setMaisHorarios] = useState(false)

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
        modalidade: {rotulo: 'Modalidade', mensagem: []}, 
        dia: {rotulo: 'Dia', mensagem: []}, 
        inicia: {rotulo: 'Horário inicial', mensagem: []},
        termina: {rotulo: 'Horário final', mensagem: []},
        local: {rotulo: 'Local', mensagem: []},
        material: {rotulo: 'Material', mensagem: []},
        observacoes: {rotulo: 'Observações', mensagem: []},
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
    const hora = {
        data: {
            types: "horarios",
            attributes: {
                modalidade: dados.modalidade,
                dia: dados.dia,
                inicia: dados.inicia,
                termina: dados.termina,
                local: dados.local,
                material: dados.material,
                agenda: "não organizada",
                observacoes: dados.observacoes,
            },
            relationships: {
                eventos: {
                    data: {
                        type: "eventos",
                        id: evento.data.id,
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
            modalidade: {
                enum: ['remoto', 'presencial com transmissão', 'presencial sem transmissão'],
                required: true,
            },
            dia: [
                {
                    type: 'date',
                    required: true,
                },
                {
                    validator(rule, value, callback, source, options) {
                        const errors= []
                        let dataAtual = new Date().getTime()
                        let dataFormulario = new Date(dados.dia).getTime()

                        if(dataFormulario < dataAtual) {
                            errors.push(new Error("a data do evento não deve ser de um dia que já decorreu."))
                        }
                        return errors
                    }
                }
            ],
            inicia: {
                type: 'string',
                required: true,
            },
            termina: [
                {type: 'string', required: true,},
                {
                    validator(rule, value, callback, source, options) {
                        const errors= []
                        let inicia = dados.inicia
                        let termina = dados.termina
                        if(termina < inicia) {
                            errors.push(new Error("deve ser maior do que o horário informado no campo 'Horário inicial'."))
                        }
                        return errors
                    }
                }
            ],
            local: {
                type: 'string',
                required: false,
            },
            material: {
                type: 'url',
                required: false,
            },
            observacoes: {
                type: 'string',
                required: false,
            }
        }

        // Descrição é atribuida a um validador
        const validator = new Schema(descriptor)
        validator.messages(dicionarioValidacao)

        validator.validate(dados)
        .then(() => {
            // Exibe o Loading
            toogleLoading(true)
            
            // Envia os dados pro servidor
            postApi(setHorario, hora, "/horarios")

            // Fecha o container de erros de validação de formulário na hipótese de estar aberta
            close('#erro')

            if(maisHorarios) {
                cleanFields()
                setTimeout(() => {
                toogleLoading(false)
                }, 500)
                toFocus('#focus')
                setDados({})
            } else {
                navigate('/')
            }
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
            <h1 id="focus" tabIndex="0" autofocus="autofocus">Horário: etapa 4 de 4</h1>
            <ErroContainer titulo="Erro ao preencher o formulário" erros={erros} />

            <div className="container_form">
                <form onSubmit={(e) => submit(e)}>
                    <Select
                    label="Modalidade"
                    descricao=''
                    idDescricao=""
                    name="modalidade"
                    id="modalidade"
                    //required={true}
                    valores={['remoto', 'presencial com transmissão', 'presencial sem transmissão']}
                    handleChange={handleChange}
                    />

                    <Input
                    label="Dia"
                    descricao="Dia em que ocorrerá a atividade prevista."
                    idDescricao="desc_dia"
                    type="date"
                    name="dia"
                    id="dia"
                    //required={true}
                    handleChange={handleChange}
                    />

                    <Input
                    label="Horário inicial"
                    descricao="Horário em que a atividade inicia."
                    idDescricao="desc_inicial"
                    type="time"
                    name="inicia"
                    id="inicia"
                    //required={true}
                    handleChange={handleChange}
                    />

                    <Input
                    label="Horário final"
                    descricao="Horário em que a atividade termina."
                    idDescricao="desc_termina"
                    type="time"
                    name="termina"
                    id="termina"
                    //required={true}
                    handleChange={handleChange}
                    />

                    <Input
                    label="Local"
                    descricao="Se 'modalidade' está marcado como 'presencial', informe o endereço;
                    senão, se está marcado como 'remoto', informe o link do stream. Até 255 caracteres"
                    idDescricao="desc_local"
                    type="text"
                    name="local"
                    id="local"
                    maxlength="255"
                    handleChange={handleChange}
                    />

                    <Input
                    label="Material"
                    descricao="Sítio eletrônico contendo anexos e arquivos úteis para os intérpretes 
                    estarem estudando acerca do evento. Até 255 caracteres."
                    idDescricao="desc_material"
                    //type="url"
                    type="text"
                    name="material"
                    id="material"
                    maxlength="255"
                    handleChange={handleChange}
                    />

                    <Textarea
                    label="Observações"
                    descricao="Acrescente informações importantes que não foram contempladas no 
                    processo de registro da demanda."
                    idDescricao="desc_observacoes"
                    name="observacoes"
                    id="observacoes"
                    maxlength="5000"
                    handleChange={handleChange} 
                    />

                    <div className="container_submit">
                        <button type="submit" 
                        onClick={() => setMaisHorarios(true)}
                        className="botao_second">Adicionar mais horários</button>
                    </div>

                    <div className="container_submit">
                        <button type="submit" 
                        onClick={() => setMaisHorarios(false)}
                        className="botao">Salvar e terminar</button>
                    </div>
                    
                </form>
            </div>
        </>
    )

}

export default Horario