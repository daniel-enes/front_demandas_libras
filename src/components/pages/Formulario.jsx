// Hooks do React
import { useState } from 'react';

import Responsavel from './Responsavel';
import ResponsavelCPF from './ResponsavelCPF';
import Evento from './Evento';
import Horario from './Horario';
import Loading from "../layot/Loading";

function Formulario() {

    // Usado quando for encontrado os dados do responsável registrado no sistema
    const [dadosResponsavel, setDadosResponsavel] = useState(false)
    // Usado quando não encontrar o responsável já cadastrado no sistema
    const [responsavelCPF, setResponsavelCPF] = useState(false)
    // Usado para quando os dados do responsável forem gravados
    const [idResponsavel, setIdResponsavel] = useState(false)
    // Usado para quando os dados do evento forem salvos
    const [evento, setEvento] = useState(false)
    // Determina se deve continuar cadastrando horário (true) ou se deve encerrar (false)
    const [horario, setHorario] = useState(true)

    if(evento) {
        return(
            <>
                <Horario 
                    evento={evento} 
                    hora={horario} 
                    setHorario={setHorario} 
                />
            </>
        )
    }
    else if(idResponsavel) {
        return (
            <>
                <Evento 
                    idResponsavel={idResponsavel} 
                    setEvento={setEvento} 
                />
            </>
        )
    }
    else if(dadosResponsavel) {
        return (
            <>
                <Responsavel
                    dadosResponsavel={dadosResponsavel}
                    setIdResponsavel={setIdResponsavel}
                />
            </>
        )
    }
    else if(responsavelCPF) {
        return (
            <>
                <Responsavel
                    responsavelCPF={responsavelCPF}
                    setIdResponsavel={setIdResponsavel}
                />
            </>
        )
    } else {
        return(
            <>
                <ResponsavelCPF 
                        setDadosResponsavel={setDadosResponsavel}
                        setResponsavelCPF={setResponsavelCPF}
                />
            </>
        )
    }
    
}

export default Formulario