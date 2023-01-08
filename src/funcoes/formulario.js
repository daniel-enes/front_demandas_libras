import { urlApi } from "../config"
import styles from "../components/form/Input.module.css"

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
function postApi(setDados, dados, uri) {
        
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
        setDados(data)
    })
    .catch((err) => console.log(err))
}

/*
    * Função inputFocus 
    * Função que adiciona uma classe CSS ao elemento pai, container do campo do formulário,
    * quando o campo de formulário recebe o foco. O efeito dessa classe é alterar a cor de
    * fundo do container.
    */ 
const inputFocus = (e) =>  {
    const list = e.parentElement.classList
    list.add(styles.container_input_focus)
}

/*
* Função inputBlur
* Função que remove uma classe CSS ao elemento pai, container do campo do formulário,
* quando o campo de formulário perde o foco. O efeito dessa classe é remover a cor de
* fundo adicionada ao container.
*/
const inputBlur = (e) => {
    const list = e.parentElement.classList
    list.remove(styles.container_input_focus) 
}

export {postApi, updateAPI, inputFocus, inputBlur}