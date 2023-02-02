import { useState, useEffect } from "react"
import { getApi } from "../../funcoes/formulario"


function HorarioInterpretes(props) {

    const [interpretes, setInterpretes] = useState(false)

    let sessaoInterprete = false

    useEffect(() => {
        getApi(setInterpretes, props.uri)
    }, [])

    if(interpretes) {
        sessaoInterprete = interpretes.data.map((i) => {
            return (
                <li key={i.id}>
                    <p>{i.attributes.nome}</p>
                    <p>{i.attributes.telefone}</p>
                    <p>{i.attributes.email}</p>
                </li>
            )
        })
    }

    return(
        <ul>
            {sessaoInterprete}
        </ul>
    )
}

export default HorarioInterpretes