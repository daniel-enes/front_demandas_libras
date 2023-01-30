import styles from './Input.module.css'

/*
* Props do componente Input
* label: rótulo para o elemento label do input do formulário;
* id: string que dá valor à propriedade id do elemento input;
* name: string que dá valor à propriedade name do elemento input;
* type: string que dá valor à propriedade type do elemento input;
* maxlength: string que dá valor à proriedade maxlength do elemento input;
* required: valor booleano. Se verdadeiro, dá valor à propriedade required do elemento input;
* idDescricao: string que dá valor à propriedades aria-describedby do elemento input e 
* a id da div 
* descricao: descricao textual do elemento input.
* handleChange: função atribuída ao evento onChange do input.
*/

function Input(props) {

    /*
    * Função inputFocus 
    * Função que adiciona uma classe CSS ao elemento pai, container do campo do formulário,
    * quando o campo de formulário recebe o foco. O efeito dessa classe é alterar a cor de
    * fundo do container.
    */ 
    const inputFocus = (e) =>  {
        const list = e.parentElement.classList
        list.add(styles.container_input_focus)
    }

    /*
    * Função inputBlur
    * Função que remove uma classe CSS ao elemento pai, container do campo do formulário,
    * quando o campo de formulário perde o foco. O efeito dessa classe é remover a cor de
    * fundo adicionada ao container.
    */
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
            <input
            onChange={(e) => props.handleChange(e.target)}
            onFocus={(e) => inputFocus(e.target)}
            onBlur={(e) => inputBlur(e.target)}
            type={props.type}
            name={props.name}
            id={props.id}
            min={props.min}
            max={props.max}
            maxlenght={props.maxlenght}
            required={props.required && "required"}
            aria-describedby={props.idDescricao}
            value={props.value}
            disabled={props.disabled && "disabled"}
            />
        </div>
    )
}

export default Input