import React from "react";
import "./Prompt.css"

const Prompt = (props) => {
    let message = props.message.split('\n').map((item) => {//find if theres a newline 
        return (<p>{item}<br/></p>)
    });

    return(<p className = "Prompt">{message}</p>);
}

export default Prompt;