import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'

import { getApi } from '../../funcoes/formulario.js'

function EventoShow() {

    let {id} = useParams();

    const [evento, setEvento] = useState()

    useEffect(() => {
        getApi(setEvento, '/eventos/'+id+'?include=horarios,responsavel')

    }, [])

    console.log(evento)

    return (
        <div className='container'>
        {evento && (
        <>  
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

            {evento.included.map((include) => {
                if(include.type == "responsaveis") {
                    return (
                    <section className='width_100' style={{order: 2}} key={include.id}>
                        <h3>Responsavel</h3>
                        <dl>
                            <dt>Nome: </dt>
                            <dd>{include.attributes.nome}</dd>
                            <dt>Telefone:</dt>
                            <dd><a href={"tel:"+include.attributes.telefone}>{include.attributes.telefone}</a></dd>
                            <dt>Email:</dt>
                            <dd><a href={"mailto:"+include.attributes.email}>{include.attributes.email}</a></dd>
                            <dt>Ocupação:</dt>
                            <dd>{include.attributes.ocupacao}</dd>
                            <dt>Registro:</dt>
                            <dd>{include.attributes.registro}</dd>
                        </dl>
                    </section>

                    )
                }
                if(include.type == "horarios") {
                    const data = new Date(include.attributes.dia)
                    const dia = data.getDate()+"/"+data.getMonth()+"/"+data.getFullYear()
                    return (
                        <section className='width_100' style={{order: 100}} key={include.id}>
                            <h3>{dia} - Modalidade: {include.attributes.modalidade}</h3>
                            
                            <h4>Horário</h4>
                            <p>{dia} - {include.attributes.inicia.substr(0, 5)} às {include.attributes.termina.substr(0, 5)}</p>
                            
                            <h4>Local</h4>
                            {include.attributes.local ? 
                            <p>{include.attributes.local}</p>
                            :
                            <p><mark>Pendente</mark></p>
                            }
                            
                            <h4>Material</h4>
                            {include.attributes.material ? 
                            <p>{include.attributes.material}</p>
                            :
                            <p><mark>Pendente</mark></p>
                            }
                            <p>{include.attributes.material}</p>
                            <p><b>Agenda</b>: {include.attributes.agenda}</p>
                            <h4>Observações</h4>
                            {include.attributes.observacoes ? 
                            <p>{include.attributes.observacoes}</p>
                            :
                            <p>Nenhuma</p>
                            }
                        </section>
                        )
                    }
                })
            }
        </>
        )}
            
        </div>
    )
}
export default EventoShow