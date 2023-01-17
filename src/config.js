//const urlApi = "http://localhost:5000";

const urlApi = "http://127.0.0.1:8000" //Laravel

// Tradução das mensagens de erro para validação
const dicionarioValidacao = {
    required: 'preenchimento obrigatório.',
    types: {
        email: 'deve ser preenchido com um endereço de email',
        integer: 'deve ser preenchido apenas com números.',
        number: 'deve ser preenchido apenas com números.',
        url: 'deve ser uma url. Exemplo: http://seusite/com'
    }
}

export {urlApi, dicionarioValidacao};