import { useState, useEffect } from "react"
import { getApi } from "../../funcoes/formulario"


export default function DadosInterprete (props) {
    const [interpretes, setInterpretes] = useState(props.dados)

    let sessaoInterprete = false
    
    useEffect(() => {
        getApi(setInterpretes, props.uri)
    }, [])
    
    if(interpretes) {
        if(interpretes.data.length != 0) {
            sessaoInterprete = interpretes.data.map((i) => {
                return (
                    <li key={i.id}>
                        <p><b>{i.attributes.nome}</b></p>
                        <p>Telefone: {i.attributes.telefone}</p>
                        <p>Email: {i.attributes.email}</p>
                    </li>
                )
            })
        } else {
            sessaoInterprete = (
                <>
                    <p><mark>Nenhum intérprete escalado</mark></p>
                </>
            )
        }
    } 
    

    return(
        <ul>
            {sessaoInterprete}
        </ul>
    )
}

