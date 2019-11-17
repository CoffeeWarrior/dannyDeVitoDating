import React from "react";
import Option from "./Option/Option";

const Options = (props) => { //this will return a list of options
    let options = props.optionMessages.map((message, index) => {
            return <Option key={index} onClick={()=> props.clicked(index)}>{message}</Option>
        })
    return options;
}

export default Options;