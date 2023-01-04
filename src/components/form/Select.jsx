import styles from './Input.module.css'

function Select(props) {

    const inputFocus = (e) =>  {
        const list = e.parentElement.classList
        list.add(styles.container_input_focus) 
    }

    const inputBlur = (e) => {
        const list = e.parentElement.classList
        list.remove(styles.container_input_focus) 
    }

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
            maxlenght={props.maxlenght}
            required={props.required}
            value={props.value}
            aria-describedby={props.idDescricao}
            >
                <option>- Selecione uma opção -</option>
                <option value="estudante">Estudante</option>
                <option value="técnico">Técnico</option>
                <option value="docente">Docente</option>
            </select>
        </div>
    )
}

export default Select