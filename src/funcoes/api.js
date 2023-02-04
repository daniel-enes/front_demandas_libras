import { urlApi } from "../config"

/* 
* Função 'getApi'
* Descrição: Função get que busca os dados com o servidor
* Parâmetro: setDados, uri
* @setDados = useState que armazena os dados recuperados no servidos
* @uri = uri da api
*/
function getApi(setDados, uri) {
    fetch(urlApi+uri, {
        method: 'GET',
        headers: {
            'Content-type': 'application/vnd.api+json',
        },
    })
    .then(resp => resp.json())
    .then((data) => {
        setDados(data)
    })
    .catch((err) => console.log(err))
}

function updateAPI(dados, uri) {
    fetch(urlApi+uri, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
        },
        body: JSON.stringify(dados)
    })
    .then(resp => {
            if(resp.status == 204) {
                console.log(resp)
            }
        }
    )
    .catch((err) => console.log(err))
}

function postApi(setDados, dados, uri) {

    fetch(urlApi+uri, {
        method: 'POST',
        headers: {
            'Content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
        },
        body: JSON.stringify(dados)
    })
    .then(
        resp => resp.json()
    )
    .then((data) => {
        console.log(data)
        setDados(data)
    })
    .catch((err) => console.log(err))
}

export { getApi, updateAPI, postApi }