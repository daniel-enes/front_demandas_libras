const validacaoResponsavel = {
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
    ocupacao: {
        type: 'enum',
        enum: ['estudante', 'docente', 'técnico']
    },
    registro: {
        required: false,
        type: 'number'
    }
}

export {validacaoResponsavel}