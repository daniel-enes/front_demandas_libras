function Button(props) {

    return (
        <div className="container_submit">
            <button type="submit" className={props.className}>{props.children}</button>
        </div>
    )
}

export default Button