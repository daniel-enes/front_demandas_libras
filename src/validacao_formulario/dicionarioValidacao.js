// Tradução das mensagens de erro para validação
const dicionarioValidacao = {
    required: 'preenchimento obrigatório.',
    types: {
        email: 'deve ser preenchido com um endereço de email',
        integer: 'deve ser preenchido apenas com números.',
        number: 'deve ser preenchido apenas com números.',
        url: 'deve ser uma url. Exemplo: http://seusite.com.br'
    }
}

export {dicionarioValidacao}