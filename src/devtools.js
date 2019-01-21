import React, { Component } from 'react';
import { render } from 'react-dom';

import TreeComponent from './components/TreeComponent'
import Stats from './components/Stats'
import Button from './components/Button'

let tempTreeData = {
  name: 'Dummy',
  time: '100000ms',
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      button1counter: 0,
      button2counter: 0,
      orientation: 'vertical',
      nodeinfo: 5,
      treeData: {
        name: 'Level 2: C',
        time: '100000ms',
        children: [
          {name: 'Level 3C: A', time: '101ms'},
          {name: 'Level 3C: B', time: '102ms', nodeSvgShape: {shapeProps: {width: 20, height: 20, x: -10, y: -10, fill: 'green'}}},
          {name: 'Level 3C: C', time: '103ms'},
          {name: 'Level 3C: D', time: '120ms'},
          {name: 'Level 3C: E', time: '1111ms'}
        ]
      }
    }

    this.grabNodeStats = this.grabNodeStats.bind(this);
    this.changeOrientation = this.changeOrientation.bind(this);
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

  changeOrientation() {
    if (this.state.orientation === 'vertical') {
      this.setState({orientation: 'horizontal'})
    } else {
      this.setState({orientation: 'vertical'})
    }
  }

  grabNodeStats(stats) {
    this.setState({ nodeinfo: {time: stats.time, name: stats.name }})
  }

  componentDidMount() {
    console.log("Component DID IN FACT mount")
    let port = chrome.runtime.connect({ name: 'dev-bg' });
    console.log("port open", port)
    port.postMessage({
      name: 'initialize',
      tabId: chrome.devtools.inspectedWindow.tabId
    });
    port.onMessage.addListener(message => {
      console.log("from devtool", message.message);
      let tree = message.message[0];
      tree.name = 'root';
      console.log('new tree data', tree);
      tempTreeData = tree;
      this.setState({treeData: tempTreeData});
      console.log("after setState", this.state);

    })
  }

  componentDidUpdate() {
  }





  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Button id={'button1'} clicked={this.clicked} counter={this.state.button1counter}></Button>
        <Button id={'button2'} clicked={this.changeOrientation} counter='Orientation'></Button>
        <Stats stats={this.state.nodeinfo}></Stats>
        <TreeComponent orientation={this.state.orientation} treeData={this.state.treeData} grabNodeStats={this.grabNodeStats}></TreeComponent>
      </div>

    )
  }
}


render(<App />, document.getElementById('root'));
