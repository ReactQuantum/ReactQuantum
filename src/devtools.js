import React, { Component } from 'react';
import { render } from 'react-dom';

import TreeComponent from './components/TreeComponent'
import Stats from './components/Stats'
import Button from './components/Button'
import { resolve } from 'path';

class App extends Component {
  constructor() {
    super();
    this.state = {
      button1counter: 0,
      button2counter: 0,
      startButton: 'Start Quantum',
      orientation: 'vertical',
      nodeinfo: 5,
      startQuantum: false,
      treeData: {
        name: 'Level 2: C',
        time: '100000ms',
        children: [
          { name: 'Level 3C: A', time: '101ms' },
          { name: 'Level 3C: B', time: '102ms', nodeSvgShape: { shapeProps: { width: 20, height: 20, x: -10, y: -10, fill: 'green' } } },
          { name: 'Level 3C: C', time: '103ms' },
          { name: 'Level 3C: D', time: '120ms' },
          { name: 'Level 3C: E', time: '1111ms' }
        ]
      }
    }

    this.grabNodeStats = this.grabNodeStats.bind(this);
    this.changeOrientation = this.changeOrientation.bind(this);
    this.clicked = this.clicked.bind(this);
    this.startQuantum = this.startQuantum.bind(this)
    chrome.devtools.panels.create("React Quantum", null, "devtools.html");
  }

  clicked(e) {
    let counterId = `${e.target.id}counter`
    let counter = this.state[counterId] + 1

    let updateCounter = {}
    updateCounter[counterId] = counter
    this.setState(updateCounter)

  }

  changeOrientation() {
    if (this.state.orientation === 'vertical') {
      this.setState({ orientation: 'horizontal' })
    } else {
      this.setState({ orientation: 'vertical' })
    }
  }
  componentDidMount() {
    let port = chrome.runtime.connect(null, { name: "devTools" });
    let tabId = chrome.devtools.inspectedWindow.tabId;
    console.log(port, tabId)
    function post(message) {
      message.tabId = tabId;
      port.postMessage(message);
    }
    post({ message: 'initialize' })
    // console.log(port)
    // port.postMessage({
    //   message: 'initialize',
    //   tabId: chrome.devtools.inspectedWindow.tabId
    // })

    port.onMessage.addListener(message => {
      console.log("chrome.runtime.onMessage in devTools message:", message)
    })
  }
  startQuantum(e) {
    let tabId = chrome.devtools.inspectedWindow.tabId;
    console.log("clicked", tabId)
    chrome.runtime.sendMessage({
      name: "startQuantum",
      target: "content",
      tabId: tabId
    });
    this.setState({
      startQuantum: true
    })
  }


  grabNodeStats(stats) {
    this.setState({ nodeinfo: { time: stats.time, name: stats.name } })
  }


  render() {

    return (
      <div>
        {this.state.startQuantum === false ?
          <div>
            <h1>React Quantum</h1>
            <Button id={'startQuantum'} clicked={this.startQuantum} counter={this.state.startButton}></Button>
          </div> :
          <div>
            <h1>React Quantum</h1>
            <Button id={'button1'} clicked={this.clicked} counter={this.state.button1counter}></Button>
            <Button id={'button2'} clicked={this.changeOrientation} counter='Orientation'></Button>
            <Stats stats={this.state.nodeinfo}></Stats>
            <TreeComponent orientation={this.state.orientation} treeData={this.state.treeData} grabNodeStats={this.grabNodeStats}></TreeComponent>
          </div>
        }
      </div >

    )
  }
}


render(<App />, document.getElementById('root'));
