import React, { Component } from "react";
import Prompt from "./Prompt/Prompt";
import "./ChatManager.css";
import Options from "./Options/Options";
import json from "../promptsAndResponses/promptsAndResponses.json"



class ChatManager extends Component{ //this will manage danny's dialogue and options for the player to select
    constructor(props){
        super(props);
        this.state = {
            responses: json[1].responses,
            pointsTo: json[1].pointsTo,
            prompt: json[1].prompt,            
        };
    }

    updatePageWithPrompt = (userChoice) => { //finds the next prompt then updates page
        this.props.toggleDanny();
        let nextPrompt = json.find((obj) => {
            return this.state.pointsTo[userChoice] === obj.id //finds when the id of the prompt that matches the id corresponding the the users choice
        })
        if(nextPrompt === undefined){
            return json[0];
        }
        this.setState(nextPrompt);
    }


    render(){ 
        return (
            <div className="ChatManager">
                <Prompt message={this.state.prompt}></Prompt>
                <Options optionMessages={this.state.responses} clicked={this.updatePageWithPrompt}></Options>
            </div>
        )
    }
}

export default ChatManager;