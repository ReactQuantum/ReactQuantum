import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    }

    this.clicked = this.clicked.bind(this)
    chrome.devtools.panels.create("Ceveritas", null, "devtools.html");
  }
  clicked() {
    let counter = this.state.counter + 1
    console.log(counter)
    this.setState({
      counter: counter
    })
  }
  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <button onClick={this.clicked} style={{ width: 75, height: 45 }}>{this.state.counter}</button>
      </div>

    )
  }
}

render(<App />, document.getElementById('root'));
