import { useEffect } from 'react'
import { useState } from 'react'
import { getApi } from '../../funcoes/formulario.js'

function InterpretesIndex() {

    const [dadosInterpretes, setDadosInterpretes] = useState()

    useEffect(() => {
        getApi(setDadosInterpretes, '/interpretes?sort=nome')
    }, [])
    
    let interprete = []
    if(dadosInterpretes) {
        const interpretes = dadosInterpretes.data
        interprete = interpretes.map((i) => {
            return (
                <li key={i.id} className='lista_resultado'>
                    <div className='container'>
                        <a href=''>
                            <h3>{i.attributes.nome}</h3>
                            <p><b>Telefone: </b>{i.attributes.telefone}</p>
                            <p><b>Email: </b>{i.attributes.email}</p>
                        </a>
                    </div>
                </li>
            )
        })
    }

    return(
        <>
            <div>
                <ul>
                    {interprete}
                </ul>
            </div>
        </>
    )
}

export default InterpretesIndex