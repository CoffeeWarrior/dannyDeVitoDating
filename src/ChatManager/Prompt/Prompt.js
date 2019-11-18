import React from "react";
import "./Prompt.css"

const Prompt = (props, index) => {
    let message = props.message.split('\n').map((item) => {//find if theres a newline 
        return (<p key = {index}>{item}<br/></p>)
    });

    return(<p className = "Prompt">{message}</p>);
}

export default Prompt;