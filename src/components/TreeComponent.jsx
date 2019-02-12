import React from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components';
import PercentColorInput from './PercentColorInput';


const OrientationButtonStyled = styled.div`
-moz-box-shadow: 3px 4px 0px 0px #3dc21b;
-webkit-box-shadow: 3px 4px 0px 0px #3dc21b;
box-shadow: 3px 4px 0px 0px #3dc21b;
background-color:#44c767;
-moz-border-radius:42px;
-webkit-border-radius:42px;
border-radius:42px;
border:1px solid #18ab29;
display: flex;
justify-content: center;
cursor:pointer;
color:#ffffff;
font-family: Trebuchet MS;
font-size: 11px;
font-weight:bold;
padding: 3px 8px;
text-decoration:none;
text-shadow:2px 1px 3px #2f6627;
text-align: center;
width: 20%;
margin: 8px;

&:hover {
  background-color: #3e8e41;
}

&:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
`;

class TreeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.mouseOver = this.mouseOver.bind(this);
    this.state = {
      orientation: 'vertical',
    };

    this.changeOrientation = this.changeOrientation.bind(this);
  }

  mouseOver(e) {
    const stats = {
      name: e.name, time: e.renderTime, individualTime: e.individualTime, props: e.props, memoizedState: e.memoizedState,
    };
    const { grabNodeStats } = this.props;
    grabNodeStats(stats);
  }

  changeOrientation() {
    const { orientation } = this.state;
    if (orientation === 'vertical') {
      this.setState({ orientation: 'horizontal' });
    } else {
      this.setState({ orientation: 'vertical' });
    }
  }

  render() {
    const { orientation, shape } = this.state;
    const { treeData } = this.props;
    return (
      <div>
        <div id="treeWrapper" style={{ width: '100%', height: '60em', float: 'right', border: '0.5px solid #ababab', margin: '10px', boxShadow: '1.5px 1.5px 1.5px 1.5px #ababab' }}>
          <PercentColorInput updateTreeState={this.props.updateTreeState} treeData={this.props.treeData} />
          <OrientationButtonStyled
            id={'button2'}
            onClick={this.changeOrientation}
            counter='Orientation'>
            Change Orientation
          </OrientationButtonStyled>
          <div style={{ width: '98%', height: '45em' }}>

            <Tree
              translate={{ x: 100, y: 100 }}
              orientation={orientation}
              onMouseOver={this.mouseOver}
              nodeSvgShape={shape}
              separation={{ siblings: .6, nonSiblings: .6 }}
              data={treeData}
            />
          </div>

        </div>
      </div>

    );
  }
}


export default TreeComponent;
