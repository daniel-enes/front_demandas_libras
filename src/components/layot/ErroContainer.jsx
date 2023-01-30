
function ErroContainer(props) {

    return(
        <div id="erro" className='alert_erro display_none' role="alert">
            <h3 tabIndex="0" accessKey="r">{props.titulo}</h3>
            <ul>{props.erros}</ul>
        </div>
    )
}

export default ErroContainer