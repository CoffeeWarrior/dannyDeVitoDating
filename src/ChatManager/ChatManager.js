import React, { Component } from "react";
import Prompt from "./Prompt/Prompt";
import "./ChatManager.css";
import Options from "./Options/Options";
import json from "../promptsAndResponses/promptsAndResponses.json"

const TIME_PER_LETTER = 1;

class ChatManager extends Component{ //this will manage danny's dialogue and options for the player to select
    constructor(props){
        super(props);
        this.state = {
            responses: json[1].responses,
            pointsTo: json[1].pointsTo,
            prompt: json[1].prompt,            
            promptOutput: "", 
            dannySpeakTime: json[1].prompt.length*TIME_PER_LETTER
        };
    }

    onUserSelection = (userChoice) => { //finds the next prompt then updates page
        let nextPrompt = json.find((obj) => {
            return this.state.pointsTo[userChoice] === obj.id //finds when the id of the prompt that matches the id corresponding the the users choice
        })
        if(nextPrompt === undefined){
            return json[0];
        }
        nextPrompt.clickable = false; //on user selection the options must be disabled again
        nextPrompt.dannySpeakTime = TIME_PER_LETTER*nextPrompt.prompt.length
        this.setState(nextPrompt, () => {this.typeWriter()});
        
    }

    updateClickable = (time) => { //this function will set a timer to re-enable the buttons after danny finishes talking
        let clickableTimer = setInterval(() => {
            this.setState({clickable: true})
            clearInterval(clickableTimer);
        }, time)
    }

    typeWriter = () => { //will output text leter-by-letter like videogame
        this.props.toggleDanny(this.state.dannySpeakTime);      //toggle danny to speak with amt of time relative to letters
        console.log(`[ChatManager.js typeWriter()] time:${this.state.dannySpeakTime}`)
        this.updateClickable(this.state.dannySpeakTime);        //toggle button on after time relative to letters
        this.setState({promptOutput: ""});
        let textTimer = setInterval(() => {
            if(this.state.promptOutput === this.state.prompt){
                return clearInterval(textTimer)
            }
            let promptOutput = this.state.promptOutput;
            let updatedPromptOutput = promptOutput + this.state.prompt[promptOutput.length]
            this.setState({promptOutput: updatedPromptOutput});
        }, TIME_PER_LETTER)
        
    }

    componentDidMount(){
        this.typeWriter(); //text must be output in videogame fashion intially
        this.updateClickable(this.state.dannySpeakTime); //after danny speaks initially the options must be enabled
    }

    render(){ 
        return (
            <div className="ChatManager">
                <Prompt message={this.state.promptOutput}></Prompt>
                <Options clickable={this.state.clickable} optionMessages={this.state.responses} clicked={this.onUserSelection}></Options>
            </div>
        )
    }
}

export default ChatManager;