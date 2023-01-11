function Button(props) {

    const click = () => {
        props.setState(props.state)
    }

    return (
        <div className="container_submit">
            <button onClick={() => click()} type="submit" className={props.className}>{props.children}</button>
        </div>
    )
}

export default Button