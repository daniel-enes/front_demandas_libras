import styles from './Orientacao.module.css'

function Orientacao () {

    return(
        <div className={styles.orientacao}>
            <div className='container' tabIndex="0">
                <h3>Orientações para preenchimento dos formulários</h3>
                <ul>
                    <li>Os campos marcados com <span aria-hidden="true">*</span> (asterisco) são de preenchimento obrigatório.</li>
                    <li>
                        Alguns campos contêm instruções marcados com <i className="material-icons" aria-label="informação">&#xe88f;</i> 
                        que orientam sobre como devem ser preenchidos.
                    </li>
                    <li>Ao exibir erros de validação do formulário, pode-se acessar o box com a tecla de atalho <kbd>r</kbd>.
                    <br />
                    Verifique qual é a combinação de teclas suportada pelo seu navegador. Exemplos: <br />
                    Google Chrome: <kbd>Alt</kbd> + <kbd>r</kbd> <br />
                    Mozila Firefox: <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>r</kbd>
                    </li>     
                </ul>
            </div>
        </div>
    ) 
}

export default Orientacao