import { postApi, cleanFields } from '../../funcoes/formulario.js'
import { toogleLoading, toFocus, show, close } from '../../funcoes/efeitos.js'

// Importa estrutura de dados com a tradução das mensagens de erro na validação dos dados
import { dicionarioValidacao } from '../../validacao_formulario/dicionarioValidacao.js'

// Importa estrutura de dados com os requisitos para validação dos dados do responsável
import { validacaoHorario } from '../../validacao_formulario/validacao/validacaoHorario.js'

// Importa a função que constrói as mensagens de erros da validação do formulário
import { errosValidacao } from '../../validacao_formulario/errosValidacao.js'

// Importa estrutura de dados contendo o nome do campo de formulário e respectivo rótulo
import { rotulosHorario } from '../../validacao_formulario/rotulos/rotulosHorario.js'

// Pacote de terceiro para validar os dados advindos do formulário
import Schema from 'async-validator'


// Hooks do React
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Componentes para compor o formulário
import Orientacao from "../form/Orientacao"
import Input from "../form/Input"
import Textarea from "../form/Textarea"
import Select from "../form/Select"

// Componentes de layot
import Loading from '../layot/Loading.jsx';
import ErroContainer from '../layot/ErroContainer.jsx'

function FormularioHorario({evento, setHorario}) {

    // Determina o navigate (para redirecionar o usuário)
    const navigate = useNavigate()

    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [dados, setDados] = useState({})
    
    const [maisHorarios, setMaisHorarios] = useState(false)

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
    const hora = {
        data: {
            type: "horarios",
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

       // validacaoHorario é atribuida a um validador
        const validator = new Schema(validacaoHorario(dados))
        validator.messages(dicionarioValidacao)

        // dados são validados
        // se aprovados, são enviados ao servidor/
        // caso contrário, uma mensagem de erro é exibia acima do formulário
        validator.validate(dados)
        .then(() => {
            // Exibe o Loading
            toogleLoading(true)
            
            // Envia os dados para o servidor
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
            setErros(errosValidacao(errors, rotulosHorario))
        })
    }

    return(
        <>
            <Loading />
            <Orientacao />
            <div className='container'>
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
                        required={true}
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
                        required={true}
                        handleChange={handleChange}
                        />

                        <Input
                        label="Horário inicial"
                        descricao="Horário em que a atividade inicia."
                        idDescricao="desc_inicial"
                        type="time"
                        name="inicia"
                        id="inicia"
                        required={true}
                        handleChange={handleChange}
                        />

                        <Input
                        label="Horário final"
                        descricao="Horário em que a atividade termina."
                        idDescricao="desc_termina"
                        type="time"
                        name="termina"
                        id="termina"
                        required={true}
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
                        type="url"
                        //type="text"
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
            </div>
        </>
    )

}

export default FormularioHorario