function validacaoHorario(dados) {
    const validacaoHorario = {
        modalidade: {
            enum: ['remoto', 'presencial com transmissão', 'presencial sem transmissão'],
            required: true,
        },
        dia: [
            {
                type: 'date',
                required: true,
            },
            {
                validator(rule, value, callback, source, options) {
                    const errors= []
                    let dataAtual = new Date().getTime()
                    let dataFormulario = new Date(dados.dia).getTime()

                    if(dataFormulario < dataAtual) {
                        errors.push(new Error("a data do evento não deve ser de um dia que já decorreu."))
                    }
                    return errors
                }
            }
        ],
        inicia: {
            type: 'string',
            required: true,
        },
        termina: [
            {type: 'string', required: true,},
            {
                validator(rule, value, callback, source, options) {
                    const errors= []
                    let inicia = dados.inicia
                    let termina = dados.termina
                    if(termina < inicia) {
                        errors.push(new Error("deve ser maior do que o horário informado no campo 'Horário inicial'."))
                    }
                    return errors
                }
            }
        ],
        local: {
            type: 'string',
            required: false,
        },
        material: {
            type: 'url',
            required: false,
        },
        observacoes: {
            type: 'string',
            required: false,
        }
    }
    return validacaoHorario
}
export { validacaoHorario }