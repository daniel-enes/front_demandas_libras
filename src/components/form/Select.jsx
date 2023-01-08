import styles from './Input.module.css'
import {inputFocus, inputBlur} from '../../funcoes/formulario.js'

/*
<option>- Selecione uma opção -</option>
<option value="estudante">Estudante</option>
<option value="técnico">Técnico</option>
<option value="docente">Docente</option>
*/

function Select(props) {

    // Recebe uma array com valores para serem inseridos no objeto option
    const valores = props.valores

    const options = valores.map(
        (valor) => {
            return <option key={valor} value={valor}>{valor}</option>
        }
    )

    return (
        <div className={styles.container_input}>
            <label htmlFor={props.id}>
                {props.required && (
                    <i aria-label="obrigatório">* </i>
                )}
                {props.label}
            </label>
            { props.descricao &&
            <div className={styles.input_descricao} id={props.idDescricao}>
                <div>
                    <i className="material-icons" aria-label="informação">&#xe88f;</i>
                </div>
                <div> 
                    {props.descricao}
                </div>
            </div>
            }
            <select
            onChange={(e) => props.handleChange(e.target)}
            onFocus={(e) => inputFocus(e.target)}
            onBlur={(e) => inputBlur(e.target)}
            name={props.name}
            id={props.id}
            required={props.required}
            value={props.value}
            aria-describedby={props.idDescricao}
            >
                <option value="">- Selecione uma opção -</option>
                {options}
            </select>
        </div>
    )
}

export default Select