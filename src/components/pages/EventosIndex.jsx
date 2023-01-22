import { useState, useEffect } from 'react'
import { getApi } from '../../funcoes/formulario.js'

function EventosIndex() {

    const [eventos, setEventos] = useState(false)

    useEffect(() => {
        getApi(setEventos, '/eventos')
    }, [])

    let evento = []
    if(eventos) {
        console.log(eventos)
        
        let listaEventos = eventos.data
        console.log(listaEventos)

        evento = listaEventos.map((e) => {
            return (
                <li key={e.id}>
                    <h3>{e.attributes.titulo}</h3>
                    <p>{e.attributes.sobre}</p>
                    <p>{e.attributes.informacoes}</p>
                </li>
            )
        })

    }

    return(
        <>
            {eventos && (
                evento
            )}
        </>
    )
}

export default EventosIndex