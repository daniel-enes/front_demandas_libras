const validacaoEvento = {
    titulo: {
        type: 'string',
        required: true,
    },
    sobre: {
        type: 'string',
        required: true,
    },
    informacoes: {
        type: 'url',
        required: false,
    },
}

export { validacaoEvento }