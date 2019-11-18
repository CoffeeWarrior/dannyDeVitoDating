import React from "react";
import Option from "./Option/Option";

const Options = (props) => { //this will return a list of options
    let options = props.optionMessages.map((message, index) => {
            return <Option key={index} id={index} onClick={()=> props.clicked(index)} clickable={props.clickable}>{message}</Option>
        })
    return options;
}

export default Options;