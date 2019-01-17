import React, { Component } from 'react';
import { render } from 'react-dom';
import image from './public/reactQuantumLogo.png';

import TreeComponent from './components/TreeComponent'
import Stats from './components/Stats'

class App extends Component {
  constructor() {
    super();
    this.state = {
      button1counter: 0,
      button2counter: 0,
      nodeinfo: 5
    }

    this.grabNodeStats = this.grabNodeStats.bind(this);
    this.clicked = this.clicked.bind(this);
    chrome.devtools.panels.create("React Quantum", null, "devtools.html");
  }
  clicked(e) {
    let counterId = `${e.target.id}counter`
    let counter = this.state[counterId] + 1

    let updateCounter = {}
    updateCounter[counterId] = counter
    this.setState(updateCounter)

  }
  componentDidMount() {
    console.log("Component DID IN FACT mount")
    let port = chrome.runtime.connect({ name: 'dev-bg' });
    port.postMessage({
      name: 'devtool',
      tabId: chrome.devtools.inspectedWindow.tabId
    });
    port.onMessage.addListener(message => {
      console.log("from devtool", message)
    })
  }
  grabNodeStats(stats) {
    this.setState({ nodeinfo: stats })
  }
  grabNodeStats(stats) {
    this.setState({ nodeinfo: stats })
  }

  render() {
    return (
      <div> 
        <img src={image} />
        <TreeComponent grabNodeStats={this.grabNodeStats}></TreeComponent>
        <Stats stats={this.state.nodeinfo}></Stats>
      </div>

    )
  }
}

render(<App />, document.getElementById('root'));
