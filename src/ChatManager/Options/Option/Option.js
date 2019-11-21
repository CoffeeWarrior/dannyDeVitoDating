import React from "react";
import "./Option.css"

const Option = (props) => {//this will render a users option 
    return (<p className="Option" onClick={props.clickable? props.onClick:null} key={props.id}>{props.clickable?props.children || " ":null}</p>)
}



export default Option