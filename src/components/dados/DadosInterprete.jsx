import { useState, useEffect } from "react"
import { getApi } from "../../funcoes/formulario"


export default function DadosInterprete (props) {
    const [interpretes, setInterpretes] = useState(false)

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
                        <p>Telefone: <a href={"tel:"+i.attributes.telefone}>{i.attributes.telefone}</a></p>
                        <p>Email: <a href={"mailto:"+i.attributes.email}>{i.attributes.email}</a></p>
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

