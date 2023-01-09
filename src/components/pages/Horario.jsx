import { postApi } from '../../funcoes/formulario.js'
import { toogleLoading } from '../../funcoes/efeitos.js'

// Hooks do React
import { useState } from 'react'

// Componentes para compor o formulário
import Orientacao from "../form/Orientacao"
import Input from "../form/Input"
import Textarea from "../form/Textarea"
import Select from "../form/Select"
import Button from "../form/Button"
import Loading from '../layot/Loading.jsx'

function Horario({evento, setHorario}) {
    
    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [dados, setDados] = useState({})
    //const [id, setId] = useState(false)
    
    const [maisHorarios, setMaisHorarios] = useState(false)

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
        toogleLoading(true)
        postApi(setHorario, hora, "/horarios")
        if(maisHorarios) {
            toogleLoading(false)
            setHorario(true)
        } else {
            toogleLoading(false)
            setHorario(false)
        }

    }

    return(
        <>
            <Loading />
            <Orientacao />
            <h1 tabIndex="0">Horário</h1>
            <div className="container_form">
                <form onSubmit={(e) => submit(e)}>
                    <Select
                    label="Modalidade"
                    descricao=''
                    idDescricao=""
                    type=""
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

                    <Button 
                    className="botao_second" 
                    state={true} 
                    setState={setMaisHorarios}>+ Adicionar mais horários</Button>

                    <Button 
                    className="botao" 
                    state={false} 
                    setState={setMaisHorarios}>Salvar e terminar</Button>
                    
                </form>
            </div>
        </>
    )
}

export default Horario