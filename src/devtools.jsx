import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import TreeComponent from './components/TreeComponent';
import Button from './components/Button';
import PercentColorInput from './components/PercentColorInput';
import Stats from './components/Stats';
import image from './assets/ReactQuantumLogo2.png';

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
  box-shadow: 2px 2px 2px 2px;
  width: 35em;
  height: 60em;
`;

const StatsWindowStyled = styled.div`
  border: 0.5px solid #ababab;
  height: 20em;
  width: 95%;
  overflow: auto;
  margin: 2.5%;
  text-align: left;
`;


class App extends Component {
  constructor() {
    super();
    this.state = {
      // orientation: 'vertical',
      nodeinfo: 5,
      startQuantum: false,
      treeData: {
        name: 'PLEASE REFRESH PAGE',
        nodeSvgShape: { shapeProps: { fill: 'white' } },
      },
      green: 0.005,
      lightGreen: 0.01,
      yellow: 0.05,
      orange: 0.1,
    };

    this.updateTreeState = this.updateTreeState.bind(this);
    this.grabNodeStats = this.grabNodeStats.bind(this);
    // this.changeOrientation = this.changeOrientation.bind(this);
    this.clicked = this.clicked.bind(this);
    this.startQuantum = this.startQuantum.bind(this);
    chrome.devtools.panels.create('React Quantum', null, 'devtools.html');
  }

  componentDidMount() {
    const port = chrome.runtime.connect(null, { name: 'devTools' });
    const { tabId } = chrome.devtools.inspectedWindow;

    function post(message) {
      message.tabId = tabId;
      port.postMessage(message);
    }
    post({ message: 'initialize' });
    port.onMessage.addListener((message) => {
      // function subtracts children render time from its own render time to get individual render time
      function addIndividualTime(treeDataArr) {
        for (let i = 0; i < treeDataArr.length; i += 1) {
          if (treeDataArr[i].memoizedProps) {
            treeDataArr[i].memoizedProps = JSON.parse(treeDataArr[i].memoizedProps);
          }
          if (treeDataArr[i].renderTime === 0) {
            treeDataArr[i].individualTime = 0;
          } else {
            let sumChildrenTime = 0;
            for (let j = 0; j < treeDataArr[i].children.length; j += 1) {
              const currentNode = treeDataArr[i].children[j];
              if (currentNode.renderTime === 0 && currentNode.children > 0) {
                for (let k = 0; k < currentNode.children.length; k += 1) {
                  sumChildrenTime += currentNode.children[k].renderTime;
                }
              } else {
                sumChildrenTime += treeDataArr[i].children[j].renderTime;
              }
            }
            console.log('in addIndividualTime', treeDataArr[i].name, treeDataArr[i].renderTime, sumChildrenTime);
            treeDataArr[i].individualTime = treeDataArr[i].renderTime - sumChildrenTime;
          }
        }
        for (let i = 0; i < treeDataArr.length; i += 1) {
          if (treeDataArr[i].children.length > 0) {
            addIndividualTime(treeDataArr[i].children);
          }
        }
      }

      // adds color based on render time of node relative to total render time of app
      function addColor(treeDataArr, green, lightGreen, yellow, orange) {
        const totalTime = treeDataArr[0].renderTime;
        const workToBeDone = [treeDataArr[0]];
        while (workToBeDone.length > 0) {
          const percentTime = workToBeDone[0].individualTime / totalTime;
          if (percentTime < green) {
            workToBeDone[0].nodeSvgShape = { shape: 'ellipse', shapeProps: { rx: 20, ry: 20, fill: '#80b74c' } };
          } else if (percentTime < lightGreen) {
            workToBeDone[0].nodeSvgShape = { shape: 'ellipse', shapeProps: { rx: 20, ry: 20, fill: '#a1c94f' } };
          } else if (percentTime < yellow) {
            workToBeDone[0].nodeSvgShape = { shape: 'ellipse', shapeProps: { rx: 20, ry: 20, fill: '#e6cc38' } };
          } else if (percentTime < orange) {
            workToBeDone[0].nodeSvgShape = { shape: 'ellipse', shapeProps: { rx: 20, ry: 20, fill: '#f69d27' } };
          } else {
            workToBeDone[0].nodeSvgShape = { shape: 'ellipse', shapeProps: { rx: 20, ry: 20, fill: '#e74e2c' } };
          }
          for (let i = 0; i < workToBeDone[0].children.length; i += 1) {
            workToBeDone.push(workToBeDone[0].children[i]);
          }
          workToBeDone.shift();
        }
        return treeDataArr;
      }

      const {
        green, lightGreen, yellow, orange,
      } = this.state;

      console.log('chrome.runtime.onMessage in devTools message:', message);
      let tempTreeData = JSON.parse(message.message);
      tempTreeData = tempTreeData[0].children;
      console.log('before addIndividualTime', tempTreeData);
      addIndividualTime(tempTreeData);
      console.log('after individualTime =============', tempTreeData);
      addColor(tempTreeData, green, lightGreen, yellow, orange);
      console.log('after addColor =============', tempTreeData);
      this.setState({ treeData: tempTreeData });
      console.log('after setState', this.state);
    });
  }

  startQuantum() {
    const { tabId } = chrome.devtools.inspectedWindow;
    chrome.runtime.sendMessage({
      name: 'startQuantum',
      target: 'content',
      tabId,
    });

    this.setState({
      startQuantum: true,
    });
  }

  updateTreeState(treeDataArr) {
    this.setState({ treeData: treeDataArr });
  }

  grabNodeStats(stats) {
    this.setState({ nodeinfo: { totalTime: stats.time, individualTime: stats.individualTime, name: stats.name, memoizedProps: stats.memoizedProps, memoizedState: stats.memoizedState } })
    console.log('grab node stats', stats)
  }

  clicked(e) {
    const counterI = `${e.target.id}counter`;
    const { counterId } = this.state;
    const counter = counterId + 1;
    const updateCounter = {};

    updateCounter[counterI] = counter;
    this.setState(updateCounter);
  }

  render() {
    console.log('render ------------');
    const {
      nodeinfo, treeData, green, lightGreen, yellow, orange, orientation, startQuantum,
    } = this.state;
    return (
      <WrapperStyled>
        <div>
          <img src={image} href="https://github.com/ReactQuantum/ReactQuantum" alt="" />

          {startQuantum === false
            ? <div style={{ width: '100%', alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
              <Button
                id={'startQuantum'}
                clicked={this.startQuantum}
                counter={this.state.startButton}>
              </Button>
            </div> :

            <div className='content'>
              <ContentStyled>
                <StatsPanelStyled>
                  <Stats stats={this.state.nodeinfo}></Stats>
                  <p>memoized props</p>
                  <StatsWindowStyled>
                    <ReactJson src={this.state.nodeinfo.memoizedProps} />
                  </StatsWindowStyled>
                  <p>memoized state</p>
                  <StatsWindowStyled>
                    <ReactJson src={this.state.nodeinfo.memoizedState} />
                  </StatsWindowStyled>
                </StatsPanelStyled>
                <div style={{ width: '35em', height: '60em' }}>
                  <PercentColorInput
                    treeData={treeData}
                    percentForGreen={green}
                    percentForLightGreen={lightGreen}
                    percentForYellow={yellow}
                    percentForOrange={orange}
                    updateTreeState={this.updateTreeState}
                  />
                  <TreeComponent
                    orientation={this.state.orientation}
                    treeData={this.state.treeData}
                    grabNodeStats={this.grabNodeStats}>
                  </TreeComponent>
                </div>
              </ContentStyled>
            </div>

          }

        </div>
      </WrapperStyled>

    );
  }
}


render(<App />, document.getElementById('root'));
