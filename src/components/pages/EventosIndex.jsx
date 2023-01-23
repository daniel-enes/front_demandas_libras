import * as React from 'react'
import { getApi } from '../../funcoes/formulario.js'

import TablePagination from '@mui/material/TablePagination';



function EventosIndex() {
  
    const [eventos, setEventos] = React.useState(false)
  
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage)
        getApi(setEventos, '/eventos?page[size]='+rowsPerPage+'&page[number]='+(newPage+1))
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getApi(setEventos, '/eventos?page[size]='+event.target.value+'&page[number]=1')
    };

    const definirParametros = (p) => {
        getApi(setEventos, p)
    }

    React.useEffect(() => {
        getApi(setEventos, '/eventos?sort=-id&page[size]='+rowsPerPage+'&page[number]=1')
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
    //<option value="/eventos?sort=-id">Recentes</option>
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
                <option value={"/eventos?sort=-id&page[size]="+rowsPerPage+"&page[number]="+(page+1)}>Recentes</option>
                <option value={"/eventos?sort=id&page[size]="+rowsPerPage+"&page[number]="+(page+1)}>Antigos</option>
            </select>
        </div>
        <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
            {eventos && (
                
                <ul>{evento}</ul>
            )}
        </>
    )
}

export default EventosIndex