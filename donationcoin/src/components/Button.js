const Button = ({buttonname, onClick}) => {
    // const click = () => {
    //     buttonname === "donator" ? console.log("donator") : console.log("charity")
    // }
    return (
        <button className="bigbutton" onClick={onClick}>
            {buttonname}
        </button>
    )
}

export default Button
