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
      treeData: null,
      green: 0.005,
      lightGreen: 0.01,
      yellow: 0.05,
      orange: 0.1,
    };

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

      let tempTreeData = JSON.parse(message.message);
      tempTreeData = tempTreeData.children;
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


  render() {
    const { startQuantum } = this.state;
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
                    <div style={{ width: '45%', height: '60em' }}>
                      <TreeComponent
                        treeData={this.state.treeData}
                      />
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
