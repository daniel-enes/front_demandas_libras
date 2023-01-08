import styles from './Input.module.css'
import {inputFocus, inputBlur} from '../../funcoes/formulario.js'

function Textarea(props) {

    return(
        <>
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
            <textarea
                onChange={(e) => props.handleChange(e.target)}
                onFocus={(e) => inputFocus(e.target)}
                onBlur={(e) => inputBlur(e.target)} 
                name={props.name}
                id={props.id}
                maxlenght={props.maxlenght}
                required={props.required && "required"}
                aria-describedby={props.idDescricao}
                value={props.value}
                disabled={props.disabled && "disabled"}
            />
            </div>
        </>
    )
}

export default Textarea