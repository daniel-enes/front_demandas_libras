import { urlApi } from "../config"

/*
* Função handleChange
* Função de manipulação dos dados advindos do formulário
* @campo = recebe o campo do formulário que terá suas propridades name e value acessadas

const handleChange = (campo) => {
    const nome = campo.name
    const valor = campo.value
    setDados({ ...dados , [nome] : valor})
}
*/

function updateAPI(dados, uri) {
    fetch(urlApi+uri, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            'Access-Control-Allow-Origin': 'http://192.168.1.66:3000',
            //'Content-type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
    .then((data) => {
        console.log(data)
        //redirect aqui
    })
    .catch((err) => console.log(err))
}

/*
* Função criarResponsavel
* Função responsável pelo envio de dados para o backend
* @responsavel = recebe um objeto contendo os dados definidos através do formulários
* @uri = caminho da api para onde são enviado os dados. Deve ser uma string.
* Exemplo: "/responsaveis"
*/
function postApi(dados, uri) {
        
    // const navigate = Navigate()

    fetch(urlApi+uri, {
        method: 'POST',
        headers: {
            'Content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            'Access-Control-Allow-Origin': 'http://192.168.1.66:3000',
            //'Content-type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
    .then((data) => {
        console.log(data)
        //redirect aqui
    })
    .catch((err) => console.log(err))
}


export {postApi, updateAPI}