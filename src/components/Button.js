const Button = (props) => {
    const colorStyles = props.color === 2
        ? {backgroundColor: 'white', color: 'black'}
        : {backgroundColor: 'black', color: 'white'}

    return <button className={"Button"}
                   style={colorStyles}
                   onClick={props.click}>
        {props.children}
    </button>
}

export default Button