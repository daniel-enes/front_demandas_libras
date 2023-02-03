const validacaoInterprete = {
    nome: {
        type: 'string',
        required: true,
    },
    telefone: {
        type: 'number',
        required: true,
    },
    email: {
        type: 'email',
        required: true,
    },
}

export { validacaoInterprete }