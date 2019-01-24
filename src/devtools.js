import React, { Component } from 'react';
import { render } from 'react-dom';
// import  './devtools.css';
import TreeComponent from './components/TreeComponent'
import Stats from './components/Stats'
import Button from './components/Button'
import { resolve } from 'path';

let tempTreeData = {
  name: 'Dummy',
  renderTime: '100000ms',
}

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
        name: 'placeholder',
        time: '10ms',
      }
    }
    // this.addIndividualTime = this.addIndividualTime.bind(this);
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
      this.setState({orientation: 'horizontal'})
    } else {
      this.setState({orientation: 'vertical'})
    }
  }

  grabNodeStats(stats) {
    this.setState({ nodeinfo: {totalTime: stats.time, individualTime: stats.individualTime, name: stats.name }})
    console.log(stats)
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
      function addIndividualTime(treeDataArr) {
        for (let i = 0; i < treeDataArr.length; i++) {
          if (treeDataArr[i].renderTime === 0) {
            treeDataArr[i].individualTime === 0
          } else {
            let sumChildrenTime = 0;
            for (var j = 0; j < treeDataArr[i].children.length; j++) {
              // if (chid time = 0) {logic to add time of children of child}
              sumChildrenTime += treeDataArr[i].children[j].renderTime
            }
            treeDataArr[i].individualTime = treeDataArr[i].renderTime - sumChildrenTime;
          }
        }
        for (let i = 0; i < treeDataArr.length; i++) {
          if (treeDataArr[i].children.length > 0) {
            addIndividualTime(treeDataArr[i].children)
          }
        }
      }
      console.log("chrome.runtime.onMessage in devTools message:", message)
      let tempTreeData = JSON.parse(message.message);
      tempTreeData[0].name = 'root';
      console.log('before addIndividualTime', this, this.addIndividualTime, this.componentDidMount.addIndividualTime);
      addIndividualTime(tempTreeData);
      console.log('after individualTime =============', tempTreeData);
      this.setState({treeData: tempTreeData})
      console.log('after setState', this.state)

      // console.log("----------------------------11")
      // console.log("----------------------------22")
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


  componentDidUpdate() {
  }





  render() {
    console.log('render ------------');
    return (
      <div>
        <h1 style={{color:'blue'}}>React Quantum</h1>
        {this.state.startQuantum === false ?
          <div>
            <Button
              id={'startQuantum'}
              clicked={this.startQuantum}
              counter={this.state.startButton}>
            </Button>
          </div> :
          <div className='content'>
            <Button
              id={'button1'}
              clicked={this.clicked}
              counter={this.state.button1counter}>
            </Button>
            <Button
              id={'button2'}
              clicked={this.changeOrientation}
              counter='Orientation'>
            </Button>
            <Stats stats={this.state.nodeinfo}></Stats>
            <TreeComponent
              orientation={this.state.orientation}
              treeData={this.state.treeData}
              grabNodeStats={this.grabNodeStats}>
            </TreeComponent>
          </div>
        }
      </div >

    )
  }
}


render(<App />, document.getElementById('root'));
