/*
*   Função: errrosValidacao
*   parâmetros: erros, rotulos
*   @erros: objeto errors oriundo do pacote async-validator
*   @rotulos: matriz com dois elementos em cada vetor, 
*   (1) nome do campo do formulario e
*   (2) rótulo do campo do formulário
*   
*** Exemplo de rotulos ***
*
*    const rotulos = 
*    [
*        ['titulo', 'Título do evento'],
*        ['sobre', 'Sobre o evento'],
*        ['informacoes', 'Mais informações'],
*    ]
*/

const errosValidacao = (erros, rotulos) => {
    
    let estruturaErros = {}

    function constroiEstruturaErros(value, index, array) {
        
        estruturaErros[value[0]] = {
            'rotulo' : value[1],
            'mensagem' : [],
        }
    }

    rotulos.forEach(constroiEstruturaErros)

    for(let erro of erros) {
        estruturaErros[erro.field].mensagem.push(erro.message)
    }
    
    let listaErros = []

    for(let campo in estruturaErros) {
        if(estruturaErros[campo].mensagem) {
            for(let i = 0; i < estruturaErros[campo].mensagem.length; i++) {
                listaErros.push(
                    <li key={campo+i}>
                        <a href={"#"+campo}>
                            <b>{estruturaErros[campo].rotulo}</b>: {estruturaErros[campo].mensagem}
                        </a>
                    </li>
                )
            }
        }
    }
    return listaErros
}

export { errosValidacao }