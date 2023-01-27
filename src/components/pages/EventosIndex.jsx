import * as React from 'react'
import { getApi } from '../../funcoes/formulario.js'

import TablePagination from '@mui/material/TablePagination';

function EventosIndex() {
  
    const [eventos, setEventos] = React.useState(false)
    const [ordenar, setOrdenar] = React.useState('-id')
    const [filtro, setFiltro] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    // Rota do backend para a coleção de eventos
    const e = '/eventos?'

    // Manipula o campo que "Ordenar resultados"
    const handleOrdenar = (o) => {
        setOrdenar(o)
        getApi(setEventos, e+'sort='+o+'&page[size]='+rowsPerPage+'&page[number]=1'+(filtro ? '&filter[titulo]='+filtro : ''))
        console.log(e+'sort='+o+'&page[size]='+rowsPerPage+'&page[number]=1'+(filtro ? '&filter[titulo]='+filtro : ''))
    }

    // Manipula o campo que determina a página corrente da paginação
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage)
        getApi(setEventos, e+'sort='+ordenar+'&page[size]='+rowsPerPage+'&page[number]='+(newPage+1)+(filtro ? '&filter[titulo]='+filtro : ''))
    }

    // Manipula o campo "Rows per page"
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getApi(setEventos, e+'sort='+ordenar+'&page[size]='+event.target.value+'&page[number]=1'+(filtro ? '&filter[titulo]='+filtro : ''))
    };

    // Manipula o campo "Procurar"
    const handleSearch = (search) => {
        setFiltro(search)
        getApi(setEventos, e+'sort='+ordenar+'&page[size]='+rowsPerPage+'&page[number]=1&filter[titulo]='+search)
    }

    // Retorno padrão da coleção de eventos ao carregar a página
    React.useEffect(() => {
        getApi(setEventos, e+'sort='+ordenar+'&page[size]='+rowsPerPage+'&page[number]='+(page + 1))
        //setTotalEventos(eventos.meta.total)
        
    }, [])
    
    let evento = []
    if(eventos) {

        let listaEventos = eventos.data
        
        evento = listaEventos.map((e) => {
            return (
                <li key={e.id} className="lista_resultado">
                    <div className="container">
                        <a href={"/eventos/"+e.id}>
                        <h3>{e.attributes.titulo}</h3>
                        <p>{e.attributes.sobre.length > 200 ? e.attributes.sobre.substr(0, 200) + '...' : e.attributes.sobre}</p>
                        <p><a href={e.attributes.informacoes}>{e.attributes.informacoes}</a></p>
                        </a>
                    </div>
                </li>
            )
        })

    }

    return(
        <>
        <div className="container">
            <label>Procurar:</label>
            <input type="search" 
            onChange={(e) => handleSearch(e.target.value)}/>
        </div>
        <div className="container flex_container_space_around">
            <div className='container_select'>
                <label htmlFor='ordenar'>Ordenar resultados: </label>
                <select id="ordenar" onChange={(e) => handleOrdenar(e.target.value)}>
                    <option value="-id">Recentes</option>
                    <option value="id">Antigos</option>
                </select>
            </div>
            {eventos &&
            <>
                <div>
                    <TablePagination
                    component="div"
                    count={eventos.meta.total}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </> 
            
            }
        </div>

        <ul>{evento}</ul>

        </>
    )
}

export default EventosIndex