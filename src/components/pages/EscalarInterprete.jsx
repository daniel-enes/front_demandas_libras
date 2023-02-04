import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import { useParams, useNavigate} from "react-router-dom";

import { getApi, updateAPI } from "../../funcoes/api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function EscalarInterprete() {
    
    // Armazena o id do horário do evento
    const { horarioId } = useParams()

    // Para redirecionar o usuário
    const navigate = useNavigate()

    // Para armazenar os intérpretes e os intérpretes escalados
    const [interpretes, setInterpretes] = React.useState(false)
    const [interpretesEscalados, setInterpretesEscalados] = React.useState(false)
    
    // URIs para se comunicar com o servidor 
    const uriInterpretes = '/interpretes'
    const uriInterpretesEscalados = '/horarios/'+horarioId+'/interpretes'
    const uriApiUpdate = "/horarios/"+horarioId+"/relationships/interpretes"

    // Menu de seleção núltipla
    // (1) @personName: conterá os nomes selecionados no Select
    // (2) @names: conterá o nome de todos os intérpretes
    // (3) @escalados: conterá os intérpretes anteriormente escalados para já deixá-los
    // marcados no Select
    const [personName, setPersonName] = React.useState([]);
    let names = [];
    let escalados = [];

    // Manipula a seleção dos intérpretes no Select, definindo-o no @personName
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    // Recupera no servidor todos os intépretes e os escalados 
    React.useEffect(() => {
        getApi(setInterpretes, uriInterpretes)
        getApi(setInterpretesEscalados, uriInterpretesEscalados)
    }, [])

    // Armazena os nomes dos intérpretes no @names
    if((interpretes) && (interpretes.data.length != 0)) {
        names =  interpretes.data.map((interprete) => {
            return interprete.attributes.nome
        })
    }

    let dados = false
    // Armazena os nomes dos intérpretes escalados no @escalados
    if((interpretesEscalados) && (interpretesEscalados.data.length != 0)) {
        escalados = interpretesEscalados.data.map((escalado) => {
            return escalado.attributes.nome
            
        })
        dados = interpretesEscalados.data.map((escalado) => {
            return (
                <li key={escalado.id}>
                    <p><b>{escalado.attributes.nome}</b></p>
                    <p>Telefone: {escalado.attributes.telefone}</p>
                    <p>Email: {escalado.attributes.email}</p>
                </li>
            )
        })
    }

    // Os intérpretes anteriormente escalados são definidos no @personName
    // e são automaticamente marcados na lista do Select
    if((personName.length == 0) && (escalados.length != 0)) {
        setPersonName(escalados)
    }
    
    // Define a estrutura de dados contendo o ID dos intérpretes escalados 
    let escalaDefinida = []
    if((personName) && (interpretes)) {
    //if((personName) && (personName.length != 0) && (interpretes) && (interpretes.data.length != 0)) {
        for(let interprete of interpretes.data) {
            if(personName.includes(interprete.attributes.nome))  { 
                escalaDefinida.push(
                    {
                        id: interprete.id,
                        type: 'interpretes',
                    },
                )
            }
        }
    }

    // Função para atualizar a escala do horário do evento no servidor
    const atualizarEscala = () => {
        // Define a estrutura de dados que será enviado ao servidor
        let horarioRelationshipsInterprete = false
        if(escalaDefinida.length != 0 ) {
            horarioRelationshipsInterprete = {
                data: escalaDefinida  
            }
            updateAPI(horarioRelationshipsInterprete, uriApiUpdate)
            getApi(setInterpretesEscalados, uriInterpretesEscalados)
        }
    }

    return (
        <>
        <div className="container">
 
            <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Escalar</InputLabel>
                <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Escalar" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                >
                {names.map((name) => (
                    <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </div>
            <div>
                <p>
                    <a onClick={() => atualizarEscala()}>Atualizar</a> 
                </p>
            </div>            
            {dados && 
                <ul>{dados}</ul>
            }
        </div>
        </>
    )
}