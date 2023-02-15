import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'

import { getApi } from '../../funcoes/api.js'
import { EVENTOS } from '../../config.js';

import { urlApi } from '../../config.js';

//import HorarioInterpretes from './HorarioInterpretes.jsx';
// Importa os componentes que exibem os dados dos respectivos objetos
import DadosResponsavel from '../dados/DadosResponsavel.jsx';
import DadosInterprete from '../dados/DadosInterprete';

function EventoShow() {

    const e = EVENTOS + '/'

    let {id} = useParams();

    const [evento, setEvento] = useState(false)
    const [interpretesRelatedURI, setInterpretesRelatedURI] = useState(false)

    let cabecalhoEvento = false // Variavel que constrói o cabeçalho do evento
    let incluidos       = false // Variavel que captura a coleção de objetjos incluidos no evento
    let responsavel     = false // Variavel que constrói a seção de informações do responsavel
    let horarios        = []    // Variavel que contrói a seção da programação do evento
    let interpretes = false

    useEffect(() => {
        getApi(setEvento, e+id+'?include=horarios,responsavel')
    }, [])

    // Verifica se o evento existe
    if(evento) {
        
        // Constrói a seção do cabeçalho do evento
        cabecalhoEvento = (
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
            const dadosResponsavel =  objetoResponsavel[0]
            responsavel = (
                <section>
                    <h3>Responsavel</h3>
                    <DadosResponsavel dados={dadosResponsavel}/>
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
                let uri = false

                //if((!interpretesRelatedURI) && (horario.relationships.interpretes.links.related)) {
                if(horario.relationships.interpretes.links.related) {
                    uri = horario.relationships.interpretes.links.related.replace(urlApi, '')
                    //setInterpretesRelatedURI(uri)
                }
                
                // Contrói a seção de intérpretes
                
                //if(interpretesRelatedURI) {
                if(uri) {
                    interpretes = 
                    <DadosInterprete 
                    uri={uri}
                    />
                }
                
                //const data = new Date(horario.attributes.dia)
                //const dia = day+"/"+(data.getMonth()+1)+"/"+data.getFullYear()
                return (
                    <section key={horario.id}>

                        <h3 style={{backgroundColor: "lightgreen"}}>{horario.attributes.dia} - Modalidade: {horario.attributes.modalidade}</h3>
                        
                        <h4>Horário</h4>
                        <p>{horario.attributes.dia} - {horario.attributes.inicia.substr(0, 5)} às {horario.attributes.termina.substr(0, 5)}</p>
                        
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