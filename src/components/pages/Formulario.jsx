// Hooks do React
import { useState } from 'react';
import Responsavel from './Responsavel';

import ResponsavelCPF from './ResponsavelCPF';

function Formulario() {

    const [dadosResponsavel, setDadosResponsavel] = useState(false)
    const [responsavelCPF, setResponsavelCPF] = useState(false)

    if(dadosResponsavel) {
        return (
            <>
                <Responsavel
                    dadosResponsavel={dadosResponsavel}
                />
            </>
        )
    }
    if(responsavelCPF) {
        return (
            <>
                <Responsavel
                    responsavelCPF={responsavelCPF}
                />
            </>
        )
    }
    return(
        <>
            <ResponsavelCPF 
                    setDadosResponsavel={setDadosResponsavel}
                    setResponsavelCPF={setResponsavelCPF}
            />
        </>
    )
}

export default Formulario