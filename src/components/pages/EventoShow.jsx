import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'

import { getApi } from '../../funcoes/formulario.js'

import { urlApi } from '../../config.js';

//import HorarioInterpretes from './HorarioInterpretes.jsx';
// Importa os componentes que exibem os dados dos respectivos objetos
import DadosInterprete from '../dados/DadosInterprete';

function EventoShow() {

    let {id} = useParams();

    const [evento, setEvento] = useState(false)
    const [interpretesRelatedURI, setInterpretesRelatedURI] = useState(false)

    let cabecalhoEvento = false // Variavel que constrói o cabeçalho do evento
    let incluidos       = false // Variavel que captura a coleção de objetjos incluidos no evento
    let responsavel     = false // Variavel que constrói a seção de informações do responsavel
    let horarios        = []    // Variavel que contrói a seção da programação do evento
    let interpretes = false

    useEffect(() => {
        getApi(setEvento, '/eventos/'+id+'?include=horarios,responsavel')
    }, [])

    // Verifica se o evento existe
    if(evento) {
        
        // Constrói a seção do cabeçalho do evento
        cabecalhoEvento= (
            <section className='width_100' style={{order: 1}}>  
            <h2 className='uppercase'>{evento.data.attributes.titulo}</h2>
            <h3>Sobre o evento</h3>
            <p>{evento.data.attributes.sobre}</p>

            <h3>Mais informações</h3>
            {evento.data.attributes.informacoes ? 
            <p><a href={evento.data.attributes.informacoes}>{evento.data.attributes.informacoes}</a></p>
            :
            <p><mark>Pendente</mark></p>
            }
            </section>
        )
        incluidos = evento.included
    }
    
    // Verifica se há objetos incluidos no evento
    if(incluidos) 
    {
        let objetoResponsavel = incluidos.filter((i) => 
        {
            return i.type == "responsaveis"
        })

        // Constrói a seção contendo os dados do responsável

        if(objetoResponsavel) {

            responsavel = (
                <section key={objetoResponsavel[0].id}>
                    <h3>Responsavel</h3>
                    <dl>
                        <dt>Nome: </dt>
                        <dd>{objetoResponsavel[0].attributes.nome}</dd>
                        <dt>Telefone:</dt>
                        <dd><a href={"tel:"+objetoResponsavel[0].attributes.telefone}>{objetoResponsavel[0].attributes.telefone}</a></dd>
                        <dt>Email:</dt>
                        <dd><a href={"mailto:"+objetoResponsavel[0].attributes.email}>{objetoResponsavel[0].attributes.email}</a></dd>
                        <dt>Ocupação:</dt>
                        <dd>{objetoResponsavel[0].attributes.ocupacao}</dd>
                        <dt>Registro:</dt>
                        <dd>{objetoResponsavel[0].attributes.registro}</dd>
                    </dl>
                </section>
            )
        }

        let objetoHorarios = incluidos.filter((i) => {
            return i.type == "horarios"
        })

        // Constrói a seção contendo os horários
        // Na hipótese de ter intérpretes nos horários, constrói-os também

        if(objetoHorarios) {
            
            horarios = objetoHorarios.map((horario) => {

                if((!interpretesRelatedURI) && (horario.relationships.interpretes.links.related)) {
                    const uri = horario.relationships.interpretes.links.related.replace(urlApi, '')
                    setInterpretesRelatedURI(uri)
                }
                
                // Contrói a seção de intérpretes
                
                if(interpretesRelatedURI) {
                    interpretes = 
                    <DadosInterprete 
                    uri={interpretesRelatedURI}
                    />
                }
                
                const data = new Date(horario.attributes.dia)
                const dia = data.getDate()+"/"+data.getMonth()+"/"+data.getFullYear()
                return (
                    <section key={horario.id}>

                        <h3>{dia} - Modalidade: {horario.attributes.modalidade}</h3>
                        
                        <h4>Horário</h4>
                        <p>{dia} - {horario.attributes.inicia.substr(0, 5)} às {horario.attributes.termina.substr(0, 5)}</p>
                        
                        <h4>Local</h4>
                        {horario.attributes.local ? 
                        <p>{horario.attributes.local}</p>
                        :
                        <p><mark>Pendente</mark></p>
                        }
                        
                        <h4>Material</h4>
                        {horario.attributes.material ? 
                        <p>{horario.attributes.material}</p>
                        :
                        <p><mark>Pendente</mark></p>
                        }
                        <p>{horario.attributes.material}</p>
                        <p><b>Agenda</b>: {horario.attributes.agenda}</p>

                        {interpretes && 
                            <>
                            <h4>Intérpretes</h4>
                            {interpretes}
                            <p><a href={"/editar_escala_interprete/"+ horario.id}>Editar escala</a></p>
                            </>
                        }

                        <h4>Observações</h4>
                        {horario.attributes.observacoes ? 
                        <p>{horario.attributes.observacoes}</p>
                        :
                        <p>Nenhuma</p>
                        }
                        </section>
                )
            })
        }
    }
    return (
        <div className='container'>
            {cabecalhoEvento}
            {responsavel}
            {horarios}
        </div>
    )
}
export default EventoShow