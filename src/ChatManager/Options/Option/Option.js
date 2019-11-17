import React from "react";
import "./Option.css"

const Option = (props) => {//this will render a users option 
    return (<p className="Option" onClick={props.onClick} key={props.key}>{props.children || " "}</p>)
}



export default Option