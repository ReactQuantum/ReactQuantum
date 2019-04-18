import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import TreeComponent from './components/TreeComponent.jsx';
import Button from './components/Button';
import { Stats, StatsStyled } from './components/Stats';
import image from './assets/ReactQuantumLogo.png';

const WrapperStyled = styled.div`
  width: 100%;
  text-align: center;
`;

const ContentStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatsPanelStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 0.5px solid #ababab;
  margin: 10px;
  box-shadow: 1.5px 1.5px 1.5px 1.5px #ababab;
  width: 35em;
  height: 60em;
`;

const StatsWindowStyled = styled.div`
  border: none;
  height: 20em;
  width: 95%;
  overflow: auto;
  text-align: left;
  color: #595959;
  text-shadow: 1px 1px 2px #a3a3a3;
  font-size: 16px;
  font-family: "Trebuchet MS";
  margin: 1em;
  padding: 0.25em 1em;
  float: left;
`;


class App extends Component {
  constructor() {
    super();
    this.state = {
      nodeinfo: 5,
      startQuantum: false,
      // treeData: {
      //   name: 'PLEASE REFRESH PAGE',
      //   nodeSvgShape: { shapeProps: { fill: 'white' } },
      // },
      green: 0.005,
      lightGreen: 0.01,
      yellow: 0.05,
      orange: 0.1,
    };

    // this.updateTreeState = this.updateTreeState.bind(this);
    // this.grabNodeStats = this.grabNodeStats.bind(this);
    this.startQuantum = this.startQuantum.bind(this);
    chrome.devtools.panels.create('React Quantum', null, 'devtools.html');
  }


  componentDidMount() {
    const port = chrome.runtime.connect(null, { name: 'devTools' });
    const { tabId } = chrome.devtools.inspectedWindow;

    function post(message) {
      const newMessage = message;
      newMessage.tabId = tabId;
      port.postMessage(message);
    }
    post({ message: 'initialize' });
    port.onMessage.addListener((message) => {
      console.log("Devtools listening to message from content script", message)
      // This function subtracts children render time from its own render time to get individual render time
      // function addIndividualTime(treeDataArr) {
      //   //tree data from content script is being passed correctly
      //   const treeDataArrCopy = treeDataArr;
      //   for (let i = 0; i < treeDataArrCopy.length; i += 1) {
      //     if (treeDataArrCopy[i].memoizedProps) {
      //       treeDataArrCopy[i].memoizedProps = JSON.parse(treeDataArrCopy[i].memoizedProps);
      //     }
      //     if (treeDataArrCopy[i].renderTime === 0) {
      //       treeDataArrCopy[i].individualTime = 0;
      //     } else {
      //       let sumchildrenTime = 0;
      //       for (let j = 0; j < treeDataArrCopy[i].children.length; j += 1) {
      //         const currentNode = treeDataArrCopy[i].children[j];
      //         if (currentNode.renderTime === 0 && currentNode.children > 0) {
      //           for (let k = 0; k < currentNode.children.length; k += 1) {
      //             sumchildrenTime += currentNode.children[k].renderTime;
      //           }
      //         } else {
      //           sumchildrenTime += treeDataArrCopy[i].children[j].renderTime;
      //         }
      //       }
      //       treeDataArrCopy[i].individualTime = treeDataArrCopy[i].renderTime - sumchildrenTime;
      //     }
      //   }
      //   for (let i = 0; i < treeDataArrCopy.length; i += 1) {
      //     if (treeDataArrCopy[i].children.length > 0) {
      //       addIndividualTime(treeDataArrCopy[i].children);
      //     }
      //   }
      // }

      // Adds color based on render time of node relative to total render time of app
      // function addColor(treeDataArr, green, lightGreen, yellow, orange) {
      //   const totalTime = treeDataArr[0].renderTime;
      //   const workToBeDone = [treeDataArr[0]];
      //   while (workToBeDone.length > 0) {
      //     const percentTime = workToBeDone[0].individualTime / totalTime;
      //     if (percentTime < green) {
      //       workToBeDone[0].nodeSvgShape = { shape: 'ellipse', shapeProps: { rx: 20, ry: 20, fill: '#80b74c' } };
      //     } else if (percentTime < lightGreen) {
      //       workToBeDone[0].nodeSvgShape = { shape: 'ellipse', shapeProps: { rx: 20, ry: 20, fill: '#a1c94f' } };
      //     } else if (percentTime < yellow) {
      //       workToBeDone[0].nodeSvgShape = { shape: 'ellipse', shapeProps: { rx: 20, ry: 20, fill: '#e6cc38' } };
      //     } else if (percentTime < orange) {
      //       workToBeDone[0].nodeSvgShape = { shape: 'ellipse', shapeProps: { rx: 20, ry: 20, fill: '#f69d27' } };
      //     } else {
      //       workToBeDone[0].nodeSvgShape = { shape: 'ellipse', shapeProps: { rx: 20, ry: 20, fill: '#e74e2c' } };
      //     }
      //     for (let i = 0; i < workToBeDone[0].children.length; i += 1) {
      //       workToBeDone.push(workToBeDone[0].children[i]);
      //     }
      //     workToBeDone.shift();
      //   }
      //   return treeDataArr;
      // }

      // const {
      //   green, lightGreen, yellow, orange,
      // } = this.state;

      let tempTreeData = JSON.parse(message.message);
      tempTreeData = tempTreeData.children;
      // addIndividualTime(tempTreeData);
      // console.log('after add individual time##############################################', tempTreeData)
      // addColor(tempTreeData, green, lightGreen, yellow, orange);
      // console.log('after add color###############################################', tempTreeData)
      // //why did it not render immediately?

      this.setState({ treeData: tempTreeData })
    });
  }

  // // This fires off a message to the content script to start the program
  startQuantum() {
    const { tabId } = chrome.devtools.inspectedWindow;
    chrome.runtime.sendMessage({
      name: 'startQuantum',
      target: 'content',
      tabId,
    });

    this.setState({
      startQuantum: true
    });
  }

  // updateTreeState(treeDataArr) {
  //   this.setState({ treeData: treeDataArr });
  // }

  // grabNodeStats(stats) {
  //   this.setState({
  //     nodeinfo: {
  //       totalTime: stats.time, individualTime: stats.individualTime, name: stats.name, memoizedProps: stats.props, memoizedState: stats.memoizedState,
  //     },
  //   });
  // }

  render() {
    const {
      nodeinfo, treeData, green, lightGreen, yellow, orange, orientation, startQuantum,
    } = this.state;
    return (
      <WrapperStyled>
        <div>
          <img src={image} href="https://github.com/ReactQuantum/ReactQuantum" alt="" />
          {
            (startQuantum === false)
              ? (
                <div style={{
                  width: '100%', alignContent: 'center', display: 'flex', justifyContent: 'center',
                }}
                >
                  <Button
                    id="startQuantum"
                    clicked={this.startQuantum}
                    counter="Start Quantum"
                  />
                </div>
              )
              : (
                <div className="content">
                  <ContentStyled>
                    {/* <StatsPanelStyled>
                      <Stats stats={nodeinfo} />
                      <StatsStyled style={{ marginTop: '-10px' }}>
                        <h1>Current State:</h1>
                      </StatsStyled>
                      <StatsWindowStyled>
                        <ReactJson src={nodeinfo.memoizedState} />
                      </StatsWindowStyled>
                      <StatsStyled>
                        <h1>Props:</h1>
                      </StatsStyled>
                      <StatsWindowStyled>
                        <ReactJson src={nodeinfo.memoizedProps} />
                      </StatsWindowStyled>
                    </StatsPanelStyled> */}

                    <div style={{ width: '45%', height: '60em' }}>
                      <TreeComponent
                        // updateTreeState={this.updateTreeState}
                        // orientation={orientation}
                        treeData={this.state.treeData}
                      // grabNodeStats={this.grabNodeStats}
                      />
                      {/* <Tree treeData={this.state.treeData} width={600} height={500} />; */}

                    </div>
                  </ContentStyled>
                </div>
              )
          }

        </div>
      </WrapperStyled>

    );
  }
}


render(<App />, document.getElementById('root'));
