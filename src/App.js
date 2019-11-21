import React, { Component }from 'react';
import ChatManager from "./ChatManager/ChatManager";
import "./App.css";
import dannyGif from "./DannyImages/dannypixelated.gif";
import dannyIMG from "./DannyImages/dannyMouthClosedEgg.gif"

class App extends Component {
  constructor(){
    super();
    this.state = {
      dannyPic : null
    }
  }

  toggleDanny = (time) => { //when the user selects something danny needs to speak and stop again
    let updatedState = {...this.state, dannyPic: dannyGif};
    this.setState(updatedState);

    console.log(`[app.js toggleDanny] time: ${time}`)

    setTimeout( () => {
      let updatedState = {...this.state, dannyPic: dannyIMG}
      this.setState(updatedState);
    }, time);
  }


  render(){
    return (
      <div className="App">
        <img className="dannyIMG" alt="dannyIMG" src={this.state.dannyPic}></img>
        <ChatManager toggleDanny={this.toggleDanny}></ChatManager>
      </div>
    );
  }
  
}

export default App;
