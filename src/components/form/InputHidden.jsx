
function InputHidden(props) {

    return(
        <input
        type="hidden"
        name={props.name}
        id={props.id}
        value={props.value}
        />
    )
}

export default InputHidden