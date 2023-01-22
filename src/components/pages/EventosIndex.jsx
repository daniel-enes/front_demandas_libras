import { useState, useEffect } from 'react'
import { getApi } from '../../funcoes/formulario.js'

function EventosIndex() {

    const [eventos, setEventos] = useState(false)
    const [parametros, setParametros] = useState(false)

    /*
    const definirParametros = (p) => {
        getApi(setEventos, p)
        console.log(p)
    }
    */
    const definirParametros = (p) => {
        getApi(setEventos, p)
        console.log(p)
    }

    useEffect(() => {
        getApi(setEventos, '/eventos')
    }, [])

    let evento = []
    if(eventos) {
        let listaEventos = eventos.data

        evento = listaEventos.map((e) => {
            return (
                <li key={e.id}>
                    <h3>{e.attributes.titulo}</h3>
                    <p>{e.attributes.sobre.length > 200 ? e.attributes.sobre.substr(0, 200) + '...' : e.attributes.sobre}</p>
                    <p><a href={e.attributes.informacoes}>{e.attributes.informacoes}</a></p>
                </li>
            )
        })

    }
    /* 
    <div>
            <ul>
                <li><a tabIndex="0" className="" onClick={() => definirParametros('/eventos?sort=-id')}>Recentes</a></li>
                <li><a tabIndex="0" className="" onClick={() => definirParametros('/eventos?sort=id')}>Antigos</a></li>
            </ul>
        </div>
    */
    return(
        <>
        <div>
            <label>Procurar:</label>
            <input type="search" 
            onChange={(e) => definirParametros("/eventos?filter[titulo]="+e.target.value)}/>
        </div>
        <div>
            <label htmlFor='ordenar'>Ordenar resultados: </label>
            <select id="ordenar" onChange={(e) => definirParametros(e.target.value)}>
                <option value="">- Selecione uma opção -</option>
                <option value="/eventos?sort=-id">Recentes</option>
                <option value="/eventos?sort=id">Antigos</option>
            </select>
        </div>
            {eventos && (
                
                <ul>{evento}</ul>
            )}
        </>
    )
}

export default EventosIndex