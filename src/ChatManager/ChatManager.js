import React, { Component } from "react";
import Prompt from "./Prompt/Prompt";
import "./ChatManager.css";
import Options from "./Options/Options";
import json from "../promptsAndResponses/promptsAndResponses.json"

const DANNYGIFLENGTH = 3000

class ChatManager extends Component{ //this will manage danny's dialogue and options for the player to select
    constructor(props){
        super(props);
        this.state = {
            responses: json[1].responses,
            pointsTo: json[1].pointsTo,
            prompt: json[1].prompt,            
            promptOutput: ""
        };
    }

    onUserSelection = (userChoice) => { //finds the next prompt then updates page
        this.props.toggleDanny();
        let nextPrompt = json.find((obj) => {
            return this.state.pointsTo[userChoice] === obj.id //finds when the id of the prompt that matches the id corresponding the the users choice
        })
        if(nextPrompt === undefined){
            return json[0];
        }
        nextPrompt.clickable = false; //on user selection the options must be disabled again
        this.setState(nextPrompt, this.typeWriter());
        this.updateClickable();
    }

    updateClickable = () => { //this function will set a timer to re-enable the buttons after danny finishes talking
        let clickableTimer = setInterval(() => {
            this.setState({clickable: true})
            clearInterval(clickableTimer);
        }, DANNYGIFLENGTH)
    }

    typeWriter = () => { //will output text leter-by-letter like videogame
        this.setState({promptOutput: ""});
        let textTimer = setInterval(() => {
            if(this.state.promptOutput === this.state.prompt){
                return clearInterval(textTimer)
            }
            let promptOutput = this.state.promptOutput;
            let updatedPromptOutput = promptOutput + this.state.prompt[promptOutput.length]
            this.setState({promptOutput: updatedPromptOutput});
        }, 75)
        
    }

    componentDidMount(){
        this.typeWriter(); //text must be output in videogame fashion intially
        this.updateClickable(); //after danny speaks initially the options must be enabled
    }

    render(){ 
        return (
            <div className="ChatManager">
                <Prompt message={this.state.promptOutput}></Prompt>
                <Options clickable={this.state.clickable}optionMessages={this.state.responses} clicked={this.onUserSelection}></Options>
            </div>
        )
    }
}

export default ChatManager;