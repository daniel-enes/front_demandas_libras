import styles from "./Button.module.css"

function Button() {

    return (
        <div className={styles.container_submit}>
            <button type="submit" className={styles.botao}>Enviar</button>
        </div>
    )
}

export default Button