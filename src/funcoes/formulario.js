import { urlApi } from "../config"
import styles from "../components/form/Input.module.css"

function updateAPI(setDados, dados, uri) {
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
        setDados(dados)
    })
    .catch((err) => console.log(err))
}

function postApi(setDados, dados, uri) {

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

/* 
* Função que limpa os campos do formulário
*/
const cleanFields = () => {
    let selects = document.querySelectorAll('select')
    let inputs = document.querySelectorAll('input')
    let textareas = document.querySelectorAll('textarea')
    for(let input of inputs) {
        input.value = ''
    }
    for(let select of selects) {
        select.value = ''
    }
    for(let textarea of textareas) {
        textarea.value = ''
    }
}

/*
* const campos = {
*        nome: {rotulo: 'Nome', mensagem: []}, 
*        telefone: {rotulo: 'Telefone', mensagem: []}
*    }
*/

const manipulaErros = (erros, campos) => {
    for(let erro of erros) {
        if(!campos[erro.field].mensagem.includes(erro.message)) {
            campos[erro.field].mensagem.push(erro.message)
        }
        
    }
    return mensagemErro(campos)
}

const mensagemErro = (campos) => {
    let erros = []
    for(let campo in campos) {
        if(campos[campo].mensagem) {
            for(let mensagem of campos[campo].mensagem) {
                erros.push(<li key={campo}><a href={'#'+campo}><b>{campos[campo].rotulo}</b>: {mensagem}</a></li>)
            }
        }
    }
    return erros
}

export {postApi, getApi, updateAPI, inputFocus, inputBlur, cleanFields, manipulaErros}