import React, { Component } from 'react';
import { render } from 'react-dom';
import TreeComponent from './components/TreeComponent'
import Button from './components/Button'


class App extends Component {
  constructor() {
    super();
    this.state = {
      button1counter: 0,
      button2counter: 0
    }

    this.clicked = this.clicked.bind(this)
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
    let port = chrome.runtime.connect({ name: 'dev-bg' });
    port.postMessage("yo wdup");
  }
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Button id={'button1'} clicked={this.clicked} counter={this.state.button1counter}></Button>
        <Button id={'button2'} clicked={this.clicked} counter={this.state.button2counter}></Button>
        <TreeComponent></TreeComponent>
      </div>

    )
  }
}

render(<App />, document.getElementById('root'));
