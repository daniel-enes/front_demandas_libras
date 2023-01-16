import styles from './Orientacao.module.css'

function Orientacao () {

    return(
        <div className={styles.orientacao} tabIndex="0">
            <h3>Orientações para preenchimento dos formulários</h3>
            <ul>
                <li>Os campos marcados com <span aria-hidden="true">*</span> (asterisco) são de preenchimento obrigatório.</li>
                <li>
                    Alguns campos contêm instruções marcados com <i className="material-icons" aria-label="informação">&#xe88f;</i> 
                    que orientam sobre como devem ser preenchidos.
                </li>     
            </ul>
        </div>

    ) 
}

export default Orientacao