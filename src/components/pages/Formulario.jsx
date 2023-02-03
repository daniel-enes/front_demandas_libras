// Hooks do React
import { useState } from 'react';

import FormularioResponsavel from './FormularioResponsavel';
import FormularioCPFResponsavel from './FormularioCPFResponsavel';
import FormularioEvento from './FormularioEvento';
import FormularioHorario from './FormularioHorario';

function Formulario(props) {

    // Usado quando for encontrado os dados do responsável registrado no sistema
    const [dadosResponsavel, setDadosResponsavel] = useState(false)
    // Usado quando não encontrar o responsável já cadastrado no sistema
    const [responsavelCPF, setResponsavelCPF] = useState(false)
    // Usado para quando os dados do responsável forem gravados
    const [idResponsavel, setIdResponsavel] = useState(false)
    // Usado para quando os dados do evento forem salvos
    const [evento, setEvento] = useState(false)
    // Determina se deve continuar cadastrando horário (true) ou se deve encerrar (false)
    const [horario, setHorario] = useState(false)
    
    if(evento) {
        return(
            <>
                <FormularioHorario 
                    evento={evento} 
                    setHorario={setHorario}
                />
            </>
        )
    }
    else if(idResponsavel) {
        return (
            <>
                <FormularioEvento
                    idResponsavel={idResponsavel} 
                    setEvento={setEvento} 
                />
            </>
        )
    }
    else if(dadosResponsavel) {
        return (
            <>
                <FormularioResponsavel
                    dadosResponsavel={dadosResponsavel}
                    setIdResponsavel={setIdResponsavel}
                />
            </>
        )
    }
    else if(responsavelCPF) {
        return (
            <>
                <FormularioResponsavel
                    responsavelCPF={responsavelCPF}
                    setIdResponsavel={setIdResponsavel}
                />
            </>
        )
    } else {
        return(
            <>
                <FormularioCPFResponsavel 
                        setDadosResponsavel={setDadosResponsavel}
                        setResponsavelCPF={setResponsavelCPF}
                />
            </>
        )
    }
    
}

export default Formulario